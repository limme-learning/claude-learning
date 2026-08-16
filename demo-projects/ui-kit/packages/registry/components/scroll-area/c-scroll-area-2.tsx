import { ScrollArea, ScrollBar } from "@ui-kit/ui/components/scroll-area"

export default function Pattern() {
  return (
    <ScrollArea className="h-auto max-w-96 rounded-2xl border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="relative h-36 w-40 shrink-0 overflow-hidden rounded-2xl border"
          >
            <img
              src={`https://picsum.photos/400/300?random=${i + 1}`}
              alt={`Image ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
