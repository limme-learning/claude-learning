import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

const items = [
  {
    value: "item-1",
    question: "What's included in the free plan?",
    hint: "Team size and support level",
    answer: "Core features for up to 3 team members, with community support.",
  },
  {
    value: "item-2",
    question: "Can I cancel anytime?",
    hint: "Billing and cancellation",
    answer: "Yes — cancel from billing settings, effective at the end of the period.",
  },
]

export default function AccordionWithDescription() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>
            <span className="flex flex-col items-start gap-0.5">
              <span>{item.question}</span>
              <span className="text-xs font-normal text-muted-foreground">{item.hint}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
