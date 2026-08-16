import { Badge } from "@ui-kit/ui/base-blocks/badge"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui-kit/ui/base-components/avatar"
import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Badge variant="outline">
      <Avatar className="size-3.5">
        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      Alex
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
