import type { Metadata } from "next"
import Link from "next/link"
import { ExemplarBrowser } from "@/components/exemplar-browser"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "花中課程示例",
  description: "花蓮高中的 NPDL 教案：每份標出已經對上的全球素養，以及下一步可以設計的素養。",
}

export default function ExemplarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="花蓮高中"
        title="課程示例只放花中的教案"
        lede={
          <>
            每一份都來自花蓮高中 NPDL 資源板上的檔案。已經對上的素養，依教案裡勾選或寫明的項目。下一步是往後設計時可以補上的那一項，完整檔案在
            <Link href="/archive" className="mx-1 underline decoration-foreground/30 underline-offset-4">
              歷年
            </Link>
            頁下載。
          </>
        }
      />
      <div className="mt-10">
        <ExemplarBrowser />
      </div>
    </div>
  )
}
