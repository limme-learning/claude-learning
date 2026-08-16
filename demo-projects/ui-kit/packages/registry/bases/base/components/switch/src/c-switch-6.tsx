import { Card } from "@ui-kit/ui/base-components/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/base-components/field"
import { Separator } from "@ui-kit/ui/base-components/separator"
import { Switch } from "@ui-kit/ui/base-components/switch"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <FieldGroup className="gap-0">
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>Push notifications</FieldTitle>
            <Switch defaultChecked />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>Email notifications</FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle>SMS notifications</FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Card>
  )
}
