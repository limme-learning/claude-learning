import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

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

export default function AccordionBordered() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md gap-3">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.value}
          value={faq.value}
          className="rounded-lg border border-border/60 px-3 not-last:border-b"
        >
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
