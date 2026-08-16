import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui-kit/ui/components/collapsible"
import { Card, CardContent } from "@ui-kit/ui/components/card"
import { ChevronDownIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="h-40 w-full max-w-xs">
      <Card className="py-3">
        <CardContent className="px-3">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between text-sm">
              <span>How do I reset my password?</span>
              <ChevronDownIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform in-data-[state=open]:rotate-180"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="pt-3 text-sm text-muted-foreground">
                You can reset your password by clicking the &quot;Forgot
                Password&quot; link on the login page. We&apos;ll send you an
                email with instructions to create a new password.
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  )
}
