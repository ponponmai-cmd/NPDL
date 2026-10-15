export const competencySlugs = [
  "character",
  "citizenship",
  "collaboration",
  "communication",
  "creativity",
  "critical",
] as const

export type CompetencySlug = (typeof competencySlugs)[number]

export type LookFor = {
  band: "初探" | "展開" | "深化"
  text: string
}

export type Competency = {
  slug: CompetencySlug
  zh: string
  en: string
  mark: string
  color: string
  question: string
  summary: string
  shallow: string
  deep: string
  designQuestions: string[]
  lookFors: LookFor[]
}

export const competencies: Competency[] = [
  {
    slug: "character",
    zh: "品格",
    en: "Character",
    mark: "品",
    color: "#1f6b58",
    question: "學習者如何認識自己，並把該做的事做完？",
    summary:
      "品格是學習如何學習：毅力、同理、自我覺察，以及在沒有人盯著的時候仍對自己的行為負責。",
    shallow: "把「態度良好」寫進評語，或用加分鼓勵學生準時交件。",
    deep: "學生說得出自己卡在哪、怎麼調整，並且在作品會影響別人時仍然可被交代。",
    designQuestions: [
      "這次任務哪一段會讓學生遇到真正的困難，而不是只把步驟走完？",
      "學生要對誰負責？是對老師的分數，還是對會使用這份作品的人？",
      "他們有沒有機會看見自己的學習方式，並在中途改一次做法？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "遇到卡關時會說出自己卡在哪，而不是立刻放棄或假裝會了。",
      },
      {
        band: "展開",
        text: "能依自己的學習方式調整做法，並在小組裡對不同的人保持尊重。",
      },
      {
        band: "深化",
        text: "沒有人計分的時候，仍把會影響他人的部分做到可以交代。",
      },
    ],
  },
  {
    slug: "citizenship",
    zh: "公民素養",
    en: "Citizenship",
    mark: "公",
    color: "#1d4e89",
    question: "學習者如何看懂一個真實問題，並採取對人與環境有益的行動？",
    summary:
      "公民素養是把自己放進更大的世界：理解不同立場，關心在地與全球議題，並做出小而可被檢驗的行動。",
    shallow: "做一張海報呼籲大家要愛地球，沒有具體對象，也沒有後續。",
    deep: "學生能指出誰被這個問題影響、自己的建議漏掉了誰，並依對方的回應把行動改小、改具體。",
    designQuestions: [
      "這個問題在學校門外，現在就有人在處理嗎？",
      "學生會接觸到哪些互相不一樣的說法，而不只收到一份整理好的資料？",
      "最後的行動要交給誰回應，才不會停在教室裡的想像？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "能說出這個問題影響到哪些人，而不只用一句口號帶過。",
      },
      {
        band: "展開",
        text: "會把不同立場並排，並指出自己的行動可能忽略了誰。",
      },
      {
        band: "深化",
        text: "提出的行動小到做得到、具體到能被社區回應，而且願意依回應再改。",
      },
    ],
  },
  {
    slug: "collaboration",
    zh: "協作",
    en: "Collaboration",
    mark: "協",
    color: "#a15c28",
    question: "學習者如何跟不同的人一起把事情做成？",
    summary:
      "協作不是分組把作業切開。學生要貢獻自己的專長、處理分歧，並讓團隊因為有彼此而變得更好。",
    shallow: "三人一組，最後由寫字最快的人把三份筆記貼成一份報告。",
    deep: "小組會依任務改變分工，意見不同時有方法處理，每個人的貢獻在作品裡看得到。",
    designQuestions: [
      "這份作品為什麼一個人做不成？如果做得到，分組就只是形式。",
      "意見不合的時候，學生有什麼可依循的做法，而不是等老師來裁判？",
      "怎麼讓安靜的貢獻也被看見，而不只獎勵最大聲的人？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "小組有分工，但作品仍像各做各的再拼起來。",
      },
      {
        band: "展開",
        text: "會處理意見不同，並讓每個人的貢獻在作品裡被指出來。",
      },
      {
        band: "深化",
        text: "能依任務改變分工，而不是永遠由最會說話的人領導。",
      },
    ],
  },
  {
    slug: "communication",
    zh: "溝通",
    en: "Communication",
    mark: "溝",
    color: "#b4453a",
    question: "學習者如何依對象把話講清楚，也聽得進去？",
    summary:
      "溝通包含說、寫、展示，也包含聽。重點是依對象和目的選擇方式，而不是把同一份簡報講給所有人聽。",
    shallow: "每組上台三分鐘，投影片格式統一，台下沒有需要這份資訊的人。",
    deep: "學生為一個真實對象選擇形式，問得出讓對方願意多說的問題，並依回饋再改一次。",
    designQuestions: [
      "誰需要聽懂這份作品？他們平時怎麼接收訊息？",
      "學生有沒有機會先聽，再決定自己要說什麼？",
      "發表之後，回饋會回到作品上，還是只變成一個分數？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "能把想法說完，但對象和目的還不清楚。",
      },
      {
        band: "展開",
        text: "會依聽的人改說法，也問得出讓對方願意多說的問題。",
      },
      {
        band: "深化",
        text: "形式是為那個真實對象而選的，而且聽完之後還能根據回饋改一次。",
      },
    ],
  },
  {
    slug: "creativity",
    zh: "創造力",
    en: "Creativity",
    mark: "創",
    color: "#6d4c7d",
    question: "學習者如何提出有用的新點子，並把它做成可被試用的東西？",
    summary:
      "創造力是看見機會、提出新做法，並有勇氣做成一個別人可以試的版本。新，是相對於這個問題，不是相對於酷炫。",
    shallow: "要求作品「要有創意」，最後比的是美工。",
    deep: "學生做出一個可被試用的版本，說得出為什麼這樣做，並依試用結果改得更有用。",
    designQuestions: [
      "學生要解決的限制是什麼？沒有限制，創意很容易變成裝飾。",
      "誰會在任務結束前試用這個點子？",
      "試用之後，哪一部分允許推倒重來？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "有新點子，但停在「如果可以的話」。",
      },
      {
        band: "展開",
        text: "做出一個可以被別人試用的版本，並說明為什麼這樣做。",
      },
      {
        band: "深化",
        text: "依試用結果改版，點子變得更有用，而不只是更好看。",
      },
    ],
  },
  {
    slug: "critical",
    zh: "批判思考",
    en: "Critical Thinking",
    mark: "思",
    color: "#0f5f6b",
    question: "學習者如何分辨資訊、看見關聯，並做成一個可被檢驗的解釋？",
    summary:
      "批判思考是評估說法與證據、看出模式，再把知識用回真實情境。它不是挑毛病，而是把解釋做得站得住。",
    shallow: "上網找三篇資料，整理成筆記，沒有比較說法從哪裡來。",
    deep: "學生分得清聽到的和推測的，能並排互相矛盾的證據，並說出自己的解釋還不能回答什麼。",
    designQuestions: [
      "學生會遇到哪些彼此不一致的資訊？如果只有一份正確答案，就很難練到這項。",
      "他們要產出的是一個可被檢查的解釋，還是一份摘要？",
      "這個解釋最後要用在什麼決定上？",
    ],
    lookFors: [
      {
        band: "初探",
        text: "能區分「我聽到的」和「我推測的」。",
      },
      {
        band: "展開",
        text: "會追問證據從哪來，並看出兩個說法哪裡互相矛盾。",
      },
      {
        band: "深化",
        text: "能把零散資訊組成可被檢驗的解釋，並說出這個解釋還不能回答什麼。",
      },
    ],
  },
]

export function getCompetency(slug: string) {
  return competencies.find((item) => item.slug === slug)
}

export function isCompetencySlug(slug: string): slug is CompetencySlug {
  return competencySlugs.some((item) => item === slug)
}
