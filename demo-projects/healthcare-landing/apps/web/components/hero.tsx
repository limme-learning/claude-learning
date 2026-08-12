import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"

export function Hero() {
  return (
    <section id="top">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="animate-hero-in flex flex-col items-start gap-6">
          <Badge className="rounded-full border-transparent bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Now accepting new patients
          </Badge>
          <h1 className="max-w-2xl font-heading text-4xl font-medium tracking-tight text-balance md:text-5xl">
            Primary care that fits your life, not the other way around.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-balance">
            Meridian Family Care is a general practice built around same-week appointments,
            straightforward communication, and doctors who actually have time for your questions.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href="#book" />}
              nativeButton={false}
              size="lg"
              className="shadow-[0_8px_20px_-8px_color-mix(in_oklch,var(--primary)_65%,transparent)]"
            >
              Book an appointment
            </Button>
            <Button render={<a href="#services" />} nativeButton={false} size="lg" variant="outline">
              See our services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
