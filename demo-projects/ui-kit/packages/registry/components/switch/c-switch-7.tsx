import { Card } from "@ui-kit/ui/components/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/components/field"
import { Separator } from "@ui-kit/ui/components/separator"
import { Switch } from "@ui-kit/ui/components/switch"
import { BellIcon, MailIcon, SmartphoneIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <FieldGroup className="gap-0">
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle className="flex items-center gap-2">
              <BellIcon aria-hidden="true" className="size-4 opacity-60" />
              Push notifications
            </FieldTitle>
            <Switch defaultChecked />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle className="flex items-center gap-2">
              <MailIcon aria-hidden="true" className="size-4 opacity-60" />
              Email notifications
            </FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
        <Separator />
        <Field>
          <FieldLabel className="justify-between px-4 py-3">
            <FieldTitle className="flex items-center gap-2">
              <SmartphoneIcon
                aria-hidden="true"
                className="size-4 opacity-60"
              />
              SMS notifications
            </FieldTitle>
            <Switch />
          </FieldLabel>
        </Field>
      </FieldGroup>
    </Card>
  )
}
