import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { exemplars, getExemplar } from "@/lib/exemplars"
import { wishUrl } from "@/lib/school"
import { CompetencyChip } from "@/components/competency-mark"
import { OutLink } from "@/components/out-link"
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
  if (!item) return { title: "找不到教案" }
  return { title: item.title, description: item.summary }
}

export default async function ExemplarPage({ params }: PageProps) {
  const { slug } = await params
  const item = getExemplar(slug)
  if (!item) notFound()

  const index = exemplars.findIndex((exemplar) => exemplar.slug === item.slug)
  const previous = exemplars[(index + exemplars.length - 1) % exemplars.length]
  const next = exemplars[(index + 1) % exemplars.length]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-muted-foreground">
        <Link href="/exemplars" className="hover:text-foreground">
          花中課程示例
        </Link>
      </p>
      <p className="mt-4 text-sm text-primary">
        {item.yearLabel} · {item.subjects}
      </p>
      <h1 className="mt-2 max-w-3xl font-heading text-4xl leading-tight md:text-5xl">{item.title}</h1>
      <p className="mt-2 text-muted-foreground">{item.people}</p>
      <p className="mt-4 max-w-3xl text-lg leading-8">{item.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.links.map((link) => (
          <OutLink key={link.wishId} href={wishUrl(link.wishId)}>
            {link.label}
          </OutLink>
        ))}
      </div>

      <section className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:p-6">
        <h2 className="font-heading text-3xl">已經對上的全球素養</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          依這份教案或簡報裡寫明、勾選的全球素養。沒有在檔案裡出現的項目，不放在這裡。
        </p>
        <ul className="mt-5 space-y-4">
          {item.current.map((mark) => (
            <li key={mark.slug} className="rounded-xl bg-[#fbf8f2] p-4">
              <CompetencyChip slug={mark.slug} />
              <p className="mt-3 leading-7">{mark.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-2xl bg-[#241c16] px-5 py-6 text-[#f6f1e7] md:px-6">
        <h2 className="font-heading text-3xl text-[#e7c9a4]">下一步可以設計</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#f6f1e7]/75">
          這是備課建議：課裡已經有這項素養的影子，檔案還沒把它設成主軸。不是課程發展委員會的決議，也不是教師已經勾選的結果。
        </p>
        <div className="mt-4">
          <CompetencyChip slug={item.next.slug} />
        </div>
        <p className="mt-4 max-w-3xl text-lg leading-8">{item.next.note}</p>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/exemplars/${previous.slug}`} className="text-sm hover:text-primary">
          上一份：{previous.title}
        </Link>
        <Link href={`/studio?from=${item.slug}`} className={buttonVariants()}>
          用這份的素養開一張備課稿
        </Link>
        <Link href={`/exemplars/${next.slug}`} className="text-sm hover:text-primary">
          下一份：{next.title}
        </Link>
      </div>
    </div>
  )
}
