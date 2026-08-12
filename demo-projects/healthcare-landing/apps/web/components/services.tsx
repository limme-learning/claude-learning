import {
  CalendarCheck,
  HeartPulse,
  Share2,
  Syringe,
  Thermometer,
  Video,
  type LucideIcon,
} from "lucide-react"

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Annual checkups",
    description:
      "Routine physicals and preventive screenings, scheduled around your work week — not the other way around.",
    icon: CalendarCheck,
  },
  {
    title: "Same-day sick visits",
    description:
      "Cold, flu, minor injuries, and everything in between. Most sick visits are seen the same day you call.",
    icon: Thermometer,
  },
  {
    title: "Chronic condition management",
    description:
      "Ongoing care for diabetes, hypertension, and other long-term conditions, with one doctor tracking your history.",
    icon: HeartPulse,
  },
  {
    title: "Telehealth visits",
    description:
      "Follow-ups and non-urgent consultations from home, for when a trip to the office isn't necessary.",
    icon: Video,
  },
  {
    title: "Vaccinations",
    description:
      "Routine immunizations and seasonal vaccines for every age, with records kept on file automatically.",
    icon: Syringe,
  },
  {
    title: "Referrals & specialist coordination",
    description:
      "When you need a specialist, we handle the referral and share your history so you don't repeat yourself.",
    icon: Share2,
  },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
          Care for the everyday, and the ongoing
        </h2>
        <p className="mt-3 text-muted-foreground">
          General practice services covering most of what a family needs, under one roof.
        </p>
      </div>
      <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="group flex items-start gap-4 border-b border-border/60 py-6 first:border-t md:[&:nth-child(2)]:border-t"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="font-heading text-lg font-medium">{service.title}</h3>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
