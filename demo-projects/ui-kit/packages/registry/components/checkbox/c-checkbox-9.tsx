import { Checkbox } from "@ui-kit/ui/components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/components/field"

export default function Pattern() {
  return (
    <FieldGroup className="max-w-xs">
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox defaultChecked />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  )
}
