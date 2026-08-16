import { Button } from "@ui-kit/ui/components/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui-kit/ui/components/card"
import { ExternalLinkIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs gap-2 pt-5">
      <CardHeader>
        <CardTitle>Need a help in Claim?</CardTitle>
      </CardHeader>
      <CardContent className="mb-2">
        <p>
          Go to this step by step guideline process on how to certify for your
          weekly benefits:
        </p>
      </CardContent>
      <CardFooter className="py-2">
        <Button variant="link" className="px-0">
          See our guideline
          <ExternalLinkIcon aria-hidden="true" />
        </Button>
      </CardFooter>
    </Card>
  )
}
