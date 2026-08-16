import { Field } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"
import { Label } from "@ui-kit/ui/components/label"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-required">
        Email address
        <span className="text-destructive">*</span>
      </Label>
      <Input
        id="label-required"
        type="email"
        placeholder="you@example.com"
        required
      />
    </Field>
  )
}
