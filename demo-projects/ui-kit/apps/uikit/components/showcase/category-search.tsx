"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { Input } from "@ui-kit/ui/components/input"
import { Tabs, TabsList, TabsTrigger } from "@ui-kit/ui/components/tabs"

type Kind = "component" | "block"

function isKind(value: string | null): value is Kind {
  return value === "component" || value === "block"
}

export function CategorySearch({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [query, setQuery] = React.useState("")
  const kindParam = searchParams.get("kind")
  const kind: Kind = isKind(kindParam) ? kindParam : "component"
  const [hasMatches, setHasMatches] = React.useState(true)

  function setKind(next: Kind) {
    const params = new URLSearchParams(searchParams.toString())
    if (next === "component") {
      params.delete("kind")
    } else {
      params.set("kind", next)
    }
    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  React.useEffect(() => {
    const needle = query.trim().toLowerCase()
    const items =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-search-item]")
    if (!items) return

    let visibleCount = 0
    items.forEach((item) => {
      const matchesQuery = !needle || item.dataset.searchValue?.includes(needle)
      const matchesKind = item.dataset.kind === kind
      const isMatch = matchesQuery && matchesKind
      item.style.display = isMatch ? "" : "none"
      if (isMatch) visibleCount += 1
    })
    setHasMatches(visibleCount > 0)
  }, [query, kind])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative max-w-xs flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Find a component…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-8"
            aria-label="Filter components by name"
          />
        </div>
        <Tabs value={kind} onValueChange={(value) => setKind(value as Kind)}>
          <TabsList>
            <TabsTrigger value="component">Components</TabsTrigger>
            <TabsTrigger value="block">Blocks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div
        ref={containerRef}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {children}
      </div>
      {!hasMatches && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          {query
            ? `No ${kind === "block" ? "blocks" : "components"} match "${query}".`
            : `No ${kind === "block" ? "blocks" : "components"} in this category.`}
        </p>
      )}
    </div>
  )
}
