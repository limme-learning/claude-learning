import { getItemSource, type RegistryItem } from "@/lib/registry"
import { getPreviewLoader } from "@/registry/index"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { CopyButton } from "./copy-button"

export async function ComponentPreview({
  category,
  item,
}: {
  category: string
  item: RegistryItem
}) {
  const loader = getPreviewLoader(category, item.name)
  const source = getItemSource(item)
  const mod = loader ? await loader() : null
  const Demo = mod?.default

  return (
    <div>
      <div className="flex items-center justify-between pb-3">
        <h2 className="font-heading text-base font-medium">{item.title}</h2>
      </div>
      <Tabs defaultValue="preview">
        <div className="border-b border-border/60">
          <TabsList variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="m-0">
          <div className="flex min-h-48 items-center justify-center py-8">
            {Demo ? (
              <Demo />
            ) : (
              <p className="text-sm text-muted-foreground">No preview available.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="code" className="relative m-0">
          <CopyButton value={source} className="absolute top-3 right-3" />
          <pre className="max-h-96 overflow-auto bg-muted/30 p-4 text-xs">
            <code>{source}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}
