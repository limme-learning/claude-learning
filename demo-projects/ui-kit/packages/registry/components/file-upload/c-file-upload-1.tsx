"use client"
import { useFileUpload } from "@ui-kit/ui/hooks/use-file-upload"

import { Button } from "@ui-kit/ui/components/button"
import { CircleUserRoundIcon } from "lucide-react"

export default function Pattern() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    })

  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-input"
          aria-label={
            previewUrl ? "Preview of uploaded image" : "Default user avatar"
          }
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={32}
              height={32}
            />
          ) : (
            <CircleUserRoundIcon
              className="opacity-60"
              width={16}
              height={16}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="relative inline-block">
          <Button onClick={openFileDialog} aria-haspopup="dialog">
            {fileName ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>
      {fileName ? (
        <div className="inline-flex gap-2 text-xs">
          <p className="truncate text-muted-foreground" aria-live="polite">
            {fileName}
          </p>{" "}
          <button
            onClick={() => removeFile(files[0]?.id)}
            className="cursor-pointer font-medium text-destructive hover:underline"
            aria-label={`Remove ${fileName}`}
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="inline-flex gap-2 text-xs">
          <p className="truncate text-muted-foreground" aria-live="polite">
            No image attached
          </p>
        </div>
      )}
    </div>
  )
}
