import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@ui-kit/ui/components/pagination"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="gap-0 overflow-hidden rounded-md border">
        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            aria-label="Go to previous page"
            className="rounded-none border-0 border-e border-border"
          >
            <ChevronLeftIcon />
          </PaginationLink>
        </PaginationItem>

        {
          /* Page numbers */
          Array.from({ length: 4 }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index === 2}
                className="rounded-none border-0 border-e border-border data-[active=true]:bg-muted"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        }

        <PaginationItem className="border-0 border-e border-border">
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            size="icon"
            aria-label="Go to next page"
            className="rounded-none border-0"
          >
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
