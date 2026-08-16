import { Button } from "@ui-kit/ui/components/button"
import { CloudDownloadIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button>
      <CloudDownloadIcon aria-hidden="true" />
      Download
    </Button>
  )
}
