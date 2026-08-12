import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"

import { getCategories, getItemsByCategory } from "@/lib/registry"
import { ComponentPreview } from "@/components/showcase/component-preview"
import { InstallCommand } from "@/components/showcase/install-command"

export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const items = getItemsByCategory(category)

  if (items.length === 0) {
    notFound()
  }

  const title = getCategories().find((c) => c.slug === category)?.title ?? category

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-3.5" />
        All components
      </Link>
      <h1 className="font-heading text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">
        {items.length} style variant{items.length === 1 ? "" : "s"} of the {title.toLowerCase()}{" "}
        component.
      </p>
      <div className="mt-10 flex flex-col gap-12">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-3">
            <ComponentPreview category={category} item={item} />
            <InstallCommand name={item.name} />
          </div>
        ))}
      </div>
    </main>
  )
}
