import { Badge } from "@ui-kit/ui/blocks/badge"

import { Button } from "@ui-kit/ui/components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Badge variant="outline" className="gap-0.5">
      Badge
      <Button
        variant="ghost"
        size="icon"
        className="size-3 hover:bg-transparent"
      >
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="MultiplicationSignIcon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      </Button>
    </Badge>
  )
}
