import type { Metadata } from "next"
import Link from "next/link"
import { PageIntro } from "@/components/page-intro"
import { PulseCheck } from "@/components/pulse-check"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "學校怎麼開始",
  description: "一個小組就能開始的 NPDL 深度學習做法，以及八題學校條件自我檢查。",
}

const steps = [
  {
    title: "找兩個人，不找全校",
    text: "一位願意把自己的教案打開的老師，加上一位願意改它的同事。行政先保住他們的共備時間。",
  },
  {
    title: "改正在教的單元",
    text: "不要另開一門深學課。選一個三週內會上到的單元，用設計工坊重寫任務。",
  },
  {
    title: "只盯一到兩項素養",
    text: "六項都想練，證據就會變成「學生表現良好」。先選主軸，其他素養讓它自然出現。",
  },
  {
    title: "上課時收集一種證據",
    text: "約好要聽的那一句話或要看的那個行為。作品可以很漂亮，但沒有這項證據就不算這輪結束。",
  },
  {
    title: "留下一個改動作",
    text: "下一輪只改一個教學動作。寫進備課紀錄，讓沒有參加這次討論的人也能接。",
  },
]

const faqs = [
  {
    q: "這和 108 課綱的素養導向是同一件事嗎？",
    a: "方向相近，語言不同。NPDL 用六大全球素養當跨國、跨科可以一起說的詞。學校仍要對準自己的課程綱要，而不是用六 C 取代學科。",
  },
  {
    q: "一定要先加入全球夥伴嗎？",
    a: "不必先加入才能設計一堂比較深的課。若要使用正式的學習進程、條件量尺和跨國共備，再連到 New Pedagogies for Deep Learning 或臺灣的學校聯盟。",
  },
  {
    q: "深學工坊的觀察點可以拿來評分嗎？",
    a: "不要。初探、展開、深化是備課時跟同事對焦用的。它不是官方量尺，也沒有做過等第的信效度。",
  },
  {
    q: "設計稿存在哪裡？",
    a: "只存在你現在這台瀏覽器。沒有帳號，也不會上傳。換電腦或清除網站資料，稿子就不見了。重要的版本請下載文字檔。",
  },
]

export default function StartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Getting started"
        title="從一個小組、一個單元開始"
        lede="NPDL 談的是系統怎麼移動，但移動的第一個證據通常是兩位老師把同一堂課改深。下面的做法不需要新的委員會。"
      />
      <ol className="mt-10 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:grid-cols-[72px_1fr]">
            <p className="font-heading text-3xl text-primary">0{index + 1}</p>
            <div>
              <h2 className="font-heading text-2xl">{step.title}</h2>
              <p className="mt-2 leading-7 text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Link href="/studio" className={buttonVariants({ size: "lg", className: "h-11 px-4" })}>
          打開設計工坊
        </Link>
      </div>

      <section className="mt-16">
        <h2 className="font-heading text-3xl md:text-4xl">這所學校現在站在哪</h2>
        <p className="mt-3 max-w-3xl leading-8 text-muted-foreground">
          八題只給自己的團隊看。它對應 NPDL 常談的學習文化、領導、夥伴與數位，但不是官方的學校條件量尺，也不會把回答送出這台裝置。
        </p>
        <div className="mt-6">
          <PulseCheck />
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-heading text-3xl">開始之前會問的</h2>
        <Accordion className="mt-4">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-7 text-muted-foreground">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
