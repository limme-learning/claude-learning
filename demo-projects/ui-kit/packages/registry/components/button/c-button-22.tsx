import { Button } from "@ui-kit/ui/components/button"
import { Trash2Icon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="destructive">
      <Trash2Icon aria-hidden="true" />
      Delete Account
    </Button>
  )
}
