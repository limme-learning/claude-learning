import { Kbd, KbdGroup } from "@ui-kit/ui/components/kbd"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  )
}
