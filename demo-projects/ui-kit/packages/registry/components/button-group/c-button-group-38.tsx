import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Skip back">
        <SkipBackIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Play">
        <PlayIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Skip forward">
        <SkipForwardIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
