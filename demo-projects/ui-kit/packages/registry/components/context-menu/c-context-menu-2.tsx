import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@ui-kit/ui/components/context-menu"
import { ClipboardIcon, CopyIcon, ScissorsIcon, TrashIcon } from "lucide-react"

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
              <CopyIcon />
              Copy
            </ContextMenuItem>
            <ContextMenuItem>
              <ScissorsIcon />
              Cut
            </ContextMenuItem>
            <ContextMenuItem>
              <ClipboardIcon />
              Paste
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
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
