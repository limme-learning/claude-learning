import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-full max-w-xs">
      <FieldLabel htmlFor="horizontal-name" className="w-24">
        Name
      </FieldLabel>
      <Input id="horizontal-name" placeholder="John Doe" />
    </Field>
  )
}
