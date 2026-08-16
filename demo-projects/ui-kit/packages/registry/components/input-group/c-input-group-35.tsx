"use client"

import { useState } from "react"

import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react"

export default function Pattern() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <LockIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
        />
        <InputGroupButton
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="size-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="size-4 text-muted-foreground" />
          )}
        </InputGroupButton>
      </InputGroup>
    </Field>
  )
}
