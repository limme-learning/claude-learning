import { Field } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"
import { Label } from "@ui-kit/ui/base-components/label"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-username">Username</Label>
      <Input id="label-demo-username" placeholder="Enter your username…" />
    </Field>
  )
}
