"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentType, ReactNode } from "react"

import { loadPreview } from "@/lib/generated/component-preview-loaders"

function PreviewSkeleton() {
  return (
    <div aria-hidden className="flex items-center justify-center p-4">
      <span className="size-12 animate-pulse rounded-lg border border-border/40 bg-muted/40" />
    </div>
  )
}

export function PreviewMount({
  base,
  kind,
  category,
  name,
  fallback,
  lazy = false,
}: Readonly<{
  base: string
  kind: string
  category: string
  name?: string
  fallback?: ReactNode
  lazy?: boolean
}>) {
  const [ready, setReady] = useState(!lazy)
  const [Demo, setDemo] = useState<ComponentType | null>(null)
  const [failed, setFailed] = useState(false)
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (ready || !lazy) return
    const el = placeholderRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect()
          setReady(true)
        }
      },
      { rootMargin: "300px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [lazy, ready])

  useEffect(() => {
    if (!ready) return
    let cancelled = false
    if (name) {
      loadPreview(base, kind, category, name)
        .then((mod) => {
          if (cancelled) return
          if (mod?.default) setDemo(() => mod.default)
          else setFailed(true)
        })
        .catch(() => {
          if (!cancelled) setFailed(true)
        })
    }
    return () => {
      cancelled = true
    }
  }, [ready, base, kind, category, name])

  if (!name) return fallback ?? null
  if (!ready) {
    return (
      <div ref={placeholderRef}>
        <PreviewSkeleton />
      </div>
    )
  }
  if (failed) return fallback ?? null
  if (!Demo) return <PreviewSkeleton />
  return <Demo />
}
