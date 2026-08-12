import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

const faqs = [
  {
    value: "item-1",
    question: "Free plan limits?",
    answer: "3 team members, community support.",
  },
  {
    value: "item-2",
    question: "Cancel anytime?",
    answer: "Yes, effective end of period.",
  },
  {
    value: "item-3",
    question: "Refunds?",
    answer: "Within 14 days, no questions asked.",
  },
]

export default function AccordionCompact() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-sm">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger className="py-1.5 text-xs">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-xs">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
