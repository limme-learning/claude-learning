import { Badge } from "@ui-kit/ui/blocks/badge"

import { Field } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"
import { Label } from "@ui-kit/ui/components/label"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-badge" className="gap-2">
        Webhook URL
        <Badge variant="success-light" size="sm">
          Active
        </Badge>
      </Label>
      <Input
        id="label-badge"
        type="url"
        defaultValue="https://api.example.com/webhooks"
        className="font-mono text-xs"
      />
    </Field>
  )
}
