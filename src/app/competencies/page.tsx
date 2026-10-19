import type { Metadata } from "next"
import Link from "next/link"
import { competencies } from "@/lib/competencies"
import { schoolPhrases } from "@/lib/school"
import { CompetencyMark } from "@/components/competency-mark"
import { PageIntro } from "@/components/page-intro"
import { buttonVariants } from "@/components/ui/button"

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
        lede="NPDL 用這六項描述深度學習者。花中資源板上的中英對照，寫著每一項要看的說法。正式問卷在問卷頁；下面的觀察點仍是備課用的簡化說法，不是官方學習進程。"
      />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/surveys" className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
          六項問卷
        </Link>
        <Link
          href="/vision"
          className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-4" })}
        >
          和學生圖像的對照
        </Link>
      </div>
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
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                花中的說法：{schoolPhrases[item.slug].zh[0]}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
