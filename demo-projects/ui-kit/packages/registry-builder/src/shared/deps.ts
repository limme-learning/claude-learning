import fsSync from "node:fs"
import path from "node:path"

export function getPackageDependencies(
  projectRoot: string
): Map<string, string> {
  const map = new Map<string, string>()

  const pkgPaths: string[] = [path.join(projectRoot, "package.json")]
  for (const sub of ["apps", "packages"]) {
    const subDir = path.join(projectRoot, sub)
    if (!fsSync.existsSync(subDir)) continue
    for (const entry of fsSync.readdirSync(subDir)) {
      const pkgJson = path.join(subDir, entry, "package.json")
      if (fsSync.existsSync(pkgJson)) pkgPaths.push(pkgJson)
    }
  }

  for (const pkgPath of pkgPaths) {
    const pkg = JSON.parse(fsSync.readFileSync(pkgPath, "utf-8")) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    for (const [name, version] of Object.entries({
      ...pkg.dependencies,
      ...pkg.devDependencies,
    })) {
      if (name.startsWith("@ui-kit/")) continue
      map.set(name, version)
    }
  }
  return map
}
