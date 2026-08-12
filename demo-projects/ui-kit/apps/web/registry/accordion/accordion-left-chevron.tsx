import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronRightIcon } from "lucide-react"

const faqs = [
  {
    value: "item-1",
    question: "What's included in the free plan?",
    answer: "Core features for up to 3 team members, with community support.",
  },
  {
    value: "item-2",
    question: "Can I cancel anytime?",
    answer: "Yes — cancel from billing settings, effective at the end of the period.",
  },
]

export default function AccordionLeftChevron() {
  return (
    <AccordionPrimitive.Root defaultValue={["item-1"]} className="w-full max-w-md">
      {faqs.map((faq) => (
        <AccordionPrimitive.Item key={faq.value} value={faq.value} className="not-last:border-b">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group flex flex-1 items-center gap-2 rounded-lg py-2.5 text-left text-sm font-medium outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50">
              <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded:rotate-90" />
              {faq.question}
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up">
            <div className="h-(--accordion-panel-height) pb-2.5 pl-6 text-muted-foreground data-ending-style:h-0 data-starting-style:h-0">
              {faq.answer}
            </div>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
