import { Button } from "@ui-kit/ui/components/button"
import { Card } from "@ui-kit/ui/components/card"
import { Checkbox } from "@ui-kit/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui-kit/ui/components/collapsible"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/components/field"
import { ChevronRightIcon } from "lucide-react"

const settings = [
  { id: "push", label: "Push notifications", defaultChecked: true },
  { id: "email", label: "Email notifications", defaultChecked: false },
  { id: "sms", label: "SMS notifications", defaultChecked: false },
]

export default function Pattern() {
  return (
    <div className="h-40 w-full max-w-xs">
      <Collapsible className="flex flex-col gap-2" defaultOpen>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start bg-background!"
          >
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 group-data-panel-open/button:rotate-90"
            />
            <span className="sr-only">Toggle notification settings</span>
            Notification settings
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Card className="p-0">
            <FieldGroup className="gap-0 divide-y">
              {settings.map((item) => (
                <Field key={item.id}>
                  <FieldLabel className="px-3 py-2">
                    <Checkbox defaultChecked={item.defaultChecked} />
                    <FieldTitle>{item.label}</FieldTitle>
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
