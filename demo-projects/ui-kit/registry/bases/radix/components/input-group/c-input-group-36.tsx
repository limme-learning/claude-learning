"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

const httpMethodColors = {
  GET: "text-emerald-600 dark:text-emerald-400",
  POST: "text-blue-500",
  PUT: "text-amber-500",
  PATCH: "text-violet-500",
  DELETE: "text-destructive",
} as const

type HttpMethod = keyof typeof httpMethodColors

const httpMethods = Object.keys(httpMethodColors) as HttpMethod[]

export default function Pattern() {
  const [method, setMethod] = useState<HttpMethod>("GET")

  return (
    <Field className="max-w-md">
      <InputGroup>
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                className={cn(
                  "gap-1.5 font-mono text-xs",
                  httpMethodColors[method]
                )}
                aria-label={`HTTP method: ${method}`}
              >
                {method}
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  className="size-3 opacity-60"
                  aria-hidden="true"
                />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-28">
              <DropdownMenuGroup>
                {httpMethods.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    className={cn(
                      "font-mono text-xs font-semibold",
                      httpMethodColors[item]
                    )}
                    onSelect={() => setMethod(item)}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>

        <InputGroupInput
          defaultValue="/v1/agents/run"
          className="font-mono text-xs"
          aria-label="API endpoint path"
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs" aria-label="Send request">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
