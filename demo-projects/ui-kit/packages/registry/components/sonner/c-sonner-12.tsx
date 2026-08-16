import { toast } from "sonner"

import { Button } from "@ui-kit/ui/components/button"
import { InfoIcon } from "lucide-react"

export default function Pattern() {
  const showToast = () => {
    toast.custom(() => (
      <div className="flex w-[356px] items-start gap-3 rounded-md border border-border border-l-blue-500 bg-popover p-4 text-popover-foreground shadow-lg">
        <div className="text-blue-500">
          <InfoIcon className="size-5 shrink-0" aria-hidden="true" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-semibold">New Version Available</p>
          <p className="text-sm text-muted-foreground">
            v2.4.0 includes performance improvements and bug fixes.
          </p>
          <div className="mt-2 flex gap-2">
            <Button size="xs" variant="outline" onClick={() => toast.dismiss()}>
              Later
            </Button>
            <Button size="xs" onClick={() => toast.dismiss()}>
              Update Now
            </Button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showToast} variant="outline" className="w-fit">
        Accent Border Toast
      </Button>
    </div>
  )
}
