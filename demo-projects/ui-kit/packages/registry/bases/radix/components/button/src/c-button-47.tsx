import { Badge } from "@ui-kit/ui/blocks/badge"

import { Button } from "@ui-kit/ui/components/button"

export default function Pattern() {
  return (
    <Button aria-label="Updates (new)">
      Updates
      <Badge variant="success" size="xs" aria-hidden="true">
        New
      </Badge>
    </Button>
  )
}
