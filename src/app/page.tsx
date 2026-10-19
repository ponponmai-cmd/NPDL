import Link from "next/link"
import { competencies } from "@/lib/competencies"
import { CompetencyMark } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"
import { school, visionPillars } from "@/lib/school"

const doors = [
  {
    href: "/competencies",
    index: "01",
    title: "六項素養與說明",
    text: "品格、公民素養、協作、溝通、創造力、批判思考。每一項都有花中資源板上的說法。",
  },
  {
    href: "/surveys",
    index: "02",
    title: "學生問卷",
    text: "墨爾本大學問卷的中英文複製連結，加上一份只留在瀏覽器裡的課堂快問。",
  },
  {
    href: "/templates",
    index: "03",
    title: "教案格式下載",
    text: "課程分享的 Word、簡報，以及共備用的對照和圖。檔案在資源板。",
  },
  {
    href: "/archive",
    index: "04",
    title: "歷年花中檔案",
    text: "旅遊英文、花蓮學，和 2026 年老師放上資源板的簡報。",
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-medium tracking-wide text-primary">{school.name}</p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.2] text-balance md:text-6xl">
            六項素養，寫進花中正在上的課
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            深度學習在這裡指的是 NPDL，不是人工智慧。花中的願景仍是人文關懷、科學思維、國際視野。這個網站把資源板上的素養說明、問卷、教案格式和歷年檔案整理成找得到的頁面。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/competencies" className={buttonVariants({ size: "lg", className: "h-11 px-4 text-base" })}>
              看六項素養
            </Link>
            <Link
              href="/archive"
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-4 text-base" })}
            >
              歷年檔案
            </Link>
          </div>
        </div>
        <article className="rounded-2xl bg-[#241c16] p-6 text-[#f6f1e7] shadow-xl">
          <p className="text-xs tracking-[0.18em] text-[#e7c9a4]">校訓</p>
          <h2 className="mt-4 font-heading text-3xl leading-snug">{school.motto}</h2>
          <p className="mt-4 text-sm leading-7 text-[#f6f1e7]/80">{school.goal}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {visionPillars.map((pillar) => (
              <li key={pillar.name} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                {pillar.name}
              </li>
            ))}
          </ul>
          <Link href="/vision" className="mt-6 inline-block text-sm text-[#e7c9a4] underline underline-offset-4">
            願景、學生圖像，和六項素養的對照
          </Link>
        </article>
      </section>

      <section className="border-y border-foreground/10 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-2">
          {doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10 hover:ring-primary/40"
            >
              <p className="text-xs tracking-wide text-primary">{door.index}</p>
              <h2 className="mt-2 font-heading text-2xl">{door.title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">{door.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">六大全球素養</p>
            <h2 className="mt-1 font-heading text-3xl md:text-4xl">一次盯住一到兩項</h2>
          </div>
          <Link href="/surveys" className="text-sm underline decoration-foreground/30 underline-offset-4">
            問卷與課堂快問
          </Link>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {competencies.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/competencies/${item.slug}`}
                className="flex h-full gap-3 rounded-2xl bg-white p-4 ring-1 ring-foreground/10 hover:ring-primary/40"
              >
                <CompetencyMark slug={item.slug} />
                <span>
                  <span className="block font-medium">
                    {item.zh}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">{item.en}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm text-primary-foreground/75">讀書會專區</p>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl">參與世界，改變世界</h2>
            <p className="mt-4 max-w-xl leading-8 text-primary-foreground/85">
              Fullan、Quinn、McEachen 的這本書，是花中這套六項素養和四個設計要素的出處。專區裡現在有一段介紹。簡報和各次讀書會分享還沒有放上來。
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex h-11 items-center rounded-lg bg-white px-4 text-sm font-medium text-primary"
            >
              看這個專區
            </Link>
          </div>
          <div className="rounded-2xl border border-dashed border-white/40 px-5 py-8">
            <p className="text-xs tracking-wide text-[#e7c9a4]">尚未收入</p>
            <p className="mt-3 font-heading text-2xl">簡報</p>
            <p className="mt-2 text-sm leading-7 text-primary-foreground/80">場次、講者和投影片確定後補上。</p>
            <p className="mt-5 font-heading text-2xl">讀書會分享</p>
            <p className="mt-2 text-sm leading-7 text-primary-foreground/80">討論題和筆記確定後，依場次列在同一頁。</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-medium text-primary">深學工坊</p>
        <h2 className="mt-1 max-w-2xl font-heading text-3xl md:text-4xl">想自己寫一堂課，用設計工坊</h2>
        <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
          工坊把六項素養和四個要素收成可以存、可以改的備課稿，只留在這台瀏覽器。裡面的課堂示例是工坊寫的練習，不是花中歷年檔案。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/studio" className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
            打開設計工坊
          </Link>
          <Link
            href="/exemplars"
            className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-4" })}
          >
            看練習用的示例
          </Link>
        </div>
      </section>
    </div>
  )
}
