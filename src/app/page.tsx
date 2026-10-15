import Link from "next/link"
import { competencies } from "@/lib/competencies"
import { elements } from "@/lib/elements"
import { exemplars } from "@/lib/exemplars"
import { gradeLabel } from "@/lib/drafts"
import { inquiryMoves } from "@/lib/inquiry"
import { CompetencyMark } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-sm font-medium tracking-wide text-primary">New Pedagogies for Deep Learning</p>
          <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.2] text-balance md:text-6xl">
            把深度學習寫成一堂課做得到的事
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            這裡的深度學習，是教育裡的 NPDL：學生在真實問題裡練成品格、公民素養、協作、溝通、創造力與批判思考。深學工坊把這六項素養和四個設計要素，收成你可以填、可以存、可以改的備課稿。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/studio" className={buttonVariants({ size: "lg", className: "h-11 px-4 text-base" })}>
              開始寫一堂課
            </Link>
            <Link
              href="/competencies"
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-4 text-base" })}
            >
              先看六大素養
            </Link>
          </div>
        </div>
        <article className="rounded-2xl bg-[#241c16] p-6 text-[#f6f1e7] shadow-xl">
          <p className="text-xs tracking-[0.18em] text-[#e7c9a4]">一張備課卡</p>
          <h2 className="mt-4 font-heading text-3xl leading-snug">港邊的塑膠瓶要去哪裡</h2>
          <p className="mt-2 text-sm text-[#f6f1e7]/70">高中 · 地理、公民 · 主軸：公民素養、批判思考</p>
          <dl className="mt-6 space-y-4 text-sm leading-6">
            <div>
              <dt className="text-[#e7c9a4]">真實問題</dt>
              <dd>這一帶的瓶子從哪裡來？區公所一個月內可以做哪一件小事？</dd>
            </div>
            <div>
              <dt className="text-[#e7c9a4]">夥伴</dt>
              <dd>清潔隊、漁民、回收場。簡報頁數被限制，因為承辦人真的要看。</dd>
            </div>
            <div>
              <dt className="text-[#e7c9a4]">證據</dt>
              <dd>學生說得出建議忽略了誰，也寫得出兩種說法哪裡互相矛盾。</dd>
            </div>
          </dl>
          <Link href="/exemplars/harbor-plastic" className="mt-6 inline-block text-sm text-[#e7c9a4] underline underline-offset-4">
            看完整示例
          </Link>
        </article>
      </section>

      <section className="border-y border-foreground/10 bg-white/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="font-heading text-2xl">會留在身上</p>
            <p className="mt-2 leading-7 text-muted-foreground">
              深度學習指的是品質夠好、離開考卷還在的學習。它同時看學科與人怎麼跟別人相處。
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl">接得上真實世界</p>
            <p className="mt-2 leading-7 text-muted-foreground">
              任務要有校外的人在意。學生產出的東西，最好是那個人用得上、也能回得了話的。
            </p>
          </div>
          <div>
            <p className="font-heading text-2xl">全校用同一套詞</p>
            <p className="mt-2 leading-7 text-muted-foreground">
              六大素養讓不同學科的教師有話可接。不用先變成同一門課，只要先盯住同一兩項素養。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">六大全球素養</p>
            <h2 className="mt-1 font-heading text-3xl md:text-4xl">這次到底要練哪一項</h2>
          </div>
          <Link href="/competencies" className="text-sm underline decoration-foreground/30 underline-offset-4">
            六項放在一起看
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
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-sm text-primary-foreground/75">四個學習設計要素</p>
          <h2 className="mt-1 max-w-2xl font-heading text-3xl md:text-4xl">新教學法不是多一個活動，是這四件事一起改</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {elements.map((item, index) => (
              <li key={item.slug} className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs tracking-wide text-[#e7c9a4]">0{index + 1}</p>
                <h3 className="mt-2 font-heading text-2xl">{item.zh}</h3>
                <p className="mt-2 text-sm leading-6 text-primary-foreground/85">{item.lead}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/design"
            className="mt-8 inline-flex h-11 items-center rounded-lg bg-white px-4 text-sm font-medium text-primary"
          >
            看每個要素怎麼落地
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium text-primary">協作探究</p>
          <h2 className="mt-1 font-heading text-3xl md:text-4xl">設計、上課、看證據、再改一次</h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            NPDL 要學校用協作探究把深學做出來，而不是辦完一場工作坊就結束。深學工坊把這個循環收成五步，並用同一堂海岸課走給你看。
          </p>
          <Link href="/inquiry" className="mt-5 inline-block text-sm underline decoration-foreground/30 underline-offset-4">
            跟著走一遍
          </Link>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {inquiryMoves.map((move) => (
            <li key={move.id} className="rounded-2xl bg-white p-4 ring-1 ring-foreground/10">
              <p className="text-xs text-primary">{move.step}</p>
              <h3 className="mt-1 font-heading text-xl">{move.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{move.prompt}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-foreground/10 bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">課堂示例</p>
              <h2 className="mt-1 font-heading text-3xl">六堂寫好的課，用來改，不是用來照抄</h2>
            </div>
            <Link href="/exemplars" className="text-sm underline decoration-foreground/30 underline-offset-4">
              全部示例
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            這些是深學工坊撰寫的備課示例，不是 NPDL 官方範例，也不是某一所學校的真實教案。
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {exemplars.slice(0, 3).map((item) => (
              <li key={item.slug}>
                <Link href={`/exemplars/${item.slug}`} className="block h-full rounded-2xl bg-white p-5 ring-1 ring-foreground/10 hover:ring-primary/40">
                  <p className="text-xs text-muted-foreground">
                    {gradeLabel(item.grade)} · {item.subjects}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
