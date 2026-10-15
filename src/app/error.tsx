"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <p className="text-sm font-medium text-primary">這頁沒有順利打開</p>
      <h1 className="mt-2 font-heading text-4xl">讀取時發生問題</h1>
      <p className="mt-4 leading-8 text-muted-foreground">
        可以再試一次。若你正在設計工坊，已存進這台瀏覽器的稿子還在，不會因為這一頁出錯就消失。
      </p>
      <Button type="button" className="mt-6 h-11 px-4" onClick={() => reset()}>
        再試一次
      </Button>
    </div>
  )
}
