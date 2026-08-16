import { Field } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"
import { Label } from "@ui-kit/ui/base-components/label"

export default function Pattern() {
  return (
    <Field data-disabled={true} className="w-full max-w-xs">
      <Label htmlFor="label-demo-disabled">Disabled Field</Label>
      <Input id="label-demo-disabled" placeholder="Disabled input…" disabled />
    </Field>
  )
}
