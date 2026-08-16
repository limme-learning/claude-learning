import { Badge } from "@ui-kit/ui/base-blocks/badge"

import { Button } from "@ui-kit/ui/base-components/button"

export default function Pattern() {
  return (
    <Button variant="outline" className="gap-2" aria-label="Messages (12)">
      Messages
      <Badge variant="destructive-outline" size="sm" aria-hidden="true">
        12
      </Badge>
    </Button>
  )
}
