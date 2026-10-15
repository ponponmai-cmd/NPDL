import type { Metadata } from "next"
import { ExemplarBrowser } from "@/components/exemplar-browser"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = {
  title: "課堂示例",
  description: "六堂 NPDL 備課示例：海岸垃圾、市場錄音、教室用電、街角改造、校園衝突、食譜實驗。",
}

export default function ExemplarsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageIntro
        eyebrow="Exemplars"
        title="拿來拆開看的課，不是官方範例"
        lede="每一堂都寫了年段、真實問題、四個要素、會看到的證據，以及最容易做歪的地方。它們是深學工坊撰寫的示例，用來練習設計語言，不是某校的真實教案，也未經 NPDL 審定。"
      />
      <div className="mt-10">
        <ExemplarBrowser />
      </div>
    </div>
  )
}
