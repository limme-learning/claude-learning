"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Required hydration guard, not a fetch-and-store pattern: next-themes
    // resolves the real theme from a pre-hydration inline script, so the
    // client's first paint can already differ from the server's render.
    // Forcing one extra post-mount render keeps that first paint identical
    // to the server, then corrects it — removing this reintroduces a
    // hydration mismatch (confirmed via the Impeccable detector).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}
