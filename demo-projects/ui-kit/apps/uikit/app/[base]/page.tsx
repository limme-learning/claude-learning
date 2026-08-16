import { notFound } from "next/navigation"

import { CategoryGrid } from "@/components/showcase/category-grid"
import {
  AVAILABLE_BASES,
  getBaseCategoryList,
  isAvailableBaseName,
} from "@/lib/registry"

export function generateStaticParams() {
  return AVAILABLE_BASES.map((base) => ({ base }))
}

export default async function BasePage({
  params,
}: Readonly<{
  params: Promise<{ base: string }>
}>) {
  const { base } = await params
  if (!isAvailableBaseName(base)) {
    notFound()
  }

  const categories = getBaseCategoryList(base)
  const totalComponents = categories
    .filter((category) => !category.isBlock)
    .reduce((sum, category) => sum + category.count, 0)
  const totalBlocks = categories
    .filter((category) => category.isBlock)
    .reduce((sum, category) => sum + category.count, 0)

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          A component library you can actually copy.
        </h1>
        <p className="mt-4 text-lg text-balance text-muted-foreground">
          {totalComponents} component{totalComponents === 1 ? "" : "s"} and{" "}
          {totalBlocks} block
          {totalBlocks === 1 ? "" : "s"} across {categories.length} categor
          {categories.length === 1 ? "y" : "ies"} — each with a live preview and
          a one-line install command. No package to add, just source you own.
        </p>
      </div>
      <CategoryGrid base={base} />
    </main>
  )
}
