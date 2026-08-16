import { Button } from "@ui-kit/ui/components/button"
import { PlusIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="outline">
      <PlusIcon aria-hidden="true" />
      Add Item
    </Button>
  )
}
