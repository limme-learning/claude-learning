import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/base-components/button"
import { ButtonGroup } from "@ui-kit/ui/base-components/button-group"

export default function Pattern() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline" className={cn("bg-muted justify-start")}>
        Dashboard
      </Button>
      <Button variant="outline" className="justify-start">
        Analytics
      </Button>
      <Button variant="outline" className="justify-start">
        Settings
      </Button>
      <Button variant="outline" className="justify-start">
        Help
      </Button>
    </ButtonGroup>
  )
}
