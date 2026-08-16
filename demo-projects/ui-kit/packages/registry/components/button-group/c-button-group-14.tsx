import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { CopyIcon, SearchIcon, Trash2Icon, UploadIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup orientation="vertical">
      <ButtonGroup orientation="vertical">
        <Button variant="outline" size="icon" aria-label="Search">
          <SearchIcon aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Copy">
          <CopyIcon aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Share">
          <UploadIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon" aria-label="Trash">
          <Trash2Icon aria-hidden="true" />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
