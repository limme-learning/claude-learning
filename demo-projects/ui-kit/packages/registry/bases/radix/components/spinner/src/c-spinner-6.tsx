import { Button } from "@ui-kit/ui/components/button"
import { Spinner } from "@ui-kit/ui/components/spinner"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button disabled>
        <Spinner />
        Saving...
      </Button>
      <Button variant="outline" disabled>
        <Spinner />
        Loading
      </Button>
      <Button variant="secondary" disabled>
        <Spinner />
        Processing
      </Button>
    </div>
  )
}
