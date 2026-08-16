import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button variant="secondary">
      <IconPlaceholder
        lucide="GithubIcon"
        tabler="IconBrandGithub"
        hugeicons="GithubIcon"
        phosphor="GithubLogoIcon"
        remixicon="RiGithubLine"
        aria-hidden="true"
      />
      Github
    </Button>
  )
}
