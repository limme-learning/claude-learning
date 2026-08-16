import { promises as fs } from "node:fs"
import fsSync from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { getPackageDependencies } from "./shared/deps.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "../../..")
const REGISTRY_DIR = path.join(PROJECT_ROOT, "registry")
const APP_DIR = path.join(PROJECT_ROOT, "apps", "uikit")
const PUBLIC_STYLES_DIR = path.join(APP_DIR, "public", "r", "styles")
const UI_SRC_DIR = path.join(PROJECT_ROOT, "packages", "ui", "src")

const BASES = ["base", "radix"] as const
const KINDS = ["components"] as const
const DEFAULT_VARIANT = "nova"
const REGISTRY_NAMESPACE = "@ui-kit"
const STYLE_FALLBACK = [
  "vega",
  "nova",
  "lyra",
  "maia",
  "mira",
  "luma",
  "sera",
  "rhea",
]

type BaseName = "base" | "radix"
type Area =
  | "components"
  | "base-components"
  | "hooks"
  | "blocks"
  | "base-blocks"
  | "lib"

interface MetaEntry {
  name: string
  title: string
  description?: string
  order?: number
  gridSize?: 1 | 2 | 3
  previewHeight?: string
}

interface RegistryFile {
  path: string
  type: string
  content: string
  target: string
}

interface RegistryItem {
  name: string
  type: string
  title: string
  description?: string
  categories: string[]
  registryDependencies: string[]
  dependencies: string[]
  files: RegistryFile[]
  meta?: { order?: number; gridSize?: 1 | 2 | 3; previewHeight?: string }
  css?: Record<string, unknown>
  docs?: string
}

interface ModuleRef {
  area: Area
  subpath: string
}

interface ResolvedModule {
  itemName: string
  itemType: string
  sourceFiles: string[]
  targets: string[]
}

const COMMON_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "@types/react",
  "@types/react-dom",
])

async function ensureDir(dir: string) {
  if (!fsSync.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true })
  }
}

function specifierToPackageName(specifier: string): string | null {
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("@/")
  )
    return null
  if (specifier.startsWith("node:")) return null
  const parts = specifier.split("/")
  if (specifier.startsWith("@")) {
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null
  }
  return parts[0]
}

function uiDir(base: BaseName): string {
  return base === "base" ? "base-components" : "components"
}

function blocksDir(base: BaseName): string {
  return base === "base" ? "base-blocks" : "blocks"
}

/**
 * Rewrite ui-kit runtime imports to consumer-facing registry paths:
 *   @ui-kit/ui/components/<x>          -> @/components/ui/<x>
 *   @ui-kit/ui/base-components/<x>     -> @/components/ui/<x>
 *   @ui-kit/ui/blocks/<x>              -> @/components/reui/<x>
 *   @ui-kit/ui/base-blocks/<x>         -> @/components/reui/<x>
 *   @ui-kit/ui/hooks/<x>               -> @/hooks/<x>
 *   @ui-kit/ui/lib/<x>                 -> @/lib/<x>
 */
function transformImportPaths(code: string, base: string): string {
  return code
    .replace(/@ui-kit\/ui\/components\/([^"']+)/g, "@/components/ui/$1")
    .replace(
      /@ui-kit\/ui\/base-components\/([^"']+)/g,
      "@/components/ui/$1"
    )
    .replace(/@ui-kit\/ui\/blocks\/([^"']+)/g, "@/components/reui/$1")
    .replace(/@ui-kit\/ui\/base-blocks\/([^"']+)/g, "@/components/reui/$1")
    .replace(/@ui-kit\/ui\/hooks\/([^"']+)/g, "@/hooks/$1")
    .replace(/@ui-kit\/ui\/lib\/([^"']+)/g, "@/lib/$1")
}

function parseInternalModules(source: string): ModuleRef[] {
  const refs: ModuleRef[] = []
  const internalRe =
    /@ui-kit\/ui\/(components|base-components|blocks|base-blocks|hooks|lib)\/([^"']+)/g
  let match: RegExpExecArray | null
  while ((match = internalRe.exec(source))) {
    const area = match[1] as Area
    const subpath = match[2]!.replace(/\.(tsx?|ts)$/, "")
    if (area === "lib" && subpath !== "utils") continue
    refs.push({ area, subpath })
  }
  return refs
}

function depNameFor(
  area: Area,
  subpath: string,
  blockCollisions: Set<string>
): string {
  const first = subpath.split("/")[0]!
  if (
    (area === "blocks" || area === "base-blocks") &&
    blockCollisions.has(first)
  )
    return `${first}-block`
  return first
}

function parseDependencies(
  source: string,
  blockCollisions: Set<string>
): { registryDeps: string[]; deps: string[] } {
  const registryDeps = new Set<string>()
  const deps = new Set<string>()
  const pkgDeps = getPackageDependencies(PROJECT_ROOT)

  for (const ref of parseInternalModules(source)) {
    if (ref.area === "lib" && ref.subpath === "utils") {
      registryDeps.add("utils")
      continue
    }
    registryDeps.add(depNameFor(ref.area, ref.subpath, blockCollisions))
  }

  const bareRe = /from\s+["']([^"']+)["']/g
  let match: RegExpExecArray | null
  while ((match = bareRe.exec(source))) {
    const pkg = specifierToPackageName(match[1]!)
    if (pkg && pkgDeps.has(pkg) && !COMMON_PACKAGES.has(pkg)) {
      deps.add(pkg)
    }
  }

  return { registryDeps: [...registryDeps], deps: [...deps] }
}

function collectTsFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fsSync.readdirSync(dir)) {
    const p = path.join(dir, entry)
    const stat = fsSync.statSync(p)
    if (stat.isDirectory()) {
      out.push(...collectTsFiles(p))
    } else if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
      out.push(p)
    }
  }
  return out.sort()
}

/**
 * Resolve an internal `@ui-kit/ui/<area>/<subpath>` reference to a source file
 * (or set of files, for multi-file blocks / svg bundles) plus the consumer
 * target paths and registry item identity.
 */
function resolveModule(
  base: BaseName,
  area: Area,
  subpath: string
): ResolvedModule | null {
  if (area === "components" || area === "base-components") {
    const candidates = [
      path.join(UI_SRC_DIR, uiDir(base), `${subpath}.tsx`),
      path.join(UI_SRC_DIR, "components", `${subpath}.tsx`),
    ]
    const first = subpath.split("/")[0]
    if (first === "svgs") {
      const svgDir = path.join(UI_SRC_DIR, "components", "svgs")
      if (!fsSync.existsSync(svgDir)) return null
      const files = fsSync
        .readdirSync(svgDir)
        .filter((f) => f.endsWith(".tsx"))
        .sort()
      return {
        itemName: "svgs",
        itemType: "registry:ui",
        sourceFiles: files.map((f) => path.join(svgDir, f)),
        targets: files.map((f) => `components/ui/svgs/${f}`),
      }
    }
    const sourceFile = candidates.find((f) => fsSync.existsSync(f))
    if (!sourceFile) return null
    return {
      itemName: first,
      itemType: "registry:ui",
      sourceFiles: [sourceFile],
      targets: [`components/ui/${subpath}.tsx`],
    }
  }

  if (area === "hooks") {
    const sourceFile = path.join(UI_SRC_DIR, "hooks", `${subpath}.ts`)
    if (!fsSync.existsSync(sourceFile)) return null
    return {
      itemName: subpath.split("/")[0],
      itemType: "registry:hook",
      sourceFiles: [sourceFile],
      targets: [`hooks/${subpath}.ts`],
    }
  }

  if (area === "blocks" || area === "base-blocks") {
    const name = subpath.split("/")[0]
    const dir = area === "base-blocks" ? "base-blocks" : "blocks"
    const dirPath = path.join(UI_SRC_DIR, dir, name)
    if (fsSync.existsSync(dirPath) && fsSync.statSync(dirPath).isDirectory()) {
      const files = collectTsFiles(dirPath)
      return {
        itemName: name,
        itemType: "registry:block",
        sourceFiles: files,
        targets: files.map(
          (f) =>
            `components/reui/${name}/${path.relative(dirPath, f).split("\\").join("/")}`
        ),
      }
    }
    const single = path.join(UI_SRC_DIR, dir, `${name}.tsx`)
    if (fsSync.existsSync(single)) {
      return {
        itemName: name,
        itemType: "registry:block",
        sourceFiles: [single],
        targets: [`components/reui/${name}.tsx`],
      }
    }
    return null
  }

  if (area === "lib" && subpath === "utils") {
    const sourceFile = path.join(UI_SRC_DIR, "lib", "utils.ts")
    if (!fsSync.existsSync(sourceFile)) return null
    return {
      itemName: "utils",
      itemType: "registry:lib",
      sourceFiles: [sourceFile],
      targets: ["lib/utils.ts"],
    }
  }

  return null
}

function computeBlockCollisions(base: BaseName): Set<string> {
  const blockNames = new Set<string>()
  const blocksPath = path.join(UI_SRC_DIR, blocksDir(base))
  if (fsSync.existsSync(blocksPath)) {
    for (const entry of fsSync.readdirSync(blocksPath)) {
      const p = path.join(blocksPath, entry)
      if (fsSync.statSync(p).isFile() && entry.endsWith(".tsx")) {
        blockNames.add(entry.replace(/\.tsx$/, ""))
      } else if (fsSync.statSync(p).isDirectory()) {
        blockNames.add(entry)
      }
    }
  }
  const uiNames = new Set<string>()
  const uiPath = path.join(UI_SRC_DIR, uiDir(base))
  if (fsSync.existsSync(uiPath)) {
    for (const entry of fsSync.readdirSync(uiPath)) {
      const p = path.join(uiPath, entry)
      if (fsSync.statSync(p).isFile() && entry.endsWith(".tsx")) {
        uiNames.add(entry.replace(/\.tsx$/, ""))
      }
    }
  }
  return new Set([...blockNames].filter((n) => uiNames.has(n)))
}

async function collectSourceItems(): Promise<{
  examples: Record<string, RegistryItem[]>
  seeds: Record<string, ModuleRef[]>
  collisions: Record<string, Set<string>>
}> {
  const examples: Record<string, RegistryItem[]> = { base: [], radix: [] }
  const seeds: Record<string, ModuleRef[]> = { base: [], radix: [] }
  const collisions: Record<string, Set<string>> = {}

  for (const base of BASES) {
    collisions[base] = computeBlockCollisions(base)
    const baseDir = path.join(REGISTRY_DIR, "bases", base)
    if (!fsSync.existsSync(baseDir)) continue

    const baseSeeds = new Set<string>()
    for (const kind of KINDS) {
      const kindDir = path.join(baseDir, kind)
      if (!fsSync.existsSync(kindDir)) continue

      const categories = await fs.readdir(kindDir)
      for (const category of categories) {
        const catDir = path.join(kindDir, category)
        const stat = await fs.stat(catDir)
        if (!stat.isDirectory()) continue

        const files = (await fs.readdir(catDir)).filter(
          (f) => f.endsWith(".tsx") && f.startsWith("c-")
        )
        if (files.length === 0) continue

        let meta: MetaEntry[] = []
        const metaPath = path.join(catDir, "meta.json")
        if (fsSync.existsSync(metaPath)) {
          try {
            const raw = (await fs.readFile(metaPath, "utf-8")).replace(
              /^\uFEFF/,
              ""
            )
            meta = JSON.parse(raw) as MetaEntry[]
          } catch {
            meta = []
          }
        }
        const metaByName = new Map(meta.map((m) => [m.name, m]))

        const sorted = [...files].sort((a, b) => {
          const ma = metaByName.get(a.replace(/\.tsx$/, ""))
          const mb = metaByName.get(b.replace(/\.tsx$/, ""))
          return (
            (ma?.order ?? Number.MAX_SAFE_INTEGER) -
            (mb?.order ?? Number.MAX_SAFE_INTEGER)
          )
        })

        for (const file of sorted) {
          const name = file.replace(/\.tsx$/, "")
          const raw = await fs.readFile(path.join(catDir, file), "utf-8")
          const metaEntry = metaByName.get(name)
          const content = transformImportPaths(raw, base)
          const { registryDeps, deps } = parseDependencies(
            raw,
            collisions[base]!
          )

          for (const ref of parseInternalModules(raw)) {
            baseSeeds.add(`${ref.area}/${ref.subpath}`)
          }

          examples[base]!.push({
            name,
            type: "registry:block",
            title: metaEntry?.title ?? name,
            description: metaEntry?.description,
            categories: [category],
            registryDependencies: registryDeps,
            dependencies: deps,
            files: [
              {
                path: `registry/bases/${base}/${kind}/${category}/${file}`,
                type: "registry:block",
                content,
                target: `components/examples/${file}`,
              },
            ],
            meta:
              metaEntry?.order !== undefined ||
              metaEntry?.gridSize ||
              metaEntry?.previewHeight
                ? {
                    order: metaEntry?.order,
                    gridSize: metaEntry?.gridSize,
                    previewHeight: metaEntry?.previewHeight,
                  }
                : undefined,
          })
        }
      }
    }

    seeds[base] = [...baseSeeds].map((key) => {
      const slash = key.indexOf("/")
      return {
        area: key.slice(0, slash) as Area,
        subpath: key.slice(slash + 1),
      }
    })
  }

  return { examples, seeds, collisions }
}

/**
 * Collect the transitive registry item closure reachable from the example
 * sources: primitives, svgs, hooks, lib/utils and blocks (base + radix).
 */
async function collectModuleClosure(
  base: BaseName,
  seeds: ModuleRef[],
  blockCollisions: Set<string>
): Promise<Map<string, RegistryItem>> {
  const items = new Map<string, RegistryItem>()
  const queued = new Set<string>()
  const queue: ModuleRef[] = []

  for (const seed of seeds) {
    const key = `${seed.area}/${seed.subpath}`
    if (!queued.has(key)) {
      queued.add(key)
      queue.push(seed)
    }
  }

  while (queue.length > 0) {
    const ref = queue.shift()!
    const resolved = resolveModule(base, ref.area, ref.subpath)
    if (!resolved) continue

    let itemName = resolved.itemName
    if (
      (ref.area === "blocks" || ref.area === "base-blocks") &&
      blockCollisions.has(itemName)
    ) {
      itemName = `${itemName}-block`
    }
    if (items.has(itemName)) continue

    const files: RegistryFile[] = []
    const registryDepNames = new Set<string>()
    const npmDeps = new Set<string>()

    for (let i = 0; i < resolved.sourceFiles.length; i++) {
      const sourceFile = resolved.sourceFiles[i]!
      const raw = await fs.readFile(sourceFile, "utf-8")
      const { registryDeps, deps } = parseDependencies(raw, blockCollisions)
      for (const dep of registryDeps) {
        if (dep !== itemName) registryDepNames.add(dep)
      }
      for (const dep of deps) {
        npmDeps.add(dep)
      }
      for (const nested of parseInternalModules(raw)) {
        const nestedName = depNameFor(
          nested.area,
          nested.subpath,
          blockCollisions
        )
        if (nestedName === itemName) continue
        const key = `${nested.area}/${nested.subpath}`
        if (!queued.has(key)) {
          queued.add(key)
          queue.push(nested)
        }
      }
      files.push({
        path: path.relative(PROJECT_ROOT, sourceFile).split("\\").join("/"),
        type: resolved.itemType,
        content: transformImportPaths(raw, base),
        target: resolved.targets[i]!,
      })
    }

    const category =
      resolved.itemType === "registry:hook"
        ? "hooks"
        : resolved.itemType === "registry:block"
          ? "blocks"
          : resolved.itemType === "registry:lib"
            ? "lib"
            : "ui"

    items.set(itemName, {
      name: itemName,
      type: resolved.itemType,
      title: itemName,
      categories: [category],
      registryDependencies: [...registryDepNames].sort(),
      dependencies: [...npmDeps].sort(),
      files,
    })
  }

  return items
}

const SHADCN_PRESET_SUPPORT = `@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}

@custom-variant data-closed {
  &:where([data-state="closed"]),
  &:where([data-closed]:not([data-closed="false"])) {
    @slot;
  }
}

@custom-variant data-checked {
  &:where([data-state="checked"]),
  &:where([data-checked]:not([data-checked="false"])) {
    @slot;
  }
}

@custom-variant data-unchecked {
  &:where([data-state="unchecked"]),
  &:where([data-unchecked]:not([data-unchecked="false"])) {
    @slot;
  }
}

@custom-variant data-selected {
  &:where([data-selected="true"]) {
    @slot;
  }
}

@custom-variant data-disabled {
  &:where([data-disabled="true"]),
  &:where([data-disabled]:not([data-disabled="false"])) {
    @slot;
  }
}

@custom-variant data-active {
  &:where([data-state="active"]),
  &:where([data-active]:not([data-active="false"])) {
    @slot;
  }
}

@custom-variant data-horizontal {
  &:where([data-orientation="horizontal"]) {
    @slot;
  }
}

@custom-variant data-vertical {
  &:where([data-orientation="vertical"]) {
    @slot;
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}`

/**
 * Build the consumer stylesheet: the ui-kit tokens / base / keyframes /
 * reduced-motion guard from globals.css plus the selected style sheet, wrapped
 * so it can be imported from any consumer globals.css.
 */
async function buildStylesCss(style: string): Promise<string> {
  const globalsPath = path.join(UI_SRC_DIR, "styles", "globals.css")
  const styleSheetPath = path.join(UI_SRC_DIR, "styles", `style-${style}.css`)
  let globals = await fs.readFile(globalsPath, "utf-8")
  globals = globals
    .replace(/^@import\s+["'][^"']*["'];\s*$/gm, "")
    .replace(/^@source\s+["'][^"']*["'];?\s*$/gm, "")
    .replace(
      /\/\* begin: shadcn\/create styles \*\/[\s\S]*?\/\* end: shadcn\/create styles \*\//,
      ""
    )
    .trim()
  const styleSheet = (await fs.readFile(styleSheetPath, "utf-8")).trim()
  return `${SHADCN_PRESET_SUPPORT}\n\n${globals}\n\n@custom-variant style-${style} (&:where(.style-${style} *));\n\n@layer base {\n${styleSheet}\n}\n`
}

const STYLES_DOCS = [
  "ui-kit tokens and the selected style sheet were installed as components/ui/styles/ui-kit.css.",
  "Requires Tailwind CSS v4 (uses @theme inline, @custom-variant, @utility) — it will not build on Tailwind v3 projects.",
  "To match the ui-kit display:",
  "  1. Add a namespace to components.json and use it for every ui-kit item:",
  "       shadcn registry add @ui-kit=<registry-origin>/r/styles/<base>-<style>/{name}.json",
  "  2. Import the stylesheet from your globals.css (tw-animate-css was added automatically):",
  '       @import "./components/ui/styles/ui-kit.css";',
  "  3. Wrap your app root in the style class so the scoped variant matches:",
  '       <body className="style-nova">',
  "Switch the class to the style you installed (style-vega, style-lyra, ...) to change the look.",
].join("\n")

async function buildStylesItem(style: string): Promise<RegistryItem> {
  const content = await buildStylesCss(style)
  return {
    name: "styles",
    type: "registry:item",
    title: `ui-kit tokens and ${style} styles`,
    categories: ["styles"],
    registryDependencies: [],
    dependencies: ["tw-animate-css"],
    css: { '@import "tw-animate-css"': {} },
    docs: STYLES_DOCS,
    files: [
      {
        path: "styles/globals-ui-kit.css",
        type: "registry:item",
        target: "components/ui/styles/ui-kit.css",
        content,
      },
    ],
  }
}

function toManifestItem(item: RegistryItem) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    categories: item.categories,
    registryDependencies: item.registryDependencies,
    dependencies: item.dependencies,
    files: item.files.map(({ path: p, type, target }) => ({
      path: p,
      type,
      target,
    })),
    ...(item.css ? { css: item.css } : {}),
    ...(item.meta ? { meta: item.meta } : {}),
  }
}

function normalizeDep(dep: string): string {
  return dep.startsWith("@") || dep.includes("/")
    ? dep
    : `${REGISTRY_NAMESPACE}/${dep}`
}

function readStyleNames(): string[] {
  const stylesSrc = path.join(REGISTRY_DIR, "styles.tsx")
  const styleNames: string[] = []
  if (fsSync.existsSync(stylesSrc)) {
    const styleRe = /\bname:\s*"([^"]+)"/g
    const stylesContent = fsSync.readFileSync(stylesSrc, "utf-8")
    let styleMatch: RegExpExecArray | null
    while ((styleMatch = styleRe.exec(stylesContent))) {
      styleNames.push(styleMatch[1]!)
    }
  }
  return styleNames.length > 0 ? styleNames : STYLE_FALLBACK
}

export async function buildRegistry() {
  console.log(
    "🚀 build-registry: emitting public/r/styles/<base>-<style>/*.json"
  )
  await ensureDir(PUBLIC_STYLES_DIR)

  const { examples, seeds, collisions } = await collectSourceItems()
  const styleNames = readStyleNames()

  for (const base of BASES) {
    const baseExamples = examples[base] ?? []
    const baseSeeds = seeds[base] ?? []
    const baseCollisions = collisions[base] ?? new Set<string>()

    for (const style of styleNames) {
      const dirName = `${base}-${style}`
      const outDir = path.join(PUBLIC_STYLES_DIR, dirName)
      await ensureDir(outDir)

      const shipExamples = style === DEFAULT_VARIANT
      const closure = await collectModuleClosure(
        base,
        baseSeeds,
        baseCollisions
      )

      const allItems = new Map<string, RegistryItem>()

      if (shipExamples) {
        for (const example of baseExamples) {
          allItems.set(example.name, example)
        }
      }
      for (const [name, item] of closure) {
        allItems.set(name, item)
      }

      const stylesItem = await buildStylesItem(style)
      allItems.set("styles", stylesItem)

      // Every installable item pulls in the ui-kit stylesheet.
      for (const item of allItems.values()) {
        if (item.name === "styles") continue
        if (!item.registryDependencies.includes("styles")) {
          item.registryDependencies = [...item.registryDependencies, "styles"]
        }
        item.registryDependencies = [
          ...new Set(item.registryDependencies),
        ].sort()
      }

      const items = [...allItems.values()]
      const manifest = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: dirName,
        homepage: "http://localhost:3001",
        items: items.map(toManifestItem),
      }
      await fs.writeFile(
        path.join(outDir, "registry.json"),
        JSON.stringify(manifest, null, 2)
      )

      for (const item of items) {
        const registryItem = {
          $schema: "https://ui.shadcn.com/schema/registry-item.json",
          ...item,
          registryDependencies: item.registryDependencies.map(normalizeDep),
        }
        await fs.writeFile(
          path.join(outDir, `${item.name}.json`),
          JSON.stringify(registryItem, null, 2)
        )
      }
      console.log(`  ✓ ${dirName}: ${items.length} item(s)`)
    }
  }

  // styles/index.json — list of available styles, default first.
  const defaultStyle = "radix-nova"
  const stylesIndex = {
    $schema: "https://ui.shadcn.com/schema/registry-index.json",
    name: "ui-kit",
    styles: styleNames.map((s) => ({
      name: s,
      label: s,
      default: s === DEFAULT_VARIANT,
    })),
    default: defaultStyle,
  }
  await fs.writeFile(
    path.join(PUBLIC_STYLES_DIR, "index.json"),
    JSON.stringify(stylesIndex, null, 2)
  )

  // Legacy flat manifest at app root (used by apps/uikit/lib/registry.ts).
  const flatItems = [...(examples.base ?? []), ...(examples.radix ?? [])]
  const flatRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "ui-kit",
    homepage: "http://localhost:3001",
    items: flatItems.map(toManifestItem),
  }
  await fs.writeFile(
    path.join(APP_DIR, "registry.json"),
    JSON.stringify(flatRegistry, null, 2)
  )

  console.log(
    `✅ build-registry complete: ${flatItems.length} examples + primitive closure across ${styleNames.length} styles.`
  )
}

if (
  process.argv[1] &&
  import.meta.url
    .replace(/\\/g, "/")
    .endsWith(process.argv[1].replace(/\\/g, "/"))
) {
  buildRegistry().catch(console.error)
}
