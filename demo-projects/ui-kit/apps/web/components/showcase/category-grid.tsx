import Link from "next/link"

import { getCategories } from "@/lib/registry"

export function CategoryGrid() {
  const categories = getCategories()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/${category.slug}`}
          className="group flex flex-col gap-1 rounded-lg border border-border/60 p-5 transition-colors hover:border-primary/40 hover:bg-muted/30"
        >
          <span className="font-heading text-base font-medium">{category.title}</span>
          <span className="text-sm text-muted-foreground">
            {category.count} component{category.count === 1 ? "" : "s"}
          </span>
        </Link>
      ))}
    </div>
  )
}
