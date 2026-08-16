import { Badge } from "@ui-kit/ui/base-blocks/badge"

import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button
      size="icon"
      variant="outline"
      className="relative"
      aria-label="Notifications (8)"
    >
      <IconPlaceholder
        lucide="BellIcon"
        tabler="IconBell"
        hugeicons="NotificationIcon"
        phosphor="BellIcon"
        remixicon="RiNotificationLine"
        aria-hidden="true"
      />
      <Badge
        variant="destructive"
        size="xs"
        className="absolute -top-1 -right-1 rounded-full px-1"
        aria-hidden="true"
      >
        8
      </Badge>
    </Button>
  )
}
