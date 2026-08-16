"use client"

import { useState } from "react"

import { Field } from "@ui-kit/ui/base-components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@ui-kit/ui/base-components/input-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

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
          <InputGroupText className="text-muted-foreground text-xs">
            {value.length}/{maxLength} characters
          </InputGroupText>
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
            className="text-muted-foreground ml-auto"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
