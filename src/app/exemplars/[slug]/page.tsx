import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { exemplars, getExemplar } from "@/lib/exemplars"
import { gradeLabel } from "@/lib/drafts"
import { CompetencyChip } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return exemplars.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getExemplar(slug)
  if (!item) return { title: "找不到示例" }
  return { title: item.title, description: item.summary }
}

const blocks = [
  { key: "partnerships", label: "學習夥伴" },
  { key: "environment", label: "學習環境" },
  { key: "pedagogy", label: "教學實踐" },
  { key: "digital", label: "善用數位" },
] as const

export default async function ExemplarPage({ params }: PageProps) {
  const { slug } = await params
  const item = getExemplar(slug)
  if (!item) notFound()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link href="/exemplars" className="hover:text-foreground">
          課堂示例
        </Link>
      </p>
      <p className="mt-4 text-sm text-primary">
        {gradeLabel(item.grade)} · {item.subjects} · {item.sessions}
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl leading-tight md:text-5xl">{item.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8">{item.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.competencies.map((competency) => (
          <CompetencyChip key={competency} slug={competency} />
        ))}
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        這是深學工坊寫的備課示例，用來示範設計語言。它不是官方範例，也不是某一所學校的課堂紀錄。
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">情境</h2>
          <p className="mt-3 leading-7">{item.context}</p>
        </section>
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">學習者現況</h2>
          <p className="mt-3 leading-7">{item.learners}</p>
        </section>
      </div>

      <section className="mt-4 rounded-2xl bg-[#241c16] px-5 py-6 text-[#f6f1e7]">
        <h2 className="font-heading text-2xl text-[#e7c9a4]">真實問題</h2>
        <p className="mt-2 text-xl leading-8">{item.issue}</p>
      </section>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {blocks.map((block) => (
          <section key={block.key} className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
            <h2 className="font-heading text-2xl">{block.label}</h2>
            <p className="mt-3 leading-7">{item[block.key]}</p>
          </section>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-heading text-3xl">課怎麼走</h2>
        <ol className="mt-4 space-y-3">
          {item.arc.map((step, index) => (
            <li key={step.title} className="grid gap-2 rounded-xl bg-white px-4 py-3 ring-1 ring-foreground/10 md:grid-cols-[140px_1fr]">
              <p className="font-medium text-primary">
                {index + 1}. {step.title}
              </p>
              <p className="leading-7">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">看得到的證據</h2>
          <p className="mt-3 leading-7">{item.evidence}</p>
        </section>
        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">最容易做歪</h2>
          <p className="mt-3 leading-7">{item.pitfall}</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">下一次要改：{item.revision}</p>
        </section>
      </div>

      <div className="mt-8">
        <Link href={`/studio?from=${item.slug}`} className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
          把這堂課放進設計工坊
        </Link>
      </div>
    </div>
  )
}
