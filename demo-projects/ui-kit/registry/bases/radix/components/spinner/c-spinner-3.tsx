import { Badge } from "@ui-kit/ui/blocks/badge"

import { Spinner } from "@ui-kit/ui/components/spinner"

export default function Pattern() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Loading
      </Badge>
      <Badge variant="destructive-light">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="success-light">
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="info-light">
        <Spinner data-icon="inline-start" />
        Loading
      </Badge>
    </div>
  )
}
