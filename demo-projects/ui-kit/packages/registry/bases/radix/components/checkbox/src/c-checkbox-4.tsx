import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Field, FieldLabel } from "@ui-kit/ui/components/field"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="indeterminate" checked="indeterminate" />
      <FieldLabel htmlFor="indeterminate">Indeterminate state</FieldLabel>
    </Field>
  )
}
