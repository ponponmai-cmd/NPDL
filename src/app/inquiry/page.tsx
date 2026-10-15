import type { Metadata } from "next"
import Link from "next/link"
import { InquiryWalk } from "@/components/inquiry-walk"
import { PageIntro } from "@/components/page-intro"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "協作探究",
  description: "用五個步驟走一遍 NPDL 的協作探究：看見學習者、共同設計、進入任務、收集證據、回頭改設計。",
}

export default function InquiryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Collaborative inquiry"
        title="一輪探究，比一場研習有用"
        lede="NPDL 的學校不是收集教案，而是一起設計、看學生怎麼變、再把設計改掉。下面五步是深學工坊用來備課的走法，用同一堂港邊的課當例子。它不是官方協議的逐字版本。"
      />
      <div className="mt-10">
        <InquiryWalk />
      </div>
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">人不用很多</h2>
          <p className="mt-2 leading-7 text-muted-foreground">兩位願意把草稿給對方改的老師，就夠開始一輪。先不要等全校課表對齊。</p>
        </article>
        <article className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">課不用新開</h2>
          <p className="mt-2 leading-7 text-muted-foreground">拿一個正在教的單元改寫。探究的對象是這次學習，不是另一個計畫。</p>
        </article>
        <article className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">改一個動作</h2>
          <p className="mt-2 leading-7 text-muted-foreground">每輪結束只留下一個下次要改的教學動作。寫得太多，下一輪就不會發生。</p>
        </article>
      </section>
      <div className="mt-8">
        <Link href="/studio" className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
          把這一輪寫成設計稿
        </Link>
      </div>
    </div>
  )
}
