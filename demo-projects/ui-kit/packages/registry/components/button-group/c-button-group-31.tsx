import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { Share2Icon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" className="border-primary">
        <Share2Icon className="..." />
        Share
      </Button>
      <ButtonGroupText className="bg-transparent px-2 text-muted-foreground">
        128 Shares
      </ButtonGroupText>
    </ButtonGroup>
  )
}
