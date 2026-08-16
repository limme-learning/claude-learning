import { promises as fs } from "node:fs"
import fsSync from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { getPackageDependencies } from "./shared/deps.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "../../..")
const REGISTRY_DIR = path.join(PROJECT_ROOT, "registry")
const META_DIR = path.join(REGISTRY_DIR, "_meta")
const GENERATED_LIB_DIR = path.join(
  PROJECT_ROOT,
  "apps",
  "uikit",
  "lib",
  "generated"
)
const GENERATED_LOADERS_DIR = path.join(
  GENERATED_LIB_DIR,
  "component-preview-loaders"
)

const BASES = ["base", "radix"] as const
const KINDS = ["components"] as const

interface MetaEntry {
  name: string
  title: string
  description?: string
  order?: number
  gridSize?: 1 | 2 | 3
  previewHeight?: string
}

interface ComponentRegistryItem {
  name: string
  type: "registry:block"
  title: string
  categories: string[]
  description?: string
  registryDependencies: string[]
  dependencies: string[]
  files: { path: string; type: string; target: string }[]
  meta?: { order?: number; gridSize?: 1 | 2 | 3; previewHeight?: string }
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

function toPosix(p: string) {
  return p.replace(/\\/g, "/")
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word[0]?.toUpperCase() ?? "") + word.slice(1))
    .join(" ")
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

function parseComponentFile(
  source: string,
  meta: MetaEntry | undefined,
  file: string,
  category: string,
  base: string,
  kind: string
): Pick<
  ComponentRegistryItem,
  | "registryDependencies"
  | "dependencies"
  | "files"
  | "meta"
  | "title"
  | "description"
> {
  const registryDependencies = new Set<string>()
  const dependencies = new Set<string>()
  const pkgDeps = getPackageDependencies(PROJECT_ROOT)

  const internalRe =
    /from\s+["']@ui-kit\/ui\/(?:components|base-components|blocks|base-blocks|hooks|lib)\/([^"']+)["']/g
  let match: RegExpExecArray | null
  while ((match = internalRe.exec(source))) {
    const depPath = match[1]!
    const depName = depPath.split("/")[0]!.replace(/\.tsx?$/, "")
    if (depName !== "utils") registryDependencies.add(depName)
  }

  const bareRe = /from\s+["']([^"']+)["']/g
  while ((match = bareRe.exec(source))) {
    const pkg = specifierToPackageName(match[1]!)
    if (pkg && pkgDeps.has(pkg) && !COMMON_PACKAGES.has(pkg)) {
      dependencies.add(pkg)
    }
  }

  const files: ComponentRegistryItem["files"] = [
    {
      path: `${kind}/${category}/${file}`,
      type: "registry:block",
      target: `components/examples/${file}`,
    },
  ]

  return {
    title:
      meta?.title ?? titleCase(file.replace(/\.tsx$/, "").replace(/^c-/, "")),
    description: meta?.description,
    registryDependencies: [...registryDependencies],
    dependencies: [...dependencies],
    files,
    meta:
      meta?.order !== undefined || meta?.gridSize || meta?.previewHeight
        ? {
            order: meta?.order,
            gridSize: meta?.gridSize,
            previewHeight: meta?.previewHeight,
          }
        : undefined,
  }
}

export async function buildComponents() {
  console.log(
    "📦 build-components: scanning registry/bases/*/{components,blocks}/*"
  )

  const pkgDeps = getPackageDependencies(PROJECT_ROOT)
  const shardRoot = path.join(META_DIR, "components", "bases")
  await ensureDir(shardRoot)

  const catalogItems: {
    category: string
    kind: string
    base: string
    count: number
  }[] = []

  for (const base of BASES) {
    const baseDir = path.join(REGISTRY_DIR, "bases", base)
    if (!fsSync.existsSync(baseDir)) continue

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
          } catch (err) {
            console.warn(
              `⚠️  Invalid meta.json in ${base}/${kind}/${category}:`,
              err
            )
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

        const items: ComponentRegistryItem[] = []
        for (const file of sorted) {
          const name = file.replace(/\.tsx$/, "")
          const source = await fs.readFile(path.join(catDir, file), "utf-8")
          const metaEntry = metaByName.get(name)
          const parsed = parseComponentFile(
            source,
            metaEntry,
            file,
            category,
            base,
            kind
          )
          items.push({
            name,
            type: "registry:block",
            title: parsed.title,
            categories: [category],
            description: parsed.description,
            registryDependencies: parsed.registryDependencies,
            dependencies: parsed.dependencies,
            files: parsed.files,
            meta: parsed.meta,
          })
        }

        const shardDir = path.join(shardRoot, base, kind, category)
        await ensureDir(shardDir)
        await fs.writeFile(
          path.join(shardDir, "registry.json"),
          JSON.stringify({ items }, null, 2)
        )

        catalogItems.push({ category, kind, base, count: items.length })
        console.log(`  ✓ ${base}/${kind}/${category}: ${items.length} item(s)`)
      }
    }
  }

  // Catalog stats
  await ensureDir(path.join(META_DIR, "components"))
  await fs.writeFile(
    path.join(META_DIR, "components", "registry.json"),
    JSON.stringify(
      { categories: catalogItems, totalComponents: catalogItems.length },
      null,
      2
    )
  )

  // Generate catalog.ts for the app from the source catalog manifest
  const catalogSrc = path.join(REGISTRY_DIR, "catalog.ts")
  if (fsSync.existsSync(catalogSrc)) {
    const { EXAMPLE_CATEGORIES } = (await import(
      pathToFileURL(catalogSrc).href
    )) as {
      EXAMPLE_CATEGORIES: {
        name: string
        title: string
        description: string
        order: number
        isBlock?: boolean
      }[]
    }
    const isBlockSet = new Set(
      EXAMPLE_CATEGORIES.filter((c) => c.isBlock).map((c) => c.name)
    )
    const componentNames = EXAMPLE_CATEGORIES.filter(
      (c) => !isBlockSet.has(c.name)
    ).map((c) => c.name)
    const blockNames = EXAMPLE_CATEGORIES.filter((c) =>
      isBlockSet.has(c.name)
    ).map((c) => c.name)

    const catalogTs = `// Auto-generated catalog. Do not edit manually.
export const BASE_COMPONENTS = ${JSON.stringify(componentNames, null, 2)} as const
export type BaseComponentCategory = ${componentNames.map((c) => `"${c}"`).join(" | ")}
export const RADIX_COMPONENTS = ${JSON.stringify(componentNames, null, 2)} as const
export type RadixComponentCategory = ${componentNames.map((c) => `"${c}"`).join(" | ")}
export const ENTERPRISE_BLOCKS = ${JSON.stringify(blockNames, null, 2)} as const
export type EnterpriseBlockName = ${blockNames.length > 0 ? blockNames.map((b) => `"${b}"`).join(" | ") : "never"}
export const EXAMPLE_CATEGORIES = ${JSON.stringify(
      EXAMPLE_CATEGORIES.map(
        ({ name, title, description, order, isBlock }) => ({
          name,
          title,
          description,
          order,
          ...(isBlock ? { isBlock } : {}),
        })
      ),
      null,
      2
    )} as const
`
    await ensureDir(GENERATED_LIB_DIR)
    await fs.writeFile(path.join(GENERATED_LIB_DIR, "catalog.ts"), catalogTs)
    console.log("✅ Catalog generated.")
  }

  console.log(
    `✅ build-components complete: ${catalogItems.length} categories.`
  )
}

if (
  process.argv[1] &&
  import.meta.url
    .replace(/\\/g, "/")
    .endsWith(process.argv[1].replace(/\\/g, "/"))
) {
  buildComponents().catch(console.error)
}
