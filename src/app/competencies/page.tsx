import type { Metadata } from "next"
import Link from "next/link"
import { competencies } from "@/lib/competencies"
import { CompetencyMark } from "@/components/competency-mark"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "六大素養",
  description: "NPDL 的六項全球素養：品格、公民素養、協作、溝通、創造力、批判思考。",
}

export default function CompetenciesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="6Cs"
        title="六項素養，一次只練一到兩項"
        lede="NPDL 用這六項描述深度學習者。它們不是另一份評量科目，而是設計任務時要盯住的學習。正式的學習進程請用全球夥伴的工具；下面的觀察點是備課時的簡化說法。"
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {competencies.map((item) => (
          <li key={item.slug}>
            <article className="h-full rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
              <div className="flex items-center gap-3">
                <CompetencyMark slug={item.slug} />
                <div>
                  <h2 className="font-heading text-2xl">
                    <Link href={`/competencies/${item.slug}`} className="hover:text-primary">
                      {item.zh}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">{item.en}</p>
                </div>
              </div>
              <p className="mt-4 leading-7">{item.summary}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">淺的做法：{item.shallow}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
