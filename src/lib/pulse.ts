export type PulseLevel = 1 | 2 | 3 | 4

export const pulseLevels: { value: PulseLevel; label: string; hint: string }[] = [
  { value: 1, label: "很少看到", hint: "幾乎沒有" },
  { value: 2, label: "零星出現", hint: "靠幾位老師" },
  { value: 3, label: "已經成習慣", hint: "這個團隊穩定在做" },
  { value: 4, label: "說得出來", hint: "換一位老師也能解釋" },
]

export const pulseGroups = [
  {
    id: "culture",
    title: "學習文化",
    items: [
      {
        id: "unfinished",
        text: "學生敢把未完成的想法拿出來，而不只交出標準答案。",
      },
      {
        id: "open-practice",
        text: "教師會把自己的教學設計公開給同事改，而不只在成果發表時展示。",
      },
    ],
  },
  {
    id: "leadership",
    title: "領導與時間",
    items: [
      {
        id: "meeting-question",
        text: "開會時會問「這次學生的哪一項素養往前了」，而不只問進度。",
      },
      {
        id: "shared-time",
        text: "跨領域教師有固定時間一起改同一個任務。",
      },
    ],
  },
  {
    id: "partnerships",
    title: "夥伴",
    items: [
      {
        id: "midway",
        text: "家長或社區夥伴會在任務中途加入，而不只在發表會出現。",
      },
      {
        id: "outside",
        text: "學生能指出這次學習和校外某個人或某個地方的關係。",
      },
    ],
  },
  {
    id: "digital",
    title: "數位",
    items: [
      {
        id: "purpose",
        text: "數位用來連結、創作或取得回饋，而不只是把作業交上去。",
      },
      {
        id: "choice",
        text: "學生能說明為什麼用這個工具，而不是因為教師指定。",
      },
    ],
  },
] as const

export type PulseId = (typeof pulseGroups)[number]["items"][number]["id"]

export function pulseNarrative(answers: Partial<Record<PulseId, PulseLevel>>) {
  const ids = pulseGroups.flatMap((group) => group.items.map((item) => item.id))
  const values = ids.map((id) => answers[id]).filter((value): value is PulseLevel => Boolean(value))
  if (values.length < ids.length) return null

  const average = values.reduce((sum, value) => sum + value, 0) / values.length
  const weakest = pulseGroups
    .map((group) => {
      const score =
        group.items.reduce((sum, item) => sum + (answers[item.id] ?? 0), 0) / group.items.length
      return { title: group.title, score }
    })
    .sort((a, b) => a.score - b.score)[0]

  let headline = "條件已散落在幾位老師身上"
  let detail =
    "先不要全校一起啟動。找一個願意公開教學的小組，用同一份設計工坊的稿子改一個正在教的單元。"

  if (average >= 3.2) {
    headline = "這個團隊已經有可以靠的習慣"
    detail = `下一個槓桿放在「${weakest.title}」。挑一個正在進行的任務，只改跟這件事有關的一個動作，並約一次課後把證據拿出來看。`
  } else if (average >= 2.3) {
    headline = "已經有做法，還沒有共同語言"
    detail = `「${weakest.title}」目前最薄。用六大素養當跨科對話的詞，比再辦一場理念講座有用。下一次共備只問：這次主軸是哪一到兩項素養，證據長什麼樣子。`
  }

  return { average, headline, detail, weakest: weakest.title }
}
