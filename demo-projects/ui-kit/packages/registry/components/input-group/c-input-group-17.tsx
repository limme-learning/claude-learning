"use client"

import { useState } from "react"

import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@ui-kit/ui/components/input-group"
import { InfoIcon } from "lucide-react"

export default function Pattern() {
  const [value, setValue] = useState("")
  const maxLength = 140

  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupTextarea
          placeholder="Description..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={maxLength}
          className="min-h-16 pb-12"
        />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-xs text-muted-foreground">
            {value.length}/{maxLength} characters
          </InputGroupText>
          <InfoIcon className="ml-auto text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
