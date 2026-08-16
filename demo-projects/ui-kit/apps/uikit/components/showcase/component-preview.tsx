import { CodeIcon } from "lucide-react"

import { Button } from "@ui-kit/ui/components/button"
import { Dialog, DialogTrigger } from "@ui-kit/ui/components/dialog"

import { highlightTsx } from "@/lib/highlight"
import {
  getItemSourcePair,
  kindForCategory,
  type AvailableBaseName,
  type ExampleItem,
} from "@/lib/registry"

import { InspectDialog } from "./inspect-dialog"
import { PreviewMount } from "./preview-mount"

// The category grid is a single column now (every preview gets full width),
// so gridSize no longer needs to drive a column span — only how tall the
// preview area defaults to before the demo's own content is measured.
function defaultMinHeight(gridSize?: 1 | 2 | 3): string {
  if (gridSize === 2) return "20rem"
  if (gridSize === 3) return "10rem"
  return "16rem"
}

export async function ComponentPreview({
  base,
  category,
  item,
}: Readonly<{
  base: AvailableBaseName
  category: string
  item: ExampleItem
}>) {
  const kind = kindForCategory(category)
  const source = getItemSourcePair(base, category, item.name).current
  const html = await highlightTsx(source)

  const gridSize = item.meta?.gridSize ?? 1
  const minHeight = item.meta?.previewHeight ?? defaultMinHeight(gridSize)

  return (
    <Dialog>
      <div className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all hover:border-foreground/20 hover:shadow-md dark:hover:shadow-black/20">
        <div className="flex items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
          <h2 className="truncate font-heading text-sm font-medium">
            {item.title}
          </h2>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <CodeIcon data-icon="inline-start" className="size-3.5" />
              Code
            </Button>
          </DialogTrigger>
        </div>
        <div
          className="preview-dots relative flex flex-1 items-center justify-center overflow-hidden bg-muted/10 p-6"
          style={{ minHeight }}
        >
          <div className="flex w-full items-center justify-center">
            <PreviewMount
              base={base}
              kind={kind}
              category={category}
              name={item.name}
              lazy
              fallback={
                <p className="text-sm text-muted-foreground">
                  No preview available.
                </p>
              }
            />
          </div>
        </div>
        <InspectDialog
          title={item.title}
          name={item.name}
          source={source}
          html={html}
          defaultEngine={base}
        />
      </div>
    </Dialog>
  )
}
