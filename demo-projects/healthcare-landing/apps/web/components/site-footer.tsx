import { Phone } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        <div className="flex flex-col gap-3">
          <span className="text-base font-semibold tracking-tight">Meridian Family Care</span>
          <p className="max-w-xs text-sm text-muted-foreground">
            General and family medicine, with appointments most weeks and same-day sick visits.
          </p>
        </div>
        <div id="book" className="flex flex-col gap-3">
          <p className="text-sm font-medium">Ready to book?</p>
          <Button render={<a href="#top" />} nativeButton={false} size="lg" className="w-fit">
            Book an appointment
          </Button>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone className="size-3.5 text-primary" strokeWidth={1.75} aria-hidden />
            Or call (555) 010-0142
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground [text-wrap:balance]">
          <span className="inline-block max-w-md">
            © {new Date().getFullYear()} Meridian Family Care. Demo content for a Claude Code
            skill-workflow exercise — not a real clinic.
          </span>
        </p>
      </div>
    </footer>
  )
}
