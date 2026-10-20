import type { CompetencySlug } from "@/lib/competencies"

export type CompetencyMarking = {
  slug: CompetencySlug
  note: string
}

export type ExemplarLink = {
  label: string
  wishId: string
}

export type Exemplar = {
  slug: string
  title: string
  year: "2026" | "2023" | "2022"
  yearLabel: string
  people: string
  subjects: string
  summary: string
  current: CompetencyMarking[]
  next: CompetencyMarking
  links: ExemplarLink[]
}

export const exemplars: Exemplar[] = [
  {
    slug: "sdgs-2026",
    title: "SDGs 行動不 NG",
    year: "2026",
    yearLabel: "2026",
    people: "黃怡婷、麥芃芃",
    subjects: "高二多元選修 · 國文、英文",
    summary: "跨科選修。學生認識永續發展目標，做探究報告、雙語徽章和海報，也用 See-Think-Wonder 與 ORID 整理想法。",
    current: [
      {
        slug: "critical",
        note: "簡報把批判思考寫進課程目標，期末問卷用 22 題看思辨。教師反思寫到：學生多半還在照格式填，工具本身還不等於想得更深。",
      },
      {
        slug: "citizenship",
        note: "同一頁課程目標寫了公民素養。任務放在 SDGs 與校園生活的連結，也有一份公民素養問卷。",
      },
      {
        slug: "communication",
        note: "課程目標同時寫了溝通。雙語海報、徽章和上台分享，都要把永續議題說給別人聽。",
      },
    ],
    next: {
      slug: "collaboration",
      note: "跨科備課、小組桌遊、手冊和海報都已經在發生，課程目標還沒有把協作列成全球素養。下一步可以把「誰貢獻了什麼、意見不同時怎麼處理」設計成要留下的證據。教師反思另寫了走出教室做淨灘或志工，那是把已經列上的公民素養做深。",
    },
    links: [{ label: "開啟簡報", wishId: "e9YpQNpzlyO1WxjM" }],
  },
  {
    slug: "i-see-you",
    title: "I see you",
    year: "2026",
    yearLabel: "2026",
    people: "謝璦羽",
    subjects: "高三英文",
    summary: "全英語課。學生看自己的情緒狀態，用 ORID 談壓力，也做關懷與互助的情境。",
    current: [
      {
        slug: "collaboration",
        note: "封面寫的是 NPDL 協作。設計段落把關懷、互助和小組討論放在一起。",
      },
    ],
    next: {
      slug: "character",
      note: "課裡已有情緒自我檢視和身體訊號，這比較靠近品格裡的自我覺察。封面沒有把品格設成主軸。下一步可以讓「學生說得出自己現在的狀態、以及下一步怎麼調整」成為證據，而不只看小組有沒有一起完成。",
    },
    links: [{ label: "開啟簡報", wishId: "dMA1W85x1jkAa4OV" }],
  },
  {
    slug: "international-2026",
    title: "國際教育",
    year: "2026",
    yearLabel: "2026",
    people: "黃燕靜、麥芃芃、楊鵬耀",
    subjects: "高一 · 彈性時間 · 國際教育",
    summary: "和美國阿布奎基高校做短影音與視訊。學生用 Canva 介紹台灣與花蓮，並完成約一分鐘的全英影片。",
    current: [
      {
        slug: "communication",
        note: "前後測都在量溝通力。活動是看對方的影片、做給對方的簡報，再依回饋改自己的短片。",
      },
    ],
    next: {
      slug: "citizenship",
      note: "學生在向另一個國家介紹自己的生活。下一步可以加上：這支影片讓對方看見誰、漏掉誰，而不只看英文有沒有說清楚。",
    },
    links: [{ label: "開啟簡報", wishId: "zV61Q6xk14EEWO98" }],
  },
  {
    slug: "running-2026",
    title: "不只會考試，更要會跑步",
    year: "2026",
    yearLabel: "2026",
    people: "鄭雅方、邱培杰",
    subjects: "健康促進",
    summary: "健康體位。學生定期量測、做飲食與運動選擇，並寫挫折之後怎麼再開始的反思。",
    current: [
      {
        slug: "character",
        note: "評估頁寫品格：身心韌性與自我管理。質性證據是中期量測後的「挫折與修復」反思。",
      },
      {
        slug: "citizenship",
        note: "同一頁寫公民素養：從照顧自己，走到班級一起維持運動習慣。",
      },
    ],
    next: {
      slug: "critical",
      note: "課裡已經有體位數字和飲食紀錄。下一步可以要學生說明哪一筆數字支持結論、哪一筆只是打卡，把批判思考設成要看的證據。",
    },
    links: [{ label: "開啟簡報", wishId: "Xb8YaLpwlylBayn1" }],
  },
  {
    slug: "hualien-tech",
    title: "花蓮學（新興科技）",
    year: "2026",
    yearLabel: "2026",
    people: "黃楨喻、林佩琪",
    subjects: "資訊、家政 · 花蓮學",
    summary: "認識原住民野菜與在地食材，用 Google Lens 辨識，也用 AI 產生食譜再實際烹調。",
    current: [
      {
        slug: "collaboration",
        note: "評估頁勾了協作。後測寫協作向度有進步，學生描述依專長分工、處理組內衝突。",
      },
      {
        slug: "communication",
        note: "同一頁也勾了溝通。學生要口頭分享，並在採買前用群組把事情說定。",
      },
    ],
    next: {
      slug: "critical",
      note: "教師在未來方向裡寫了：比較 AI 生成食譜和傳統食譜的差異，培養批判性思考。這項還沒勾進這次的全球素養。",
    },
    links: [{ label: "開啟簡報", wishId: "lDK1ZRLodkGYaJ9z" }],
  },
  {
    slug: "first-aid",
    title: "大傷分類 Go",
    year: "2026",
    yearLabel: "2026",
    people: "黃雅蕾",
    subjects: "健康與護理 · 基礎急救",
    summary: "基礎急救。學生依技術熟練度和體力分工，在模擬情況裡互相協調。",
    current: [
      {
        slug: "collaboration",
        note: "簡報標題就是協作素養的前後測。學生把「做報告的分工」說成「急救現場的分工」。",
      },
    ],
    next: {
      slug: "communication",
      note: "後測裡人際與溝通是成長明顯的一塊，下一步也寫了衝突時怎麼安撫。可以把「在當下把話講清楚」設計成溝通的證據，而不只看工作有沒有分完。",
    },
    links: [{ label: "開啟簡報", wishId: "wKmOZ57EvB2VazMA" }],
  },
  {
    slug: "ocean",
    title: "搶救海洋大作戰",
    year: "2026",
    yearLabel: "2026",
    people: "黃雅蕾",
    subjects: "高三 · 部定必修",
    summary: "認識台灣海洋環境、賞鯨規範和海廢再利用，也學戶外活動的風險判斷。檔案實施時間寫 112 學年度第二學期。",
    current: [
      {
        slug: "citizenship",
        note: "評估頁把全球視野、平等與福祉、永續和解決複雜問題放在 NPDL 全球素養。活動包含賞鯨規範、海廢藝術，以及把保育講給別人聽。",
      },
    ],
    next: {
      slug: "critical",
      note: "課裡用 Windy 和 AI 看天氣、做安全決定。下一步可以要學生寫出採用了哪一則資訊、放下了哪一則，把這段設計成批判思考。",
    },
    links: [{ label: "開啟 PDF", wishId: "R7dXadN4bkoeZ6bl" }],
  },
  {
    slug: "hualien-study",
    title: "花蓮學",
    year: "2023",
    yearLabel: "2023 整理",
    people: "黃燕靜、麥芃芃、楊鵬耀",
    subjects: "高一校訂必修 · 藝術、音樂、英詩",
    summary: "自 2020 年起的高一校訂必修。學生分組寫英文詩、拍照，並做英語簡報。",
    current: [
      {
        slug: "collaboration",
        note: "課程分享把協作的向度全部勾起。成功標準、前後測和教師省思都在看小組能不能一起完成詩和簡報。",
      },
    ],
    next: {
      slug: "communication",
      note: "溝通的格子沒有勾，但學生要做英語簡報、給同儕回饋，也到郭子究音樂故居口頭報告。教師寫下一次會多看寫作。下一步可以把「這份作品是說給誰聽的」設成主軸。",
    },
    links: [{ label: "開啟 Word", wishId: "wKmOZ57bdkx0azMA" }],
  },
  {
    slug: "travel-english",
    title: "旅遊英文",
    year: "2022",
    yearLabel: "2022／110 學年第二學期",
    people: "謝璦羽、麥芃芃",
    subjects: "高三多元選修 · 英文",
    summary: "學生用英語對外籍大學生簡報，訪青年旅社，一起攀岩，並到太魯閣族支亞干部落踏查。",
    current: [
      {
        slug: "communication",
        note: "摘要寫課程主要著重溝通，關鍵詞是溝通力。分享模板把溝通的向度都勾了。簡報對準：依受眾設計、事後反思、用英文表達自己的文化。",
      },
    ],
    next: {
      slug: "citizenship",
      note: "青旅、攀岩教練和支亞干部落已經在課裡，公民素養的格子沒有勾。下一步可以把踏查從「用英文介紹」設計成「我們要為這個社區的誰，提出一件做得到的事」。",
    },
    links: [
      { label: "課程分享 Word", wishId: "yEPVZko59J3pZb0Y" },
      { label: "110 學年第二學期簡報", wishId: "R7dXadN4bnPjZ6bl" },
    ],
  },
]

export const exemplarYears = [
  { id: "all", label: "全部學年" },
  { id: "2026", label: "2026" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
] as const

export function getExemplar(slug: string) {
  return exemplars.find((item) => item.slug === slug)
}
