import type { Metadata } from "next"
import Link from "next/link"
import { OutLink } from "@/components/out-link"
import { PageIntro } from "@/components/page-intro"
import { QuickCheck } from "@/components/quick-check"
import { CompetencyMark } from "@/components/competency-mark"
import { externalLinks, surveyForms, wishUrl } from "@/lib/school"
import { isCompetencySlug } from "@/lib/competencies"

export const metadata: Metadata = {
  title: "素養問卷",
  description: "墨爾本大學學生問卷的複製連結，以及用花中 6C 說法做的課堂快問。",
}

type PageProps = {
  searchParams: Promise<{ c?: string }>
}

export default async function SurveysPage({ searchParams }: PageProps) {
  const { c } = await searchParams

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Questionnaires"
        title="六項素養各有一份學生問卷"
        lede="正式問卷是墨爾本大學的學生量表，花中資源板收成一份 Google 文件，裡面是中文和英文的「建立複本」連結。複製到自己的雲端之後，再決定要不要發給學生。這個網站不把題目搬進來。"
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <OutLink href={externalLinks.melbourneDoc}>問卷連結原檔</OutLink>
        <OutLink href={wishUrl("x5A7aroR009DQwr6")}>資源板上的這一則</OutLink>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        開啟複製連結需要 Google 帳號。六項之外還有一份學習主體性（Agency）。花中的 6C 對照沒有把它列成第七項，這裡只提供入口。學習進程不是這份問卷，學生版 PDF 在
        <Link href="/templates" className="mx-1 underline decoration-foreground/30 underline-offset-4">
          教案格式
        </Link>
        頁。
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {surveyForms.map((form) => (
          <li key={form.slug} className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
            <div className="flex items-center gap-3">
              {isCompetencySlug(form.slug) ? <CompetencyMark slug={form.slug} /> : (
                <span className="inline-flex size-11 items-center justify-center rounded-md bg-[#241c16] font-heading text-lg text-[#f6f1e7]">
                  主
                </span>
              )}
              <div>
                <h2 className="font-heading text-2xl">
                  {isCompetencySlug(form.slug) ? (
                    <Link href={`/competencies/${form.slug}`} className="hover:text-primary">
                      {form.zh}
                    </Link>
                  ) : (
                    form.zh
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">{form.en}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <OutLink href={form.zhCopy}>複製中文問卷</OutLink>
              <OutLink href={form.enCopy}>複製英文問卷</OutLink>
            </div>
          </li>
        ))}
      </ul>

      <section id="check" className="mt-16 scroll-mt-24">
        <h2 className="font-heading text-3xl md:text-4xl">課堂快問</h2>
        <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
          句子用花中 6C 中英對照的中文，問的是「這個說法現在有多像我」。這不是墨爾本大學的正式問卷，沒有分數常模，也不會送出。勾選只留在這一頁，重新整理就會清掉。
        </p>
        <div className="mt-6">
          <QuickCheck initialSlug={c} />
        </div>
      </section>
    </div>
  )
}
