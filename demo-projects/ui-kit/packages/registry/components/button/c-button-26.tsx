import { Button } from "@ui-kit/ui/components/button"
import { PlayIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button size="icon-lg" aria-label="Play">
      <PlayIcon aria-hidden="true" />
    </Button>
  )
}
