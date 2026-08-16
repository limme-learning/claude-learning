"use client"

import { useState } from "react"

import { Field } from "@ui-kit/ui/components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/components/select"
import { ChevronsUpDownIcon, XIcon } from "lucide-react"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
]

export default function Pattern() {
  const [value, setValue] = useState("")

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setValue("")
  }

  return (
    <Field className="max-w-xs">
      <Select key={value || "__empty__"} value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px] [&>svg:last-child]:hidden!">
          <SelectValue placeholder="Select an option" />
          {value !== "" ? (
            <div
              role="button"
              tabIndex={-1}
              onClick={handleClear}
              onPointerDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="flex size-4 items-center justify-center rounded-sm text-muted-foreground opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus:outline-none"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Clear selection</span>
            </div>
          ) : (
            <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
          )}
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
