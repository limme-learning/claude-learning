"use client"

import { useState } from "react"

import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  const [value, setValue] = useState(50)

  return (
    <Field className="w-full max-w-xs">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="range-slider">Volume</FieldLabel>
        <span className="text-xs font-medium text-muted-foreground">
          {value}
        </span>
      </div>
      <Input
        id="range-slider"
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="h-2 cursor-pointer appearance-none bg-muted accent-primary"
      />
    </Field>
  )
}
