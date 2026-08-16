import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { FileIcon, FolderIcon, TrashIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" aria-label="Files">
        <FileIcon aria-hidden="true" />
        Files
      </Button>
      <Button variant="outline" disabled aria-label="Folder">
        <FolderIcon aria-hidden="true" />
        Folder
      </Button>
      <Button variant="outline" aria-label="Trash">
        <TrashIcon aria-hidden="true" />
        Trash
      </Button>
    </ButtonGroup>
  )
}
