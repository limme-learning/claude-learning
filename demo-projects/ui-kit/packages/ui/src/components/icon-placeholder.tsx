import * as React from "react"
import * as LucideIcons from "lucide-react"

type LucideIconName = keyof typeof LucideIcons

/**
 * reui's `ui/*.tsx` primitives pass icon names for five icon libraries
 * (lucide/tabler/hugeicons/phosphor/remixicon) since reui's own site lets
 * users swap icon sets. This project only ships `lucide` (see
 * `components.json`'s `iconLibrary`), so only the `lucide` name is used —
 * the other props are accepted (so call sites don't need editing) and
 * ignored.
 */
export function IconPlaceholder({
  lucide,
  tabler: _tabler,
  hugeicons: _hugeicons,
  phosphor: _phosphor,
  remixicon: _remixicon,
  ...props
}: {
  lucide: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
} & React.ComponentProps<"svg">) {
  const Icon = LucideIcons[lucide as LucideIconName] as
    | React.ComponentType<React.ComponentProps<"svg">>
    | undefined

  if (!Icon) return null

  return <Icon {...props} />
}
