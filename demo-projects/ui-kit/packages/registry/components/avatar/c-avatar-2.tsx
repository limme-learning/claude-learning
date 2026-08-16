import { Avatar, AvatarFallback } from "@ui-kit/ui/components/avatar"
import { UserIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>
          <UserIcon className="size-4" aria-hidden="true" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
