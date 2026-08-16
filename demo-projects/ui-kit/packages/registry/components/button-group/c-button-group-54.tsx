"use client"

import { useState } from "react"

import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { ChevronDownIcon, Code2Icon } from "lucide-react"

const services = ["Resend API", "Stripe API", "GitHub API"]
const environments = ["Production", "Staging", "Development"]
const versions = ["v2", "v1", "beta"]

export default function Pattern() {
  const [service, setService] = useState(services[0])
  const [environment, setEnvironment] = useState(environments[0])
  const [version, setVersion] = useState(versions[0])

  return (
    <ButtonGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 text-xs font-normal"
            aria-label="Select API service"
          >
            <Code2Icon className="size-3.5 opacity-60" aria-hidden="true" />
            {service}
            <ChevronDownIcon className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuGroup>
            {services.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setService(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-xs font-normal text-muted-foreground"
            aria-label="Select environment"
          >
            {environment}
            <ChevronDownIcon className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-36">
          <DropdownMenuGroup>
            {environments.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setEnvironment(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 font-mono text-xs text-muted-foreground"
            aria-label="Select API version"
          >
            {version}
            <ChevronDownIcon className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-24">
          <DropdownMenuGroup>
            {versions.map((item) => (
              <DropdownMenuItem key={item} onClick={() => setVersion(item)}>
                <span className="font-mono">{item}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
