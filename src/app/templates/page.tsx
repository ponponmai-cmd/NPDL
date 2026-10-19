import type { Metadata } from "next"
import Link from "next/link"
import { OutLink } from "@/components/out-link"
import { PageIntro } from "@/components/page-intro"
import { templateGroups, templates, templateSteps, wishUrl } from "@/lib/school"

export const metadata: Metadata = {
  title: "教案格式",
  description: "花蓮高中 NPDL 課程分享的 Word、簡報格式，以及共備時用的對照和工具入口。",
}

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Templates"
        title="教案格式放在資源板，這裡是下載入口"
        lede="花中分享一門課時，沿用同一份課程分享模板：先評估，再設計、實施，最後檢核與反思。檔案比較大，不放進這個網站，請從花中 NPDL 資源板下載。"
      />

      <ol className="mt-10 grid gap-3 md:grid-cols-4">
        {templateSteps.map((step, index) => (
          <li key={step.title} className="rounded-2xl bg-white p-4 ring-1 ring-foreground/10">
            <p className="text-xs text-primary">0{index + 1}</p>
            <h2 className="mt-2 font-heading text-2xl">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        模板請教師從六項裡挑一到兩項，並寫上對應的總綱核心素養和校本學生能力圖像。學生圖像在
        <Link href="/vision" className="mx-1 underline decoration-foreground/30 underline-offset-4">
          願景
        </Link>
        頁，六項說法在
        <Link href="/competencies" className="mx-1 underline decoration-foreground/30 underline-offset-4">
          素養
        </Link>
        頁。本站沒有把整份表格重貼一次。
      </p>

      <div className="mt-12 space-y-12">
        {templateGroups.map((group) => (
          <section key={group.id}>
            <h2 className="font-heading text-3xl">{group.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{group.lede}</p>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {templates
                .filter((item) => item.group === group.id)
                .map((item) => (
                  <li key={item.wishId} className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
                    <p className="text-xs text-muted-foreground">{item.format}</p>
                    <h3 className="mt-2 font-heading text-2xl">{item.title}</h3>
                    <p className="mt-3 flex-1 leading-7">{item.summary}</p>
                    <div className="mt-4">
                      <OutLink href={wishUrl(item.wishId)}>在資源板開啟</OutLink>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
