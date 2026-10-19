import Link from "next/link"
import { primaryNav, toolNav } from "@/lib/nav"
import { externalLinks } from "@/lib/school"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-[#f3ecdf]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl text-primary">花蓮高中 NPDL</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            國立花蓮高級中學的深度學習資源頁。六項素養、問卷、教案格式和歷年檔案，整理自花中 NPDL
            資源板與學校公開的願景、學生圖像。設計工坊仍叫深學工坊，用來寫自己的備課稿。
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            本站不是 New Pedagogies for Deep Learning 全球夥伴，也不是臺灣 EDL 學校聯盟的官方網站。
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">花中資源</p>
          <ul className="mt-3 space-y-2 text-sm">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium">備課工具</p>
          <ul className="mt-3 space-y-2 text-sm">
            {toolNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">出處</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={externalLinks.padlet}
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                花中 NPDL 資源板
              </a>
            </li>
            <li>
              <a
                href={externalLinks.principal}
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                校長室願景與發展目標
              </a>
            </li>
            <li>
              <a
                href={externalLinks.npdlGlobal}
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                New Pedagogies for Deep Learning
              </a>
            </li>
            <li>
              <a
                href={externalLinks.npdlTw}
                className="text-muted-foreground underline decoration-foreground/20 underline-offset-4 hover:text-foreground"
              >
                臺灣 NPDL 深度學習
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            正式的學習進程和墨爾本大學問卷，請用原檔。本站的課堂快問和備課觀察點不是那些工具。
          </p>
        </div>
      </div>
    </footer>
  )
}
