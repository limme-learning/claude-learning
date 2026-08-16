import { ScrollArea } from "@ui-kit/ui/components/scroll-area"

export default function Pattern() {
  return (
    <ScrollArea className="h-72 w-56 rounded-2xl border data-has-overflow-x:py-2.5 data-has-overflow-y:px-2.5">
      <div className="flex w-full flex-col items-center gap-4 py-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl border"
          >
            <img
              src={`https://picsum.photos/400/300?random=${i + 1}`}
              alt={`Image ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
