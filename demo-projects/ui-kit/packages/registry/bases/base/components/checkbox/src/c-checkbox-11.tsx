import { Card } from "@ui-kit/ui/base-components/card"
import { Checkbox } from "@ui-kit/ui/base-components/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/base-components/field"
import { Separator } from "@ui-kit/ui/base-components/separator"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <FieldGroup className="gap-0">
        <Field>
          <FieldLabel className="px-4 py-3">
            <Checkbox defaultChecked />
            <FieldTitle>Push notifications</FieldTitle>
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="px-4 py-3">
            <Checkbox />
            <FieldTitle>Email notifications</FieldTitle>
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="px-4 py-3">
            <Checkbox />
            <FieldTitle>SMS notifications</FieldTitle>
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Card>
  )
}
