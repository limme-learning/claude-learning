import fs from "node:fs"
import path from "node:path"

import {
  AVAILABLE_BASES,
  isAvailableBaseName,
  type AvailableBaseName,
} from "../../../registry/config"
import { EXAMPLE_CATEGORIES as GENERATED_CATEGORIES } from "./generated/catalog"

export type ExampleKind = "components" | "blocks"

export type ExampleCategoryMeta = {
  name: string
  title: string
  description: string
  order?: number
  isBlock?: boolean
}

export type ExampleItem = {
  name: string
  title: string
  description?: string
  meta?: { order?: number; gridSize?: 1 | 2 | 3; previewHeight?: string }
}

export type RegistryCategory = {
  slug: string
  title: string
  description: string
  isBlock: boolean
  count: number
}

const PROJECT_ROOT = path.resolve(process.cwd(), "../..")
const META_ROOT = path.join(
  PROJECT_ROOT,
  "registry",
  "_meta",
  "components",
  "bases"
)
const EXAMPLES_ROOT = path.join(PROJECT_ROOT, "registry", "bases")

export { AVAILABLE_BASES, isAvailableBaseName, type AvailableBaseName }

export const EXAMPLE_CATEGORIES: readonly ExampleCategoryMeta[] =
  GENERATED_CATEGORIES as readonly ExampleCategoryMeta[]

// The on-disk layout only ever has one directory kind ("components") — a
// category being a "block" (data-grid, kanban, tree, ...) is a display
// classification for the Components/Blocks tabs, not a separate directory.
// Keep the two concerns separate: `kindForCategory` always resolves the real
// path, `isBlockCategory` is purely presentational.
export function kindForCategory(_slug: string): ExampleKind {
  return "components"
}

export function isBlockCategory(slug: string): boolean {
  return EXAMPLE_CATEGORIES.some(
    (category) => category.name === slug && category.isBlock
  )
}

function readShard(
  base: AvailableBaseName,
  kind: ExampleKind,
  category: string
): ExampleItem[] {
  const file = path.join(META_ROOT, base, kind, category, "registry.json")
  if (!fs.existsSync(file)) return []
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf-8")) as {
      items?: ExampleItem[]
    }
    return parsed.items ?? []
  } catch {
    return []
  }
}

export function getBaseCategoryList(
  base: AvailableBaseName
): RegistryCategory[] {
  return EXAMPLE_CATEGORIES.map((category) => {
    const kind = kindForCategory(category.name)
    return {
      slug: category.name,
      title: category.title,
      description: category.description ?? "",
      isBlock: isBlockCategory(category.name),
      count: readShard(base, kind, category.name).length,
    }
  })
}

export function getBaseCategoryItems(
  base: AvailableBaseName,
  category: string
): ExampleItem[] {
  return readShard(base, kindForCategory(category), category)
}

export function getItemSource(
  base: AvailableBaseName,
  category: string,
  name: string
): string {
  return readItemSource(base, kindForCategory(category), category, name)
}

export type ItemSourcePair = {
  current: string
  counterpart: string
  hasCounterpart: boolean
}

export function getItemSourcePair(
  base: AvailableBaseName,
  category: string,
  name: string
): ItemSourcePair {
  const kind = kindForCategory(category)
  const other: AvailableBaseName = base === "base" ? "radix" : "base"
  const current = readItemSource(base, kind, category, name)
  const counterpart = readItemSource(other, kind, category, name)
  return {
    current,
    counterpart,
    hasCounterpart: counterpart.length > 0,
  }
}

function readItemSource(
  base: AvailableBaseName,
  kind: ExampleKind,
  category: string,
  name: string
): string {
  const file = path.join(EXAMPLES_ROOT, base, kind, category, `${name}.tsx`)
  if (!fs.existsSync(file)) return ""
  return fs.readFileSync(file, "utf-8")
}
