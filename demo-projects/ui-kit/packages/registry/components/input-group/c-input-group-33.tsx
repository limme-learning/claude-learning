"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@ui-kit/ui/components/input-group"
import { LayersIcon, LockIcon } from "lucide-react"

export default function Pattern() {
  const [visibility, setVisibility] = useState("Personal")

  return (
    <Field className="max-w-3xl">
      <InputGroup className="h-auto items-start bg-background p-3 pl-4">
        <InputGroupAddon className="mt-1.5 inline-flex size-8 items-center justify-center rounded-md border border-border bg-muted p-0">
          <LayersIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>

        <div className="flex flex-1 flex-col pt-2.5 pl-1">
          <InputGroupInput
            placeholder="Enter project name..."
            className="h-10 border-none text-base shadow-none focus-visible:ring-0"
          />
          <InputGroupTextarea
            placeholder="Description as multiple lines of text are supported..."
            className="min-h-16 border-none text-sm text-muted-foreground shadow-none focus-visible:ring-0"
          />
        </div>

        <InputGroupAddon align="inline-end" className="gap-2 border-none">
          <InputGroupText className="text-sm whitespace-nowrap text-muted-foreground">
            Save to
          </InputGroupText>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="outline"
                size="sm"
                className="h-8 gap-2 font-normal"
              >
                <LockIcon className="size-3.5" />
                {visibility}
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setVisibility("Personal")}>
                Personal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility("Team")}>
                Team
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVisibility("Public")}>
                Public
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mx-1 h-4 w-px self-center bg-border" />

          <InputGroupButton variant="secondary" size="sm">
            Cancel
          </InputGroupButton>
          <InputGroupButton variant="default" size="sm">
            Save
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
