import { Field } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"
import { Label } from "@ui-kit/ui/components/label"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-optional">
        Phone number
        <span className="text-muted-foreground">(optional)</span>
      </Label>
      <Input id="label-optional" type="tel" placeholder="+1 (555) 000-0000" />
    </Field>
  )
}
