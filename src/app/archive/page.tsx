import type { Metadata } from "next"
import { ArchiveBrowser } from "@/components/archive-browser"
import { OutLink } from "@/components/out-link"
import { PageIntro } from "@/components/page-intro"
import { externalLinks } from "@/lib/school"

export const metadata: Metadata = {
  title: "歷年檔案",
  description: "花蓮高中 NPDL 資源板上的歷年課程：旅遊英文、花蓮學，以及 2026 年的分享簡報。",
}

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Archive"
        title="花蓮高中放上資源板的課"
        lede="這裡依學年整理花中 NPDL 資源板上的課程檔。簡報和 Word 仍在原來的貼文，按下去即可下載。深學工坊裡的課堂示例是另外寫的備課稿，不是這些檔案。"
      />
      <div className="mt-8">
        <ArchiveBrowser />
      </div>

      <aside className="mt-12 rounded-2xl bg-white p-6 ring-1 ring-foreground/10">
        <h2 className="font-heading text-2xl">雲端搜尋打不開的那一批</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          Google 雲端的 NPDL 搜尋需要花中帳號，這個網站讀不到裡面的檔名。上面列的是資源板已經公開的檔案。若雲端還有沒貼上資源板的版本，請用學校帳號開啟搜尋。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <OutLink href={externalLinks.driveSearch}>開啟雲端搜尋 NPDL</OutLink>
          <OutLink href={externalLinks.padlet}>打開整面資源板</OutLink>
        </div>
      </aside>
    </div>
  )
}
