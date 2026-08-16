import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-date">Date</FieldLabel>
      <Input id="input-demo-date" type="date" />
    </Field>
  )
}
