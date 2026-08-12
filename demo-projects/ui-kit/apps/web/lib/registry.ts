import fs from "node:fs"
import path from "node:path"

export type RegistryItem = {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
  files: { path: string; type: string }[]
  registryDependencies?: string[]
}

type RegistryFile = {
  name: string
  homepage: string
  items: RegistryItem[]
}

let cache: RegistryFile | null = null

function readRegistry(): RegistryFile {
  if (cache) return cache
  const raw = fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf-8")
  cache = JSON.parse(raw) as RegistryFile
  return cache
}

export function getAllItems(): RegistryItem[] {
  return readRegistry().items
}

export function getCategories(): { slug: string; title: string; count: number }[] {
  const items = getAllItems()
  const byCategory = new Map<string, number>()
  for (const item of items) {
    for (const category of item.categories) {
      byCategory.set(category, (byCategory.get(category) ?? 0) + 1)
    }
  }
  return [...byCategory.entries()]
    .map(([slug, count]) => ({ slug, title: titleCase(slug), count }))
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getItemsByCategory(category: string): RegistryItem[] {
  return getAllItems().filter((item) => item.categories.includes(category))
}

export function getItemSource(item: RegistryItem): string {
  const file = item.files[0]
  if (!file) return ""
  return fs.readFileSync(path.join(process.cwd(), file.path), "utf-8")
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ")
}
