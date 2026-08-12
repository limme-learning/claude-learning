import { Button } from "@workspace/ui/components/button"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="border-border/60 sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-base font-semibold tracking-tight">
          Meridian Family Care
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#services" className="transition-colors hover:text-primary">
            Services
          </a>
          <a href="#why-us" className="transition-colors hover:text-primary">
            Why us
          </a>
          <a href="#contact" className="transition-colors hover:text-primary">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button render={<a href="#book" />} nativeButton={false} size="sm">
            Book an appointment
          </Button>
        </div>
      </div>
    </header>
  )
}
