import { Field } from "@ui-kit/ui/components/field"
import { Label } from "@ui-kit/ui/components/label"
import { Textarea } from "@ui-kit/ui/components/textarea"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-demo-message">Message</Label>
      <Textarea id="label-demo-message" placeholder="Type your message here…" />
    </Field>
  )
}
