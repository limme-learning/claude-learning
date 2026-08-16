import { Checkbox } from "@ui-kit/ui/base-components/checkbox"
import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="indeterminate" indeterminate />
      <FieldLabel htmlFor="indeterminate">Indeterminate state</FieldLabel>
    </Field>
  )
}
