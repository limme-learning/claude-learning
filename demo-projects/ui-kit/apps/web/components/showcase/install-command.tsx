"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { CopyButton } from "./copy-button"

const managers = [
  { id: "pnpm", run: "pnpm dlx" },
  { id: "npm", run: "npx" },
  { id: "yarn", run: "yarn dlx" },
  { id: "bun", run: "bunx" },
] as const

export function InstallCommand({ name }: { name: string }) {
  const [origin, setOrigin] = React.useState("")

  React.useEffect(() => {
    // window is unavailable during SSR, so the real origin can only be read
    // post-mount; the "" fallback below renders identically on server and
    // client first paint, so this doesn't cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin)
  }, [])

  return (
    <Tabs defaultValue="pnpm" className="w-full">
      <TabsList>
        {managers.map((manager) => (
          <TabsTrigger key={manager.id} value={manager.id}>
            {manager.id}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((manager) => {
        const command = `${manager.run} shadcn@latest add ${origin || "http://localhost:3001"}/r/${name}.json`
        return (
          <TabsContent key={manager.id} value={manager.id}>
            <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2">
              <code className="overflow-x-auto text-xs whitespace-nowrap">{command}</code>
              <CopyButton value={command} className="shrink-0" />
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
