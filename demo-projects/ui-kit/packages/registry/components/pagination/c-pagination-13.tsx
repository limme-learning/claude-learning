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
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to first page">
            <ChevronFirstIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to previous page">
            <ChevronLeftIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <NativeSelect className="w-26" defaultValue="1">
            <NativeSelectOption value="1">Page 1</NativeSelectOption>
            <NativeSelectOption value="2">Page 2</NativeSelectOption>
            <NativeSelectOption value="3">Page 3</NativeSelectOption>
            <NativeSelectOption value="4">Page 4</NativeSelectOption>
            <NativeSelectOption value="5">Page 5</NativeSelectOption>
            <NativeSelectOption value="6">Page 6</NativeSelectOption>
            <NativeSelectOption value="7">Page 7</NativeSelectOption>
            <NativeSelectOption value="8">Page 8</NativeSelectOption>
            <NativeSelectOption value="9">Page 9</NativeSelectOption>
            <NativeSelectOption value="10">Page 10</NativeSelectOption>
          </NativeSelect>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to next page">
            <ChevronRightIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="icon" aria-label="Go to last page">
            <ChevronLastIcon className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
