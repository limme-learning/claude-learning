"use client"

import * as React from "react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@ui-kit/ui/components/tabs"
import { DEFAULT_STYLE } from "../../../../registry/config"

import { CodeBlock } from "./code-block"

const managers = [
  { id: "pnpm", run: "pnpm dlx" },
  { id: "npm", run: "npx" },
  { id: "yarn", run: "yarn dlx" },
  { id: "bun", run: "bunx" },
] as const

export function InstallCommand({
  name,
  defaultEngine = "base",
}: Readonly<{ name: string; defaultEngine?: "base" | "radix" }>) {
  const [origin, setOrigin] = React.useState("")
  const [styleClass, setStyleClass] = React.useState(`style-${DEFAULT_STYLE}`)

  React.useEffect(() => {
    // window is unavailable during SSR, so the real origin can only be read
    // post-mount; the "" fallback below renders identically on server and
    // client first paint, so this doesn't cause a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin)

    // Track the style picked in the Customize sheet so the install hint
    // reflects the active `.style-*` class instead of hardcoding one.
    const rootClass = document.documentElement.className
    const match = /(?:^|\s)(style-[a-z]+)(?:\s|$)/.exec(rootClass)
    if (match) {
      setStyleClass(match[1])
    }
  }, [])

  const originUrl = origin || "http://localhost:3001"

  return (
    <Tabs defaultValue="pnpm" className="flex w-full flex-col gap-3">
      <TabsList>
        {managers.map((manager) => (
          <TabsTrigger key={manager.id} value={manager.id}>
            {manager.id}
          </TabsTrigger>
        ))}
      </TabsList>
      {managers.map((manager) => (
        <TabsContent
          key={manager.id}
          value={manager.id}
          className="flex flex-col gap-3"
        >
          <CodeBlock
            copy
            code={`${manager.run} shadcn@latest add ${originUrl}/r/styles/${defaultEngine}-${DEFAULT_STYLE}/${name}.json`}
          />
          <p className="text-xs text-muted-foreground">
            Adds the item straight from the ui-kit registry. Wrap your app root
            in the <code className="font-medium">.{styleClass}</code> class and
            import{" "}
            <code className="font-medium">
              @/components/ui/styles/ui-kit.css
            </code>{" "}
            in your globals.css to match the ui-kit display.
          </p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
