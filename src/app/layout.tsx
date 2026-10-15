import type { Metadata } from "next"
import "@fontsource/noto-sans-tc/latin-400.css"
import "@fontsource/noto-sans-tc/latin-500.css"
import "@fontsource/noto-sans-tc/latin-700.css"
import "@fontsource/noto-sans-tc/chinese-traditional-400.css"
import "@fontsource/noto-sans-tc/chinese-traditional-500.css"
import "@fontsource/noto-sans-tc/chinese-traditional-700.css"
import "@fontsource/noto-serif-tc/latin-600.css"
import "@fontsource/noto-serif-tc/latin-700.css"
import "@fontsource/noto-serif-tc/chinese-traditional-600.css"
import "@fontsource/noto-serif-tc/chinese-traditional-700.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "深學工坊｜NPDL 深度學習設計",
    template: "%s｜深學工坊",
  },
  description:
    "給教師的 New Pedagogies for Deep Learning 設計工具。用六大全球素養與四個學習設計要素，寫一堂走得出教室的課。",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className="h-full" style={{ colorScheme: "light" }}>
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          跳到內容
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
