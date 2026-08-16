import Link from "next/link"
import { CompassIcon } from "lucide-react"

import { Button } from "@ui-kit/ui/components/button"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex size-14 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground">
        <CompassIcon className="size-6" />
      </div>
      <h1 className="mt-6 font-heading text-2xl font-semibold tracking-tight text-balance">
        This component doesn&rsquo;t exist. Yet.
      </h1>
      <p className="mt-2 text-muted-foreground text-balance">
        No page or component matches that address. It may have moved, or the
        name was mistyped.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button asChild>
          <Link href="/base">Browse components</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/base?kind=block">Browse blocks</Link>
        </Button>
      </div>
    </main>
  )
}
