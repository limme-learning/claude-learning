import { Button } from "@ui-kit/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ui-kit/ui/components/empty"
import { BarChart3Icon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="border py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BarChart3Icon />
          </EmptyMedia>
          <EmptyTitle>No data yet</EmptyTitle>
          <EmptyDescription>
            Once your project starts receiving traffic, analytics will appear
            here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button size="sm">Connect Data Source</Button>
            <Button variant="outline" size="sm">
              View Docs
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  )
}
