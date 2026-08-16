import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@ui-kit/ui/components/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Pagination className="w-full max-w-xs">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to previous page">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <span className="text-xs text-muted-foreground">
            Page <span className="font-medium text-foreground">1</span> of{" "}
            <span className="font-medium text-foreground">10</span>
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to next page">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
