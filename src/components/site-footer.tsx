import Link from "next/link"

const links = [
  { href: "/competencies", label: "六大素養" },
  { href: "/design", label: "四個要素" },
  { href: "/inquiry", label: "協作探究" },
  { href: "/exemplars", label: "課堂示例" },
  { href: "/start", label: "學校怎麼開始" },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-[#f3ecdf]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-xl text-primary">深學工坊</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            給教師的 NPDL 設計工具。框架來自 Michael Fullan、Joanne Quinn、Joanne
            McEachen 所推動的 New Pedagogies for Deep Learning。本站獨立製作，不是全球夥伴或臺灣
            EDL 學校聯盟的官方網站。
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">站內</p>
          <ul className="mt-3 space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/studio" className="text-muted-foreground hover:text-foreground">
                設計工坊
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">官方出處</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="https://deep-learning.global/"
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                New Pedagogies for Deep Learning
              </a>
            </li>
            <li>
              <a
                href="https://www.npdl-tw.com/"
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                臺灣 NPDL 深度學習
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            正式的學習進程、條件量尺與會員工具，請以官方版本為準。本站的觀察點是備課用的簡化說法。
          </p>
        </div>
      </div>
    </footer>
  )
}
