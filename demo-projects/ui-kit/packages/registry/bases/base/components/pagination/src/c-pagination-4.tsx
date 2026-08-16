import { cn } from "@ui-kit/ui/lib/utils"
import { buttonVariants } from "@ui-kit/ui/base-components/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ui-kit/ui/base-components/pagination"

export default function Pattern() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="rounded-full" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive className={cn("rounded-full")}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className="rounded-full">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" className="rounded-full" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
