import type { Metadata } from "next"
import Link from "next/link"
import { elements } from "@/lib/elements"
import { PageIntro } from "@/components/page-intro"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "四個學習設計要素",
  description: "學習夥伴、學習環境、教學實踐、善用數位：NPDL 用來設計深度學習的四個要素。",
}

const rows = [
  {
    topic: "任務從哪來",
    usual: "依課本章節出練習，交一份作業。",
    deep: "從一個校外的人正在面對的問題出發。",
  },
  {
    topic: "學生在做什麼",
    usual: "依步驟完成教師排好的流程。",
    deep: "和教師一起決定做法，並為真實對象負責。",
  },
  {
    topic: "怎麼算成功",
    usual: "答案正確、準時交、版面整齊。",
    deep: "那一兩項素養看得到變化，作品對真實對象有用。",
  },
  {
    topic: "數位放在哪",
    usual: "把紙本改成線上繳交。",
    deep: "用它連結人、取得回饋，或做出原本做不到的表達。",
  },
]

export default function DesignPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Learning Design"
        title="四個要素一起改，課才會深下去"
        lede="NPDL 認為新的教學法來自四件事的組合：學習夥伴、學習環境、教學實踐、善用數位。少一塊，活動很容易還是舊的課，只是換了桌子的排法。"
      />

      <div className="mt-10 space-y-6">
        {elements.map((item, index) => (
          <section key={item.slug} className="grid gap-6 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:grid-cols-[200px_1fr] md:p-7">
            <div>
              <p className="text-sm text-primary">0{index + 1}</p>
              <h2 className="mt-1 font-heading text-3xl">{item.zh}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.en}</p>
            </div>
            <div>
              <p className="text-lg leading-8">{item.summary}</p>
              <ul className="mt-4 space-y-2">
                {item.moves.map((move) => (
                  <li key={move} className="rounded-lg bg-[#f6f1e7] px-3 py-2 leading-7">
                    {move}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">容易漏掉的樣子：{item.miss}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-3xl">放在同一張桌上對</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-foreground/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#f3ecdf] text-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">看哪裡</th>
                <th className="px-4 py-3 font-medium">常見的做法</th>
                <th className="px-4 py-3 font-medium">深度學習的設計</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.topic} className="border-t border-foreground/10">
                  <th className="px-4 py-3 align-top font-medium">{row.topic}</th>
                  <td className="px-4 py-3 align-top leading-6 text-muted-foreground">{row.usual}</td>
                  <td className="px-4 py-3 align-top leading-6">{row.deep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-10">
        <Link href="/studio" className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
          把四個要素寫進一堂課
        </Link>
      </div>
    </div>
  )
}
