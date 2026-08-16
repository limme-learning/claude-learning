import fsSync from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "../../..")
const PUBLIC_STYLES_DIR = path.join(
  PROJECT_ROOT,
  "apps",
  "uikit",
  "public",
  "r",
  "styles"
)

const SCAFFOLD_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "@types/react",
  "@types/react-dom",
])
const NAMESPACE = "@ui-kit"

interface RegistryItem {
  name?: unknown
  type?: unknown
  title?: unknown
  description?: unknown
  categories?: unknown
  registryDependencies?: unknown
  dependencies?: unknown
  files?: {
    path?: unknown
    type?: unknown
    content?: unknown
    target?: unknown
  }[]
}

const PACKAGE_PATTERNS = [
  /\bfrom\s+["']([^"']+)["']/g,
  /\bimport\s+["']([^"']+)["']/g,
  /\bimport\(\s*["']([^"']+)["']\s*\)/g,
  /\brequire\(\s*["']([^"']+)["']\s*\)/g,
]

function packageNameFromImport(specifier: string): string | null {
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

function extractPackages(content: string): string[] {
  const pkgs = new Set<string>()
  for (const pattern of PACKAGE_PATTERNS) {
    pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(content))) {
      const pkg = packageNameFromImport(match[1]!)
      if (pkg) pkgs.add(pkg)
    }
  }
  return [...pkgs]
}

function isValidItem(item: unknown): item is RegistryItem {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as RegistryItem).name === "string" &&
    typeof (item as RegistryItem).type === "string"
  )
}

/**
 * Resolve a registryDependency address to a sibling item JSON file in the same
 * style directory. Same-registry deps are shipped as absolute URLs
 * (`.../r/styles/<styleDir>/<name>.json` — see build-registry.ts's SITE_URL
 * comment for why bare/namespaced names can't be used instead); a URL whose
 * path matches this style's own directory resolves to `<name>.json` here.
 * Namespaced (`@ui-kit/button`) and bare addresses are legacy/internal forms
 * checked the same way. A URL pointing anywhere else, or a genuine
 * "@other-scope/name", is a real external dep and is left to the CLI.
 */
function resolveDependencyFile(
  dep: string,
  dirPath: string,
  styleDir: string
): string | null {
  let itemName: string | null = null
  if (dep.startsWith("http://") || dep.startsWith("https://")) {
    const match = dep.match(
      new RegExp(`/r/styles/${styleDir}/([^/]+)\\.json$`)
    )
    itemName = match ? match[1]! : null
  } else if (dep.startsWith(NAMESPACE)) {
    itemName = dep.slice(NAMESPACE.length + 1)
  } else if (!dep.includes("/")) {
    itemName = dep
  }
  if (!itemName) return null
  const target = path.join(dirPath, `${itemName}.json`)
  return fsSync.existsSync(target) ? target : null
}

const CONSUMER_IMPORT_PATTERNS: RegExp[] = [
  /@\/components\/ui\/svgs\/([^"'/]+)/g,
  /@\/components\/ui\/([^"'/]+)/g,
  /@\/components\/reui\/([^"'/]+)/g,
  /@\/hooks\/([^"'/]+)/g,
  /@\/lib\/utils/g,
]

/**
 * Every transformed `@/...` import must resolve to an emitted sibling item.
 * Returns a list of missing item names.
 */
function checkConsumerImportsResolve(
  content: string,
  dirPath: string,
  styleDir: string
): string[] {
  const missing: string[] = []
  for (const pattern of CONSUMER_IMPORT_PATTERNS) {
    pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(content))) {
      let itemName: string
      if (match[0].startsWith("@/components/ui/svgs/")) {
        itemName = "svgs"
      } else if (match[0].includes("@/lib/utils")) {
        itemName = "utils"
      } else {
        itemName = match[1]!
      }
      const blockSuffixVariants =
        itemName === "svgs" ? [] : [`${itemName}-block`]
      const candidates = [itemName, ...blockSuffixVariants]
      if (
        !candidates.some((c) =>
          fsSync.existsSync(path.join(dirPath, `${c}.json`))
        )
      ) {
        missing.push(`'${match[0]}'`)
      }
    }
  }
  return missing
}

function checkItem(
  item: RegistryItem,
  dirPath: string,
  styleDir: string,
  violations: string[]
): void {
  const name = String(item.name)
  const label = `${styleDir}/${name}`

  if (
    !Array.isArray(item.registryDependencies) ||
    !item.registryDependencies.every(
      (d) => typeof d === "string" && d.length > 0
    )
  ) {
    violations.push(
      `${label}: registryDependencies must be a non-empty string array`
    )
  }
  if (
    !Array.isArray(item.dependencies) ||
    !item.dependencies.every((d) => typeof d === "string" && d.length > 0)
  ) {
    violations.push(`${label}: dependencies must be a non-empty string array`)
  }

  // Every installable item must pull in the ui-kit stylesheet.
  const registryDeps = (item.registryDependencies ?? []) as string[]
  const pullsInStyles = registryDeps.some(
    (d) => resolveDependencyFile(d, dirPath, styleDir) === path.join(dirPath, "styles.json")
  )
  if (name !== "styles" && !pullsInStyles) {
    violations.push(`${label}: missing required registryDependency on styles`)
  }

  const files = item.files
  if (!Array.isArray(files) || files.length === 0) {
    violations.push(`${label}: missing files`)
    return
  }

  // The manifest intentionally ships files without content; the per-item file
  // <name>.json carries the transformed source. Verify against that.
  const itemPath = path.join(dirPath, `${name}.json`)
  if (!fsSync.existsSync(itemPath)) {
    violations.push(`${label}: per-item file ${name}.json is missing`)
    return
  }
  const raw = fsSync.readFileSync(itemPath, "utf-8")
  let itemFile: {
    files?: {
      path?: unknown
      type?: unknown
      content?: unknown
      target?: unknown
    }[]
  } | null = null
  try {
    itemFile = JSON.parse(raw) as {
      files?: {
        path?: unknown
        type?: unknown
        content?: unknown
        target?: unknown
      }[]
    }
  } catch {
    violations.push(`${label}: per-item file ${name}.json is not valid JSON`)
    return
  }

  const allContents: string[] = []
  for (const file of itemFile?.files ?? []) {
    if (typeof file?.content !== "string" || file.content.trim().length === 0) {
      violations.push(`${label}: file content is empty or missing`)
      continue
    }
    allContents.push(file.content)

    if (file.content.includes("@/registry/")) {
      violations.push(`${label}: leaked internal import path '@/registry/'`)
    }
    if (file.content.includes("@/registry-reui/")) {
      violations.push(
        `${label}: leaked internal import path '@/registry-reui/'`
      )
    }
    // Blocks intentionally carry per-style tokens (style-vega:rounded-lg, ...);
    // everything else must be style-agnostic.
    const isBlockFile =
      typeof file.target === "string" &&
      file.target.startsWith("components/reui/")
    if (
      !isBlockFile &&
      /style-(?:vega|nova|maia|lyra|mira|luma|sera|rhea):/.test(file.content)
    ) {
      violations.push(`${label}: leaked style-<variant> token`)
    }

    const missingImports = checkConsumerImportsResolve(
      file.content,
      dirPath,
      styleDir
    )
    for (const missing of missingImports) {
      violations.push(
        `${label}: import ${missing} has no matching item in ${styleDir}`
      )
    }
  }

  // Dependency completeness: every imported npm package must be declared.
  const declared = new Set<string>([
    ...(item.dependencies ?? []),
    ...SCAFFOLD_PACKAGES,
  ])
  for (const content of allContents) {
    for (const pkg of extractPackages(content)) {
      if (pkg.startsWith(NAMESPACE)) continue
      if (!declared.has(pkg)) {
        violations.push(
          `${label}: imported package '${pkg}' is not declared in dependencies`
        )
      }
    }
  }

  // Every registryDependency must resolve to a sibling item JSON file.
  for (const dep of registryDeps) {
    if (resolveDependencyFile(dep, dirPath, styleDir) === null) {
      violations.push(
        `${label}: registryDependency '${dep}' does not resolve to a file in ${styleDir}`
      )
    }
  }
}

export async function verifyRegistry(): Promise<void> {
  console.log("🔍 verify-registry: validating public/r/styles/*")

  if (!fsSync.existsSync(PUBLIC_STYLES_DIR)) {
    console.error("❌ No styles directory found. Run build-registry first.")
    process.exit(1)
  }

  const violations: string[] = []
  let checked = 0
  let stylesChecked = 0

  const styleDirs = fsSync
    .readdirSync(PUBLIC_STYLES_DIR)
    .filter((d) =>
      fsSync.statSync(path.join(PUBLIC_STYLES_DIR, d)).isDirectory()
    )

  for (const styleDir of styleDirs) {
    const dirPath = path.join(PUBLIC_STYLES_DIR, styleDir)
    const manifestPath = path.join(dirPath, "registry.json")
    if (!fsSync.existsSync(manifestPath)) continue
    stylesChecked++

    const manifest = JSON.parse(fsSync.readFileSync(manifestPath, "utf-8")) as {
      items?: unknown[]
    }
    const items = Array.isArray(manifest.items)
      ? manifest.items.filter(isValidItem)
      : []

    // The manifest must list a per-item JSON for every installable item.
    const manifestNames = new Set(items.map((i) => String(i.name)))
    for (const entry of fsSync.readdirSync(dirPath)) {
      if (!entry.endsWith(".json") || entry === "registry.json") continue
      const itemName = entry.replace(/\.json$/, "")
      if (!manifestNames.has(itemName)) {
        violations.push(
          `${styleDir}: per-item file '${entry}' is not listed in registry.json`
        )
      }
    }

    for (const item of items) {
      checked++
      checkItem(item, dirPath, styleDir, violations)
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  if (violations.length > 0) {
    console.error(
      `❌ checked ${checked} registry items across ${stylesChecked} styles in ${elapsed}s`
    )
    for (const v of violations) {
      console.error(`  - ${v}`)
    }
    process.exit(1)
  }

  console.log(
    `✅ checked ${checked} registry items across ${stylesChecked} styles in ${elapsed}s`
  )
  console.log("✅ all registry items are valid for production")
}

const start = Date.now()

if (
  process.argv[1] &&
  import.meta.url
    .replace(/\\/g, "/")
    .endsWith(process.argv[1].replace(/\\/g, "/"))
) {
  verifyRegistry().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
