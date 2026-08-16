"use client"

import { useState } from "react"

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
import { ChevronDownIcon, CopyIcon, LinkIcon } from "lucide-react"

const visibilityOptions = ["Private", "Team", "Public"]

export default function Pattern() {
  const [visibility, setVisibility] = useState(visibilityOptions[0])

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <LinkIcon className="size-4 opacity-60" aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          defaultValue="agentflow.ai/runbooks/q2-review"
          aria-label="Share link"
        />

        <InputGroupAddon align="inline-end" className="gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="xs"
                className="gap-1.5"
                aria-label="Select visibility"
              >
                {visibility}
                <ChevronDownIcon
                  className="size-3 opacity-60"
                  aria-hidden="true"
                />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-28">
              <DropdownMenuGroup>
                {visibilityOptions.map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onSelect={() => setVisibility(item)}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            aria-label="Copy link"
          >
            <CopyIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
