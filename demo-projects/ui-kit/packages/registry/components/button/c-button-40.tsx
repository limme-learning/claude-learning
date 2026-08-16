import { Button } from "@ui-kit/ui/components/button"
import { Kbd, KbdGroup } from "@ui-kit/ui/components/kbd"
import { SearchIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="outline" aria-label="Search (Command K)">
      <SearchIcon aria-hidden="true" />
      <span>Search</span>
      <KbdGroup aria-hidden="true">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  )
}
