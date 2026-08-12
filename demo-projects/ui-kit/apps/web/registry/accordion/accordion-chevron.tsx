import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

export default function AccordionChevron() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What&apos;s included in the free plan?</AccordionTrigger>
        <AccordionContent>
          Core features for up to 3 team members, with community support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
        <AccordionContent>
          Yes — cancel from billing settings, effective at the end of the period.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
        <AccordionContent>
          Full refunds within 14 days of purchase, no questions asked.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
