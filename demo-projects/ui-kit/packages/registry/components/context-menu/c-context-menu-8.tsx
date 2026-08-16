import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@ui-kit/ui/components/context-menu"
import { ArchiveIcon, PencilIcon, TrashIcon, UploadIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex w-full items-center justify-center p-12">
      <ContextMenu>
        <ContextMenuTrigger className="flex aspect-[2/0.5] w-full max-w-[300px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem>
              <PencilIcon />
              Edit
            </ContextMenuItem>
            <ContextMenuItem>
              <UploadIcon />
              Share
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <ArchiveIcon />
              Archive
            </ContextMenuItem>
            <ContextMenuItem variant="destructive">
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
