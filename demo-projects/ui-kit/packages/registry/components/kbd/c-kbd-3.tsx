import { Kbd, KbdGroup } from "@ui-kit/ui/components/kbd"
import { ArrowLeftIcon, CircleDashedIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <KbdGroup>
        <Kbd>
          <ArrowLeftIcon />
          Left
        </Kbd>
        <Kbd>
          <CircleDashedIcon />
          Voice Enabled
        </Kbd>
      </KbdGroup>
    </div>
  )
}
