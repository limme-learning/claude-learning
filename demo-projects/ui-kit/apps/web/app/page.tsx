import { CategoryGrid } from "@/components/showcase/category-grid"

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">UI Kit</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A component showcase built on this workspace&apos;s shared design system — every
          category below has multiple style variants, each with a live preview, copyable source,
          and an install command.
        </p>
      </div>
      <CategoryGrid />
    </main>
  )
}
