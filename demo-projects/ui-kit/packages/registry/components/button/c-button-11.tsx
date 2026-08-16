import { Button } from "@ui-kit/ui/components/button"
import { SearchIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button size="icon" aria-label="Search">
      <SearchIcon aria-hidden="true" />
    </Button>
  )
}
