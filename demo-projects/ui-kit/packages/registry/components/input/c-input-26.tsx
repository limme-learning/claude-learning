import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="subtle-bg">Subtle Background</FieldLabel>
      <Input
        id="subtle-bg"
        className="bg-muted transition-colors duration-300 hover:bg-muted focus-visible:bg-muted"
        placeholder="Enter text..."
      />
    </Field>
  )
}
