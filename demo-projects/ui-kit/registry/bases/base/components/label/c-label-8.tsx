import { Badge } from "@ui-kit/ui/base-blocks/badge"

import { Field } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"
import { Label } from "@ui-kit/ui/base-components/label"

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
