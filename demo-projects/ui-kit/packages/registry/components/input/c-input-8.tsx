import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-tel">Phone</FieldLabel>
      <Input id="input-demo-tel" type="tel" placeholder="+1 (555) 123-4567" />
    </Field>
  )
}
