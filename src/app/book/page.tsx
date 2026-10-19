import type { Metadata } from "next"
import Link from "next/link"
import { PageIntro } from "@/components/page-intro"
import { OutLink } from "@/components/out-link"
import { externalLinks } from "@/lib/school"

export const metadata: Metadata = {
  title: "參與世界，改變世界",
  description: "《參與世界，改變世界》的簡短介紹。簡報和讀書會分享尚未放入。",
}

const shelves = [
  {
    title: "簡報",
    text: "讀書會或增能用的投影片還沒有放上來。檔案確定之後，會依場次列在這裡，並註明講者和日期。",
  },
  {
    title: "讀書會分享",
    text: "各次的筆記、討論題和老師留下的句子還沒有放上來。現在這個區塊是空的，避免把還沒發生的討論寫成紀錄。",
  },
]

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Engage the World Change the World"
        title="參與世界，改變世界"
        lede="這是花中談深度學習時指的那本書。英文書名 Deep Learning: Engage the World Change the World，作者是 Michael Fullan、Joanne Quinn、Joanne McEachen，2018 年出版。臺灣的 NPDL 社群用《參與世界，改變世界》稱呼它。"
      />

      <section className="mt-10 max-w-3xl space-y-4 leading-8">
        <p>
          書要把學習拉出「上完、考完」：學生參與一個真實世界裡的問題，並且讓那個世界因為他們的作品有一點不一樣。花中現在用來備課的六項素養，以及學習夥伴、學習環境、教學實踐、數位利用這四個要素，就是這套框架裡的語言。
        </p>
        <p>
          這個專區不摘錄原文，也不放書頁。素養怎麼在花中說、問卷和教案格式在哪，分別在站內頁面。簡報和讀書會的材料之後補上。
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/competencies" className="text-sm underline decoration-foreground/30 underline-offset-4">
          六項素養
        </Link>
        <Link href="/design" className="text-sm underline decoration-foreground/30 underline-offset-4">
          四個設計要素
        </Link>
        <Link href="/vision" className="text-sm underline decoration-foreground/30 underline-offset-4">
          花中願景與學生圖像
        </Link>
      </div>
      <div className="mt-4">
        <OutLink href={externalLinks.npdlGlobal}>New Pedagogies for Deep Learning</OutLink>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-3xl">還沒放上來的兩塊</h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {shelves.map((shelf) => (
            <li
              key={shelf.title}
              className="rounded-2xl border border-dashed border-foreground/25 bg-white/50 px-5 py-8"
            >
              <p className="text-xs tracking-wide text-muted-foreground">尚未收入</p>
              <h3 className="mt-2 font-heading text-2xl">{shelf.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{shelf.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
