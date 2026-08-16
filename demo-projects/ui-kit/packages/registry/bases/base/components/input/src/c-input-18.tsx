import { Badge } from "@ui-kit/ui/base-blocks/badge"

import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <div className="flex items-center justify-between gap-2">
        <FieldLabel htmlFor="middle-name">Middle Name</FieldLabel>
        <Badge variant="warning-outline" size="sm">
          Optional
        </Badge>
      </div>
      <Input id="middle-name" placeholder="Alexander" />
    </Field>
  )
}
