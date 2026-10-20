import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { competencies, getCompetency } from "@/lib/competencies"
import { schoolPhrases, surveyFor } from "@/lib/school"
import { OutLink } from "@/components/out-link"
import { exemplars } from "@/lib/exemplars"
import { CompetencyMark } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return competencies.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getCompetency(slug)
  if (!item) return { title: "找不到素養" }
  return {
    title: item.zh,
    description: item.summary,
  }
}

export default async function CompetencyPage({ params }: PageProps) {
  const { slug } = await params
  const item = getCompetency(slug)
  if (!item) notFound()

  const index = competencies.findIndex((competency) => competency.slug === item.slug)
  const previous = competencies[(index + competencies.length - 1) % competencies.length]
  const next = competencies[(index + 1) % competencies.length]
  const related = exemplars.filter(
    (exemplar) =>
      exemplar.current.some((mark) => mark.slug === item.slug) || exemplar.next.slug === item.slug,
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link href="/competencies" className="hover:text-foreground">
          六大素養
        </Link>
      </p>
      <div className="mt-4 flex items-center gap-4">
        <CompetencyMark slug={item.slug} className="size-14 text-2xl" />
        <div>
          <h1 className="font-heading text-4xl md:text-5xl">{item.zh}</h1>
          <p className="text-muted-foreground">{item.en}</p>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-lg leading-8">{item.question}</p>
      <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">{item.summary}</p>

      <section className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:p-6">
        <h2 className="font-heading text-2xl">花中使用的說法</h2>
        <p className="mt-2 text-sm text-muted-foreground">{schoolPhrases[item.slug].docxTitle}</p>
        {schoolPhrases[item.slug].note ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{schoolPhrases[item.slug].note}</p>
        ) : null}
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium">中文</p>
            <ul className="mt-2 space-y-2 leading-7">
              {schoolPhrases[item.slug].zh.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">English</p>
            <ul className="mt-2 space-y-2 leading-7 text-muted-foreground">
              {schoolPhrases[item.slug].en.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          中英兩欄依資源板上的對照分列。英文有時把兩句寫在同一行，所以兩邊的條數不一定相同。課程分享模板的勾選用詞接近這份，填表時以模板為準。
        </p>
        {surveyFor(item.slug) ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <OutLink href={surveyFor(item.slug)!.zhCopy}>複製中文問卷</OutLink>
            <OutLink href={surveyFor(item.slug)!.enCopy}>複製英文問卷</OutLink>
            <Link
              href={`/surveys?c=${item.slug}#check`}
              className={buttonVariants({ variant: "outline", className: "h-9" })}
            >
              這一項的課堂快問
            </Link>
          </div>
        ) : null}
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">看起來像，但其實很淺</h2>
          <p className="mt-3 leading-7">{item.shallow}</p>
        </section>
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">做得深一點的時候</h2>
          <p className="mt-3 leading-7">{item.deep}</p>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-3xl">設計時可以問</h2>
        <ol className="mt-4 space-y-3">
          {item.designQuestions.map((question, questionIndex) => (
            <li key={question} className="flex gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-foreground/10">
              <span className="font-heading text-primary">0{questionIndex + 1}</span>
              <span className="leading-7">{question}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-3xl">備課用的觀察點</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          初探、展開、深化是深學工坊為了備課寫的三個層次，不是官方 Deep Learning Progressions 的等級。拿來跟同事對「這次希望看到什麼」，不要拿來給學生打等第。
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-3">
          {item.lookFors.map((look) => (
            <li key={look.band} className="rounded-2xl bg-white p-4 ring-1 ring-foreground/10">
              <p className="text-sm font-medium" style={{ color: item.color }}>
                {look.band}
              </p>
              <p className="mt-2 leading-7">{look.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-3xl">花中教案裡和這項有關的課</h2>
        {related.length === 0 ? (
          <p className="mt-3 text-muted-foreground">目前的花中教案還沒有把這項設成主軸或下一步。</p>
        ) : (
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((exemplar) => {
              const placed = exemplar.current.some((mark) => mark.slug === item.slug) ? "已經對上" : "下一步可以設計"
              return (
                <li key={exemplar.slug}>
                  <Link href={`/exemplars/${exemplar.slug}`} className="block rounded-2xl bg-white p-4 ring-1 ring-foreground/10 hover:ring-primary/40">
                    <p className="text-xs text-muted-foreground">
                      {exemplar.yearLabel} · {placed}
                    </p>
                    <p className="mt-1 font-heading text-xl">{exemplar.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{exemplar.summary}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <div className="mt-10 flex flex-col gap-3 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/competencies/${previous.slug}`} className="text-sm hover:text-primary">
          上一項：{previous.zh}
        </Link>
        <Link href="/studio" className={buttonVariants()}>
          用這項素養寫一堂課
        </Link>
        <Link href={`/competencies/${next.slug}`} className="text-sm hover:text-primary">
          下一項：{next.zh}
        </Link>
      </div>
    </div>
  )
}
