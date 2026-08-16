import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { HeartIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <HeartIcon aria-hidden="true" />
        Like
      </Button>
      <Button variant="outline" className="w-12" asChild>
        <span>1.2K</span>
      </Button>
    </ButtonGroup>
  )
}
