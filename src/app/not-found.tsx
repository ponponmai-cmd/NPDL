import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <p className="text-sm font-medium text-primary">找不到這頁</p>
      <h1 className="mt-2 font-heading text-4xl">這條路徑沒有對應的內容</h1>
      <p className="mt-4 leading-8 text-muted-foreground">
        可能是示例或素養的網址打錯了。回到首頁，或直接進設計工坊。
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className={buttonVariants()}>
          回首頁
        </Link>
        <Link href="/exemplars" className={buttonVariants({ variant: "outline" })}>
          看課程示例
        </Link>
      </div>
    </div>
  )
}
