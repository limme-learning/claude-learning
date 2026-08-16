import { Card, CardContent } from "@ui-kit/ui/components/card"
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
    <Card className="p-2">
      <CardContent className="p-0">
        <Pagination>
          <PaginationContent>
            {/* Previous */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Go to previous page"
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <ChevronLeftIcon className="size-4" />
              </PaginationLink>
            </PaginationItem>

            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === 1}
                  className={
                    page === 1
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            {[10, 11, 12].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
            ))}

            {/* Next */}
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                aria-label="Go to next page"
                className="h-8 w-8 rounded-full hover:bg-muted"
              >
                <ChevronRightIcon className="size-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}
