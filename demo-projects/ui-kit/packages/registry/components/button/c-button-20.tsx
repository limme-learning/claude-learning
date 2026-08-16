import { Button } from "@ui-kit/ui/components/button"
import { SettingsIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="ghost">
      <SettingsIcon aria-hidden="true" />
      Settings
    </Button>
  )
}
