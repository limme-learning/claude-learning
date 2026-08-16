import { Suspense } from "react"

import { getBaseCategoryList, type AvailableBaseName } from "@/lib/registry"

import { CategoryCard } from "./category-card"
import { CategorySearch } from "./category-search"

export function CategoryGrid({ base }: Readonly<{ base: AvailableBaseName }>) {
  const categories = getBaseCategoryList(base)

  return (
    <Suspense fallback={null}>
      <CategorySearch>
        {categories.map((category) => (
          <CategoryCard key={category.slug} base={base} category={category} />
        ))}
      </CategorySearch>
    </Suspense>
  )
}
