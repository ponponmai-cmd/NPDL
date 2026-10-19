import type { Metadata } from "next"
import Link from "next/link"
import { OutLink } from "@/components/out-link"
import { PageIntro } from "@/components/page-intro"
import { CompetencyMark } from "@/components/competency-mark"
import { crosswalk, externalLinks, portrait, school, visionPillars } from "@/lib/school"

export const metadata: Metadata = {
  title: "願景與學生圖像",
  description: "花蓮高中的校訓、願景、六大學生圖像，以及和 NPDL 六項素養的備課對照。",
}

export default function VisionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow={school.name}
        title="願景還是那三句，深度學習用六項素養把它做進課堂"
        lede="花中的願景、校訓和學生圖像寫在校長室與課程計畫裡。NPDL 沒有換成另一套學生圖像。下面先放學校自己的話，再放一份備課用的對照。"
      />

      <section className="mt-10 rounded-2xl bg-[#241c16] px-6 py-8 text-[#f6f1e7]">
        <p className="text-sm tracking-[0.16em] text-[#e7c9a4]">校訓</p>
        <p className="mt-3 font-heading text-3xl leading-snug md:text-4xl">{school.motto}</p>
        <p className="mt-4 max-w-3xl leading-8 text-[#f6f1e7]/80">{school.goal}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-3xl">學校願景</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          共同願景是人文關懷、科學思維、國際視野。三句後面的做法，引自校長室〈本校願景與發展目標〉。
        </p>
        <ol className="mt-5 grid gap-4 md:grid-cols-3">
          {visionPillars.map((pillar, index) => (
            <li key={pillar.name} className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
              <p className="text-xs text-primary">0{index + 1}</p>
              <h3 className="mt-2 font-heading text-2xl">{pillar.name}</h3>
              <p className="mt-3 leading-7">{pillar.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-3xl">學生圖像：六大力</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          一句話來自校長室頁面。括號裡的「懂得如何……」和六個指標，來自課程計畫書的學生圖像。數理資優班另列跨域力，不是全校學生圖像的第七項。
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portrait.map((item) => (
            <li key={item.name} className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
              <h3 className="font-heading text-2xl">{item.name}</h3>
              <p className="mt-2 leading-7">{item.line}</p>
              <p className="mt-3 text-sm text-primary">{item.knows}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.indicators.map((indicator) => (
                  <li key={indicator} className="rounded-full bg-[#f3ecdf] px-2.5 py-1 text-xs">
                    {indicator}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-heading text-3xl">和六項素養怎麼對</h2>
          <Link href="/competencies" className="text-sm underline decoration-foreground/30 underline-offset-4">
            看素養說明
          </Link>
        </div>
        <p className="mt-2 max-w-3xl rounded-xl bg-[#f3ecdf] px-4 py-3 text-sm leading-7">
          這一表是網站為了備課整理的對照，不是課程發展委員會的新決議。校本學生圖像仍以學校網站和課程計畫為準。
        </p>
        <ul className="mt-5 space-y-3">
          {crosswalk.map((row) => (
            <li key={row.slug} className="rounded-2xl bg-white p-4 ring-1 ring-foreground/10 md:p-5">
              <div className="flex items-start gap-3">
                <CompetencyMark slug={row.slug} />
                <div>
                  <h3 className="font-heading text-xl">
                    <Link href={`/competencies/${row.slug}`} className="hover:text-primary">
                      {row.npdl}
                    </Link>
                    <span className="mx-2 text-muted-foreground">→</span>
                    {row.school}
                  </h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{row.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl bg-white p-6 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">學生圖像的視覺稿</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Canva 連結是花中整理願景和學生圖像時用的視覺稿。要有能開啟該設計的帳號才看得到。這個網站沒有把圖檔下載進來，也沒有改畫一版。
          </p>
          <OutLink href={externalLinks.canva} className="mt-5">
            開啟 Canva 視覺稿
          </OutLink>
        </article>
        <article className="rounded-2xl bg-white p-6 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">出處</h2>
          <ul className="mt-3 space-y-3 text-sm leading-6">
            <li>
              <a className="underline decoration-foreground/30 underline-offset-4" href={externalLinks.principal}>
                校長室〈本校願景與發展目標〉
              </a>
            </li>
            <li>
              <a className="underline decoration-foreground/30 underline-offset-4" href={externalLinks.curriculumPdf}>
                課程計畫書（核定版 PDF）
              </a>
            </li>
            <li>
              <a className="underline decoration-foreground/30 underline-offset-4" href={externalLinks.schoolHome}>
                國立花蓮高級中學
              </a>
            </li>
          </ul>
        </article>
      </section>
    </div>
  )
}
