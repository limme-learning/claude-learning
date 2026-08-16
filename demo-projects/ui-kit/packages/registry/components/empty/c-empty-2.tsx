import { Button } from "@ui-kit/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@ui-kit/ui/components/empty"
import { ArrowUpRightIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Empty className="bg-muted">
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <Button variant="link" asChild className="text-muted-foreground">
            <a href="#">
              Learn more <ArrowUpRightIcon />
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
