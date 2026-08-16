import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="color-picker">Theme Color</FieldLabel>
      <Input
        id="color-picker"
        type="color"
        className="h-10 w-20 cursor-pointer p-1"
        defaultValue="#3b82f6"
      />
    </Field>
  )
}
