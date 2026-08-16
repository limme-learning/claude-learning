import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Field, FieldLabel } from "@ui-kit/ui/components/field"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto" data-invalid>
      <Checkbox id="invalid" aria-invalid />
      <FieldLabel htmlFor="invalid">Invalid checkbox</FieldLabel>
    </Field>
  )
}
