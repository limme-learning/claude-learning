"use client"

import { Component, startTransition, useEffect, useRef, useState } from "react"
import type { ComponentType, ReactNode } from "react"

import { loadPreview } from "@/lib/generated/component-preview-loaders"

function PreviewSkeleton() {
  return (
    <div aria-hidden className="flex items-center justify-center p-4">
      <span className="size-12 animate-pulse rounded-lg border border-border/40 bg-muted/40" />
    </div>
  )
}

// Catches a render-time throw from a mounted demo (bad prop, missing
// dependency in one of ~140 packages x 2 engines x 8 styles) so one broken
// preview degrades to its own fallback instead of taking down the whole
// grid. Load-time failures are handled separately via the `failed` state
// below — this only covers failures after `Demo` has already started
// rendering.
class PreviewErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
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
    if (!ready || !name) return
    let cancelled = false

    // Defer the actual import to idle time so it doesn't compete with an
    // in-flight scroll/paint when several previews cross the intersection
    // threshold in the same frame, and mark the resulting state update as
    // low-priority so React doesn't block input handling while a heavy
    // demo (data-grid, chart) renders.
    function runLoad() {
      loadPreview(base, kind, category, name!)
        .then((mod) => {
          if (cancelled) return
          startTransition(() => {
            if (mod?.default) setDemo(() => mod.default)
            else setFailed(true)
          })
        })
        .catch(() => {
          if (!cancelled) startTransition(() => setFailed(true))
        })
    }

    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(runLoad, { timeout: 1500 })
    } else {
      timeoutId = setTimeout(runLoad, 150)
    }

    return () => {
      cancelled = true
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId != null) clearTimeout(timeoutId)
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
  return (
    <PreviewErrorBoundary fallback={fallback ?? <PreviewSkeleton />}>
      <Demo />
    </PreviewErrorBoundary>
  )
}
