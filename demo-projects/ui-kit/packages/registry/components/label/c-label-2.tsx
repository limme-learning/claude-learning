import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Field } from "@ui-kit/ui/components/field"
import { Label } from "@ui-kit/ui/components/label"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="mx-auto w-auto">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  )
}
