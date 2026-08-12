import { CheckCircle2 } from "lucide-react"

const reasons = [
  {
    title: "Same-week appointments",
    description: "Most patients are seen within a week of calling, including new patients.",
  },
  {
    title: "One doctor, your full history",
    description: "You see the same physician visit to visit, not whoever's free that day.",
  },
  {
    title: "Straightforward pricing",
    description: "Most major insurance accepted, and costs explained before you're billed.",
  },
]

export function Trust() {
  return (
    <section id="why-us" className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
            Why patients choose Meridian
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col gap-2">
              <CheckCircle2 className="size-5 text-primary" strokeWidth={1.75} aria-hidden />
              <h3 className="text-base font-medium">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
