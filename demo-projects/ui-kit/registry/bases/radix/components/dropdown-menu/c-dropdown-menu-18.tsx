"use client"

import type { ReactNode } from "react"

import { ClaudeAiIcon } from "@ui-kit/ui/components/svgs/claudeAiIcon"
import { Gemini } from "@ui-kit/ui/components/svgs/gemini"
import { Openai } from "@ui-kit/ui/components/svgs/openai"
import { OpenaiDark } from "@ui-kit/ui/components/svgs/openaiDark"
import { Button } from "@ui-kit/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

interface MenuItem {
  id: string
  label: string
  logo: ReactNode
  logoDark?: ReactNode
}

const menuItems: Array<MenuItem> = [
  {
    id: "gpt4o",
    label: "GPT-5.4",
    logo: <Openai />,
    logoDark: <OpenaiDark />,
  },
  {
    id: "claude",
    label: "Claude 4.6 Opus",
    logo: <ClaudeAiIcon />,
  },
  { id: "gemini", label: "Gemini 3.1 Pro", logo: <Gemini /> },
]

export default function Pattern() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-36">
          Select model
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            className="ml-auto"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Model</DropdownMenuLabel>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.id}>
              {item.logoDark ? (
                <>
                  <span aria-hidden className="dark:hidden">
                    {item.logo}
                  </span>
                  <span aria-hidden className="hidden dark:block">
                    {item.logoDark}
                  </span>
                </>
              ) : (
                item.logo
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
