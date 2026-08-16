import { Card } from "@ui-kit/ui/components/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-kit/ui/components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@ui-kit/ui/components/radio-group"
import { Separator } from "@ui-kit/ui/components/separator"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <RadioGroup defaultValue="email">
        <FieldGroup className="gap-0">
          <Field>
            <FieldLabel className="justify-between px-4 py-3">
              <FieldTitle className="flex items-center gap-2">
                <IconPlaceholder
                  lucide="MailIcon"
                  tabler="IconMail"
                  hugeicons="MailIcon"
                  phosphor="EnvelopeIcon"
                  remixicon="RiMailLine"
                  aria-hidden="true"
                  className="size-4 opacity-60"
                />
                Email
              </FieldTitle>
              <RadioGroupItem value="email" id="contact-email" />
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="justify-between px-4 py-3">
              <FieldTitle className="flex items-center gap-2">
                <IconPlaceholder
                  lucide="SmartphoneIcon"
                  tabler="IconDeviceMobile"
                  hugeicons="SmartPhone01Icon"
                  phosphor="DeviceMobileCameraIcon"
                  remixicon="RiSmartphoneLine"
                  aria-hidden="true"
                  className="size-4 opacity-60"
                />
                Phone
              </FieldTitle>
              <RadioGroupItem value="phone" id="contact-phone" />
            </FieldLabel>
          </Field>
          <Separator />
          <Field>
            <FieldLabel className="justify-between px-4 py-3">
              <FieldTitle className="flex items-center gap-2">
                <IconPlaceholder
                  lucide="MessageCircleIcon"
                  tabler="IconMessageCircle"
                  hugeicons="Message02Icon"
                  phosphor="ChatCircleIcon"
                  remixicon="RiChat3Line"
                  aria-hidden="true"
                  className="size-4 opacity-60"
                />
                Chat
              </FieldTitle>
              <RadioGroupItem value="chat" id="contact-chat" />
            </FieldLabel>
          </Field>
        </FieldGroup>
      </RadioGroup>
    </Card>
  )
}
