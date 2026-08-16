import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { UserPlusIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="outline">
        <UserPlusIcon aria-hidden="true" />
        Follow
      </Button>
      <ButtonGroupText className="text-muted-foreground">
        2.4k followers
      </ButtonGroupText>
    </ButtonGroup>
  )
}
