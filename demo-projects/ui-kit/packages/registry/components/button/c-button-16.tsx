import { Button } from "@ui-kit/ui/components/button"
import { Github } from "@ui-kit/ui/components/svgs/github"

export default function Pattern() {
  return (
    <Button variant="secondary">
      <Github aria-hidden="true" />
      Github
    </Button>
  )
}
