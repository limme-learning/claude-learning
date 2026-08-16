import { Card, CardContent, CardHeader } from "@ui-kit/ui/components/card"
import { Skeleton } from "@ui-kit/ui/components/skeleton"

export default function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
