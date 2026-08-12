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
  {
    value: "item-3",
    question: "Do you offer refunds?",
    answer: "Full refunds within 14 days of purchase, no questions asked.",
  },
]

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["item-1", "item-2"]} className="w-full max-w-md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
