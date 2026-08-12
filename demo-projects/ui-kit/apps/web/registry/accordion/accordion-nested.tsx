import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

export default function AccordionNested() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Billing & plans</AccordionTrigger>
        <AccordionContent>
          <p className="mb-3">Common billing questions, grouped below.</p>
          <Accordion className="border-l border-border/60 pl-3">
            <AccordionItem value="sub-1">
              <AccordionTrigger className="text-sm">Can I switch plans mid-cycle?</AccordionTrigger>
              <AccordionContent>
                Yes, prorated automatically on your next invoice.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sub-2">
              <AccordionTrigger className="text-sm">What payment methods are accepted?</AccordionTrigger>
              <AccordionContent>Major credit cards and ACH for annual plans.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Account & security</AccordionTrigger>
        <AccordionContent>Two-factor auth and SSO are available on all plans.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
