import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui-kit/ui/components/avatar"

export default function Pattern() {
  return (
    <div className="relative w-fit">
      <Avatar className="animate-pulse ring-2 ring-green-500 ring-offset-2 ring-offset-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="absolute -right-1 -bottom-1 size-3 rounded-full border-2 border-background bg-green-500" />
    </div>
  )
}
