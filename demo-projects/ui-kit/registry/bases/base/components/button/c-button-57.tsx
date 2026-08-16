import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui-kit/ui/base-components/avatar"
import { Button } from "@ui-kit/ui/base-components/button"

export default function Pattern() {
  return (
    <Button size="sm">
      <Avatar className="size-5">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@shadcn</span>
    </Button>
  )
}
