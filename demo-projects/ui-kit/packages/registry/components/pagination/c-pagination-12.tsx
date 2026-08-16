import {
  NativeSelect,
  NativeSelectOption,
} from "@ui-kit/ui/components/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@ui-kit/ui/components/pagination"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

export default function Pattern() {
  return (
    <Pagination>
      <PaginationContent className="w-full justify-between">
        <PaginationItem className="flex items-center gap-2">
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            Rows per page
          </span>
          <NativeSelect className="w-18" defaultValue="25">
            <NativeSelectOption value="10">10</NativeSelectOption>
            <NativeSelectOption value="25">25</NativeSelectOption>
            <NativeSelectOption value="50">50</NativeSelectOption>
            <NativeSelectOption value="100">100</NativeSelectOption>
          </NativeSelect>
        </PaginationItem>
        <PaginationItem className="flex items-center gap-3">
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            1-25 of 100
          </span>
          <div className="flex gap-1">
            <PaginationLink href="#" size="icon" aria-label="Go to first page">
              <ChevronFirstIcon className="size-4" />
            </PaginationLink>
            <PaginationLink
              href="#"
              size="icon"
              aria-label="Go to previous page"
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
            <PaginationLink href="#" size="icon" aria-label="Go to next page">
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
            <PaginationLink href="#" size="icon" aria-label="Go to last page">
              <ChevronLastIcon className="size-4" />
            </PaginationLink>
          </div>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
