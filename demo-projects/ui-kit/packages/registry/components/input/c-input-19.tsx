"use client"

import { useState } from "react"

import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function Pattern() {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  return (
    <Field className="w-full max-w-xs">
      <div className="flex items-center justify-between">
        <FieldLabel htmlFor="password-link">Password</FieldLabel>
        <a
          href="#"
          className="text-xs font-medium text-primary hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <div className="relative">
        <Input
          id="password-link"
          type={isVisible ? "text" : "password"}
          className="pe-9"
        />
        <button
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onClick={toggleVisibility}
          type="button"
        >
          {isVisible ? (
            <EyeOffIcon aria-hidden="true" />
          ) : (
            <EyeIcon aria-hidden="true" />
          )}
        </button>
      </div>
    </Field>
  )
}
