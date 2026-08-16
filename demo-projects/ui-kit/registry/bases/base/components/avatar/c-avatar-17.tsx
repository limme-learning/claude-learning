import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@ui-kit/ui/base-components/avatar"

export default function Pattern() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
