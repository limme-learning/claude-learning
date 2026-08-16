"use client"

import { useState } from "react"

import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  const [value, setValue] = useState("")
  const maxLength = 50

  return (
    <Field className="max-w-xs">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="bio">Description</FieldLabel>
        <span className="text-xs text-muted-foreground">
          {value.length}/{maxLength}
        </span>
      </div>
      <Input
        id="bio"
        maxLength={maxLength}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Description of your project"
      />
    </Field>
  )
}
