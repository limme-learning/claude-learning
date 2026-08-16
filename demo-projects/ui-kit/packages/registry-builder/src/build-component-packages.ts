import { build as esbuildBuild } from "esbuild"
import { promises as fs } from "node:fs"
import fsSync from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.resolve(__dirname, "../../..")
const REGISTRY_DIR = path.join(PROJECT_ROOT, "registry")
const REGISTRY_PACKAGES_ROOT = path.join(
  PROJECT_ROOT,
  "packages",
  "registry",
  "bases"
)
const GENERATED_LOADERS_DIR = path.join(
  PROJECT_ROOT,
  "apps",
  "uikit",
  "lib",
  "generated",
  "component-preview-loaders"
)

const SCOPE = "@ui-kit"
const BASES = ["base", "radix"] as const
const KINDS = ["components"] as const

const EXTERNALS = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "@base-ui/react",
  "@radix-ui/*",
  "lucide-react",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "sonner",
  "next-themes",
  "@ui-kit/ui",
]

async function ensureDir(dir: string) {
  if (!fsSync.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true })
  }
}

function toPosix(p: string) {
  return p.replace(/\\/g, "/")
}

interface DemoEntry {
  base: string
  kind: string
  category: string
  file: string
}

export async function buildPackages() {
  console.log("🚀 Building derived component packages...")
  const entries: DemoEntry[] = []

  for (const base of BASES) {
    const baseRegistryDir = path.join(REGISTRY_DIR, "bases", base)
    if (!fsSync.existsSync(baseRegistryDir)) continue

    for (const kind of KINDS) {
      const kindDir = path.join(baseRegistryDir, kind)
      if (!fsSync.existsSync(kindDir)) continue

      const categories = await fs.readdir(kindDir)
      for (const category of categories) {
        const catDir = path.join(kindDir, category)
        const stat = await fs.stat(catDir)
        if (!stat.isDirectory()) continue

        const files = (await fs.readdir(catDir)).filter((f) =>
          f.endsWith(".tsx")
        )
        if (files.length === 0) continue

        for (const file of files) {
          entries.push({ base, kind, category, file })
        }

        const targetPkgDir = path.join(
          REGISTRY_PACKAGES_ROOT,
          base,
          kind,
          category
        )
        await ensureDir(path.join(targetPkgDir, "src"))

        const pkgName = `${SCOPE}/${kind === "blocks" ? "blocks" : "components"}-${base}-${category}`

        // 1. Generate package.json
        const pkgJson = {
          name: pkgName,
          version: "0.0.1",
          private: true,
          type: "module",
          main: "./dist/index.js",
          types: "./src/index.ts",
          exports: {
            ".": "./dist/index.js",
          },
        }
        await fs.writeFile(
          path.join(targetPkgDir, "package.json"),
          JSON.stringify(pkgJson, null, 2)
        )

        // 2. Generate src/index.ts
        const exportLines = files.map((file) => {
          const componentName = file.replace(/\.tsx$/, "")
          return `export { default as ${componentName.replace(/-/g, "_")} } from "./${file}"`
        })
        const previewLoaderMap = files.map((file) => {
          const componentName = file.replace(/\.tsx$/, "")
          return `  "${componentName}": () => import("./${file}"),`
        })

        const indexContent = `// Auto-generated package preview loader
${exportLines.join("\n")}

export const componentPreviewLoaders = {
${previewLoaderMap.join("\n")}
}
`
        await fs.writeFile(
          path.join(targetPkgDir, "src", "index.ts"),
          indexContent
        )

        // Copy component files to src
        for (const file of files) {
          await fs.copyFile(
            path.join(catDir, file),
            path.join(targetPkgDir, "src", file)
          )
        }

        // 3. Bundle with esbuild
        try {
          await esbuildBuild({
            entryPoints: [path.join(targetPkgDir, "src", "index.ts")],
            outfile: path.join(targetPkgDir, "dist", "index.js"),
            bundle: true,
            format: "esm",
            target: "es2022",
            external: EXTERNALS,
            jsx: "automatic",
            sourcemap: true,
            logLevel: "silent",
          })
        } catch (err) {
          console.warn(`Bundle warning for ${pkgName}:`, err)
        }
      }
    }
  }

  // 4. Generate apps/uikit preview loader shards + dispatcher index
  await ensureDir(GENERATED_LOADERS_DIR)

  const byBase = new Map<string, Map<string, Map<string, string[]>>>()
  for (const entry of entries) {
    if (!byBase.has(entry.base)) byBase.set(entry.base, new Map())
    const baseMap = byBase.get(entry.base)!
    if (!baseMap.has(entry.kind)) baseMap.set(entry.kind, new Map())
    const kindMap = baseMap.get(entry.kind)!
    const list = kindMap.get(entry.category) ?? []
    list.push(entry.file)
    kindMap.set(entry.category, list)
  }

  for (const entry of await fs.readdir(GENERATED_LOADERS_DIR)) {
    await fs.rm(path.join(GENERATED_LOADERS_DIR, entry), {
      recursive: true,
      force: true,
    })
  }

  const shardImports: string[] = []
  const baseKeys = [...byBase.keys()]
  for (const base of baseKeys) {
    const baseMap = byBase.get(base)!
    for (const kind of [...baseMap.keys()]) {
      const kindMap = baseMap.get(kind)!
      for (const category of [...kindMap.keys()]) {
        const files = kindMap.get(category)!
        const shardDir = path.join(GENERATED_LOADERS_DIR, base, kind)
        await ensureDir(shardDir)

        const shardKey = `${base}:${kind}:${category}`
        const shardRel = toPosix(path.relative(GENERATED_LOADERS_DIR, shardDir))
        shardImports.push(
          `  "${shardKey}": () => import("./${shardRel}/${category}"),`
        )

        const shardLines: string[] = []
        shardLines.push(
          "// Auto-generated preview loader shard. Do not edit manually."
        )
        shardLines.push('import type { ComponentType } from "react"')
        shardLines.push("")
        shardLines.push("export type PreviewModule = { default: ComponentType }")
        shardLines.push("")
        shardLines.push(
          "export const loaders: Record<string, () => Promise<PreviewModule>> = {"
        )
        for (const file of files) {
          const name = file.replace(/\.tsx$/, "")
          const relDir = toPosix(
            path.relative(
              shardDir,
              path.join(REGISTRY_DIR, "bases", base, kind, category)
            )
          )
          shardLines.push(`  "${name}": () => import("${relDir}/${name}"),`)
        }
        shardLines.push("}")
        shardLines.push("")
        await fs.writeFile(
          path.join(shardDir, `${category}.ts`),
          shardLines.join("\n")
        )
      }
    }
  }

  const indexLines: string[] = []
  indexLines.push(
    "// Auto-generated preview loader registry. Do not edit manually."
  )
  indexLines.push('import type { ComponentType } from "react"')
  indexLines.push("")
  indexLines.push("export type PreviewModule = { default: ComponentType }")
  indexLines.push("")
  indexLines.push(
    "type ShardModule = { loaders: Record<string, () => Promise<PreviewModule>> }"
  )
  indexLines.push(
    "const SHARDS: Record<string, () => Promise<ShardModule>> = {"
  )
  indexLines.push(...shardImports)
  indexLines.push("}")
  indexLines.push("")
  indexLines.push(
    "export async function loadPreview(base: string, kind: string, category: string, componentName: string) {"
  )
  indexLines.push("  const shardLoader = SHARDS[`${base}:${kind}:${category}`]")
  indexLines.push("  if (!shardLoader) return null")
  indexLines.push("  try {")
  indexLines.push("    const shard = await shardLoader()")
  indexLines.push("    const loader = shard.loaders[componentName]")
  indexLines.push("    if (!loader) return null")
  indexLines.push("    return await loader()")
  indexLines.push("  } catch (e) {")
  indexLines.push(
    '    console.error("Failed to load preview for", base, kind, category, componentName, e)'
  )
  indexLines.push("    return null")
  indexLines.push("  }")
  indexLines.push("}")
  indexLines.push("")

  await fs.writeFile(
    path.join(GENERATED_LOADERS_DIR, "index.ts"),
    indexLines.join("\n")
  )
  console.log(
    `✅ Generated ${entries.length} demo entries across ${shardImports.length} loader shards.`
  )
}

if (
  process.argv[1] &&
  import.meta.url
    .replace(/\\/g, "/")
    .endsWith(process.argv[1].replace(/\\/g, "/"))
) {
  buildPackages().catch(console.error)
}
