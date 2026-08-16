import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import {
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RefreshCwIcon,
  Share2Icon,
} from "lucide-react"

const icons = {
  refresh: <RefreshCwIcon aria-hidden="true" />,
  share: <Share2Icon aria-hidden="true" />,
  more: <MoreHorizontalIcon aria-hidden="true" />,
  pencil: <PencilIcon aria-hidden="true" />,
  fileText: <FileTextIcon aria-hidden="true" />,
  image: <ImageIcon aria-hidden="true" />,
}

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm" aria-label="Refresh">
        {icons.refresh}
      </Button>
      <Button variant="outline" size="sm">
        {icons.share}
        Share
      </Button>
      <ButtonGroupSeparator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" aria-label="More options">
            {icons.more}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44" sideOffset={9}>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {icons.pencil}
              Edit dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {icons.fileText}
              Export CSV
            </DropdownMenuItem>
            <DropdownMenuItem>
              {icons.image}
              Export PNG
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
