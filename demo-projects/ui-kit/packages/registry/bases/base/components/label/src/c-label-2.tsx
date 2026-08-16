import { Checkbox } from "@ui-kit/ui/base-components/checkbox"
import { Field } from "@ui-kit/ui/base-components/field"
import { Label } from "@ui-kit/ui/base-components/label"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="mx-auto w-auto">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  )
}
