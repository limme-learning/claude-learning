import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Card } from "@ui-kit/ui/components/card"
import {
  getBaseCategoryItems,
  type AvailableBaseName,
  type RegistryCategory,
} from "@/lib/registry"

import { PreviewMount } from "./preview-mount"

export async function CategoryCard({
  base,
  category,
}: Readonly<{
  base: AvailableBaseName
  category: RegistryCategory
}>) {
  const [firstItem] = getBaseCategoryItems(base, category.slug)
  const kind = "components"
  const href = `/${base}/${category.slug}`

  return (
    <Card
      data-search-item
      data-kind={category.isBlock ? "block" : "component"}
      data-search-value={category.title.toLowerCase()}
      className="group relative gap-0 overflow-hidden py-0 transition-all hover:border-foreground/20 hover:shadow-lg dark:hover:shadow-black/40"
    >
      <Link
        href={href}
        aria-label={`${category.title} — ${category.count} variant${category.count === 1 ? "" : "s"}`}
        className="absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
      <div
        aria-hidden
        className="pointer-events-none relative flex h-40 items-start justify-center overflow-hidden bg-muted/20 [mask-image:linear-gradient(to_bottom,black_65%,transparent)] pt-6"
      >
        {firstItem ? (
          <div className="scale-[0.6]">
            <PreviewMount
              base={base}
              kind={kind}
              category={category.slug}
              name={firstItem.name}
              lazy
            />
          </div>
        ) : (
          <div className="size-10 rounded-full border border-dashed border-border" />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border/60 px-4 py-3">
        <div>
          <p className="font-heading text-sm font-medium">{category.title}</p>
          <p className="text-xs text-muted-foreground">
            {category.count} variant{category.count === 1 ? "" : "s"}
          </p>
        </div>
        <ArrowUpRightIcon className="size-4 shrink-0 -translate-x-1 -translate-y-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-foreground group-hover:opacity-100" />
      </div>
    </Card>
  )
}
