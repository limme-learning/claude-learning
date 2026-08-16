import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="pill-input">Search</FieldLabel>
      <Input
        id="pill-input"
        className="rounded-full px-4"
        placeholder="Search everything..."
      />
    </Field>
  )
}
