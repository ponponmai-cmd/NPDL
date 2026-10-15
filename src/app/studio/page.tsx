import type { Metadata } from "next"
import { Suspense } from "react"
import { StudioLoader } from "@/components/studio-loader"

export const metadata: Metadata = {
  title: "設計工坊",
  description: "在這台瀏覽器裡撰寫、儲存與匯出一堂 NPDL 深度學習設計。",
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm text-muted-foreground">正在打開設計工坊…</p>
        </div>
      }
    >
      <StudioLoader />
    </Suspense>
  )
}
