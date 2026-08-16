"use client"

import { useState } from "react"

import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"

export default function Pattern() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="pulsed-input">Pulsed Background</FieldLabel>
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-0 rounded-md bg-primary/20 transition-opacity duration-300 ${
            isFocused ? "opacity-0" : "animate-pulse"
          }`}
        />
        <Input
          id="pulsed-input"
          placeholder="Animation stops on focus..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="relative bg-transparent shadow-none transition-colors duration-300 focus-visible:bg-background"
        />
      </div>
    </Field>
  )
}
