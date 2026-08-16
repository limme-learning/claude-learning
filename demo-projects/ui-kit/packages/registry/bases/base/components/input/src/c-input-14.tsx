import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-time">Time</FieldLabel>
      <Input id="input-demo-time" type="time" />
    </Field>
  )
}
