import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-password">Password</FieldLabel>
      <Input id="input-demo-password" type="password" placeholder="Password" />
    </Field>
  )
}
