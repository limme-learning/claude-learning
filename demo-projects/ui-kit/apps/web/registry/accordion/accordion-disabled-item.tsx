import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

export default function AccordionDisabledItem() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Standard plan features</AccordionTrigger>
        <AccordionContent>
          Everything in Free, plus unlimited members and priority support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Enterprise plan features (upgrade required)</AccordionTrigger>
        <AccordionContent>Contact sales to unlock enterprise features.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Billing cycle</AccordionTrigger>
        <AccordionContent>Monthly or annual, switch anytime from settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
