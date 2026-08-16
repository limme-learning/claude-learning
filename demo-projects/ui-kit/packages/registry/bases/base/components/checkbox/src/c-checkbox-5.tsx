import { Checkbox } from "@ui-kit/ui/base-components/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@ui-kit/ui/base-components/field"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto max-w-xs">
      <Checkbox id="terms-2" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="terms-2">Accept terms and conditions</FieldLabel>
        <FieldDescription>
          This checkbox is used to accept the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  )
}
