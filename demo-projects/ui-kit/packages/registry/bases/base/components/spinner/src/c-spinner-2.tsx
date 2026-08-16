import { Button } from "@ui-kit/ui/base-components/button"
import { Spinner } from "@ui-kit/ui/base-components/spinner"

export default function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        <Spinner data-icon="inline-start" /> Processing…
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" /> Loading…
      </Button>
      <Button variant="outline" size="icon" disabled aria-label="Loading">
        <Spinner />
      </Button>
    </div>
  )
}
