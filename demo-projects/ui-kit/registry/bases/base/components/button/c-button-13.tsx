import { Button } from "@ui-kit/ui/base-components/button"
import { Spinner } from "@ui-kit/ui/base-components/spinner"

export default function Pattern() {
  return (
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
  )
}
