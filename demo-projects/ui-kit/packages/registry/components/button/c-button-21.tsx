import { Button } from "@ui-kit/ui/components/button"
import { LogOutIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="ghost">
      Logout
      <LogOutIcon aria-hidden="true" />
    </Button>
  )
}
