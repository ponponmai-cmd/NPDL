"use client"

import dynamic from "next/dynamic"

export const StudioLoader = dynamic(
  () => import("@/components/studio-app").then((mod) => mod.StudioApp),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-6xl px-4 py-16" aria-live="polite">
        <p className="text-sm text-muted-foreground">正在讀取這台裝置上的設計…</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-2xl bg-white/70 ring-1 ring-foreground/10" />
          <div className="h-40 rounded-2xl bg-white/70 ring-1 ring-foreground/10 md:col-span-2" />
        </div>
      </div>
    ),
  },
)
