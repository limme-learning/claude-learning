import { Textarea } from "@ui-kit/ui/base-components/textarea"

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Textarea
        placeholder="Type your message here…"
        aria-invalid="true"
        className="w-full"
      />
    </div>
  )
}
