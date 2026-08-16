import { toast } from "sonner"

import { Button } from "@ui-kit/ui/components/button"
import { Separator } from "@ui-kit/ui/components/separator"
import { XIcon } from "lucide-react"

export default function Pattern() {
  const showToast = () => {
    toast.custom(() => (
      <div className="bg-invert text-invert-foreground flex w-[356px] flex-col gap-3 rounded-md border border-transparent p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            <XIcon className="size-3.5" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm font-semibold">Build Failed</p>
            <p className="text-invert-foreground/70 text-sm">
              Compilation error in 2 files. Fix errors before deploying.
            </p>
          </div>
        </div>
        <Separator className="bg-border/10" />
        <div className="text-invert-foreground/60 space-y-1 font-mono text-xs">
          <p>src/api/auth.ts:42 — TypeError: undefined is not a function</p>
          <p>src/utils/parse.ts:18 — SyntaxError: Unexpected token</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="outline"
            className="text-invert-foreground flex-1 border-border/10 bg-background/10"
            onClick={() => toast.dismiss()}
          >
            View Logs
          </Button>
          <Button
            size="xs"
            className="flex-1 border-red-800 bg-red-500 text-white hover:border-red-900 hover:bg-red-600"
            onClick={() => toast.dismiss()}
          >
            Retry Build
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showToast} variant="outline" className="w-fit">
        Invert Error Toast
      </Button>
    </div>
  )
}
