import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Field, FieldLabel } from "@ui-kit/ui/components/field"

export default function Pattern() {
  return (
    <Field orientation="horizontal" data-disabled className="w-auto">
      <Checkbox id="disabled-2" disabled defaultChecked />
      <FieldLabel htmlFor="disabled-2">Disabled checkbox</FieldLabel>
    </Field>
  )
}
