import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { ComponentPreview } from "@/components/showcase/component-preview"
import {
  AVAILABLE_BASES,
  EXAMPLE_CATEGORIES,
  getBaseCategoryItems,
  getBaseCategoryList,
  isAvailableBaseName,
} from "@/lib/registry"

export function generateStaticParams() {
  return AVAILABLE_BASES.flatMap((base) =>
    EXAMPLE_CATEGORIES.map((category) => ({
      base,
      category: category.name,
    }))
  )
}

export default async function CategoryPage({
  params,
}: Readonly<{
  params: Promise<{ base: string; category: string }>
}>) {
  const { base, category } = await params
  if (!isAvailableBaseName(base)) {
    notFound()
  }

  const meta = getBaseCategoryList(base).find(
    (entry) => entry.slug === category
  )
  const items = getBaseCategoryItems(base, category)
  if (!meta || items.length === 0) {
    notFound()
  }

  const engineLabel = base === "base" ? "Base UI" : "Radix UI"

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href={`/${base}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        All {engineLabel} components
      </Link>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        {meta.title}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {meta.description} {items.length} variant{items.length === 1 ? "" : "s"}{" "}
        on {engineLabel}.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6">
        {items.map((item) => (
          <ComponentPreview
            key={item.name}
            base={base}
            category={category}
            item={item}
          />
        ))}
      </div>
    </main>
  )
}
