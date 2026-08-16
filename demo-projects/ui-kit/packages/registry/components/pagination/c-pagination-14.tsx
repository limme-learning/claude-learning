import { Input } from "@ui-kit/ui/components/input"
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
      <PaginationContent className="w-full justify-between">
        <PaginationItem className="flex items-center gap-1">
          <PaginationLink href="#" size="icon" aria-label="Go to previous page">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
          <PaginationLink href="#">2</PaginationLink>
          <PaginationLink href="#">3</PaginationLink>
          <PaginationLink href="#">4</PaginationLink>
          <PaginationEllipsis />
          <PaginationLink href="#" size="icon" aria-label="Go to next page">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            Go to page
          </span>
          <Input
            type="number"
            min={1}
            max={10}
            defaultValue={1}
            className="h-9 w-16 text-center"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
