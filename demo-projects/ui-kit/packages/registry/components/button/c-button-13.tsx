import { Button } from "@ui-kit/ui/components/button"
import { Spinner } from "@ui-kit/ui/components/spinner"

export default function Pattern() {
  return (
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
  )
}
