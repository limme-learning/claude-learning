"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Field } from "@ui-kit/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/components/select"
import { XIcon } from "lucide-react"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
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
        <SelectTrigger
          className={cn(value !== "" && "[&>svg:last-child]:hidden!")}
        >
          <SelectValue placeholder="Select framework" />
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
          ) : null}
        </SelectTrigger>
        <SelectContent position="popper">
          {frameworks.map((framework) => (
            <SelectItem key={framework.value} value={framework.value}>
              {framework.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}
