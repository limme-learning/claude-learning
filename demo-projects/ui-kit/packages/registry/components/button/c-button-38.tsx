import { Button } from "@ui-kit/ui/components/button"
import { StarIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button className="pe-0" variant="outline">
      <StarIcon aria-hidden="true" />
      Star
      <span className="relative ms-1 px-2 text-xs font-medium text-muted-foreground before:absolute before:inset-0 before:left-0 before:w-px before:bg-border">
        589
      </span>
    </Button>
  )
}
