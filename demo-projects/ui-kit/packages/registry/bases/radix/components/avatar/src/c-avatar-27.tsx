import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui-kit/ui/components/avatar"
import { Button } from "@ui-kit/ui/components/button"

export default function Pattern() {
  return (
    <Button
      size="sm"
      className="rounded-full gap-1 pl-0.5"
    >
      <Avatar className="border-primary size-6 border">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@shadcn</span>
    </Button>
  )
}
