import type { CompetencySlug } from "@/lib/competencies"

export const school = {
  name: "國立花蓮高級中學",
  short: "花蓮高中",
  motto: "以天下為己任，惟詩書敦其仁",
  goal: "培養「人文關懷的熱情、具備科學思維的邏輯、開拓國際視野的胸襟」的花中青年。",
}

export const externalLinks = {
  padlet: "https://padlet.com/hualiangaozhong4/npdl-9z58bfhxc2zj038m",
  driveSearch: "https://drive.google.com/drive/u/0/search?q=NPDL",
  canva: "https://canva.link/tui1khudf29nuqn",
  principal:
    "https://www.hlhs.hlc.edu.tw/principal/content?a=T0RESU1qWXlOVEl5TkRjPTJRRE96QWpOeGNsVGludGVseQ%3D%3D",
  curriculumPdf:
    "https://www.hlhs.hlc.edu.tw/static/webroot/G159859767518927/application/NW167955013279697.pdf",
  schoolHome: "https://www.hlhs.hlc.edu.tw/",
  npdlGlobal: "https://deep-learning.global/",
  npdlTw: "https://www.npdl-tw.com/",
  melbourneDoc:
    "https://docs.google.com/document/d/1FHm4j5mvBwSXrMdRts5Pf7Hee0quTQeMu5HUCIm_GnI/edit?usp=sharing",
}

export function wishUrl(id: string) {
  return `${externalLinks.padlet}/wish/${id}`
}

export const visionPillars = [
  {
    name: "人文關懷",
    text: "培養具有人文關懷及服務態度的花中人。",
  },
  {
    name: "科學思維",
    text: "激發具有科學思維及邏輯判斷的花中人。",
  },
  {
    name: "國際視野",
    text: "打造深具國家認同及國際視野的花中人。",
  },
] as const

export const portrait = [
  {
    name: "學習力",
    line: "與時俱進的終身學習能力。",
    knows: "懂得如何學習",
    indicators: ["專注持續", "學習策略", "實事求是", "閱讀理解", "自我探索", "專業智能"],
  },
  {
    name: "思辨力",
    line: "分析判斷的高維思考能力。",
    knows: "懂得如何思辨",
    indicators: ["媒體識讀", "獨立思考", "邏輯推理", "批判思辨", "積極正向", "多元宏觀"],
  },
  {
    name: "創造力",
    line: "勇於挑戰的創意發想能力。",
    knows: "懂得如何創造",
    indicators: ["敏銳觀察", "發現問題", "解決問題", "創新觀點", "積極自主", "勇於嘗試"],
  },
  {
    name: "溝通力",
    line: "人道關懷的互動溝通能力。",
    knows: "懂得有效溝通",
    indicators: ["文字表達", "口語表達", "圖象表達", "影像表達", "全球視野", "溝通協調"],
  },
  {
    name: "品格力",
    line: "融合藝術的品德涵養能力。",
    knows: "懂得如何做人",
    indicators: ["明辨是非", "同理關心", "關懷社會", "人際關係", "自主管理", "挫折調適"],
  },
  {
    name: "實踐力",
    line: "積極果斷的實踐行動能力。",
    knows: "懂得如何做事",
    indicators: ["資源整合", "組織規劃", "永續發展", "執行檢討", "國際參與", "志工服務"],
  },
] as const

export const crosswalk: {
  slug: CompetencySlug
  npdl: string
  school: string
  note: string
}[] = [
  {
    slug: "character",
    npdl: "品格",
    school: "品格力，也含學習力裡的「學會如何學習」",
    note: "同理、正直、挫折之後還能調整，和品格力的指標重疊。對照裡的「學習如何學習」，落在學習力，不是六項之外的第七個素養。",
  },
  {
    slug: "citizenship",
    npdl: "公民素養",
    school: "實踐力；願景裡的人文關懷、國際視野",
    note: "實踐力寫了永續發展、國際參與和志工服務。公民素養把這些放進一個真實問題，並問行動對誰有益。",
  },
  {
    slug: "collaboration",
    npdl: "協作",
    school: "溝通力、實踐力",
    note: "學生圖像沒有單獨的協作力。備課時通常連著溝通協調，以及實踐力裡的組織規劃一起看。",
  },
  {
    slug: "communication",
    npdl: "溝通",
    school: "溝通力",
    note: "文字、口語、圖像和影像都在。NPDL 多問的是：這次的說法是不是為那個對象設計，而且產生了影響。",
  },
  {
    slug: "creativity",
    npdl: "創造力",
    school: "創造力",
    note: "兩邊都要學生發現問題、提出新做法。NPDL 會再追問這個點子有沒有被做成別人試得了的行動。",
  },
  {
    slug: "critical",
    npdl: "批判思考",
    school: "思辨力；願景裡的科學思維",
    note: "思辨力的媒體識讀、邏輯推理和批判思辨，和這項最接近。科學思維談的邏輯判斷，是同一條線的學校語言。",
  },
]

export type SchoolPhrase = {
  docxTitle: string
  note?: string
  zh: string[]
  en: string[]
}

export const schoolPhrases: Record<CompetencySlug, SchoolPhrase> = {
  character: {
    docxTitle: "Character（品格）",
    zh: [
      "對生命和「學習如何學習」採取積極主動的態度",
      "毅力、堅韌、不屈不撓和復原力（韌性）",
      "展現同理心、憐憫心和正直的品行",
    ],
    en: [
      "Proactive stance toward life and learning to learn",
      "Grit, tenacity, perseverance and resilience",
      "Empathy, compassion and integrity in action",
    ],
  },
  citizenship: {
    docxTitle: "Citizenship（公民素養）",
    zh: [
      "具備全球視野：透過同理心和憐憫心對待多元價值觀和世界觀，致力於人類公平和福祉",
      "對人類和環境的可持續發展（永續性）抱持真切的興趣",
      "解決現實世界中模糊不清和複雜的問題，以造福公民",
    ],
    en: [
      "A global perspective: commitment to human equity and well-being through empathy and compassion for diverse values and world views",
      "Genuine interest in human and environmental sustainability",
      "Solving ambiguous and complex problems in the real world to benefit citizens",
    ],
  },
  collaboration: {
    docxTitle: "Collaboration（合作）",
    note: "資源板上的中英對照把這一項寫成「合作」。花中課程分享模板的欄位是「協作」。這個網站跟模板走。",
    zh: [
      "作為團隊相互依賴地工作",
      "人際交往和團隊相關技能",
      "社交、情感和跨文化技能",
      "管理團隊動態和挑戰",
    ],
    en: [
      "Working interdependently as a team; interpersonal and team-related skills",
      "Social, emotional, and intercultural skills",
      "Managing team dynamics and challenges",
    ],
  },
  communication: {
    docxTitle: "Communication（溝通）",
    zh: [
      "針對受眾和影響力而設計的溝通",
      "訊息傳達一個宗旨並產生影響",
      "反思以進一步發展和改進溝通",
      "表達聲音和身份，以促進人類進步",
    ],
    en: [
      "Communication designed for audience and impact",
      "Message advocates a purpose and makes an impact",
      "Reflection to further develop and improve communication",
      "Voice and identity expressed to advance humanity",
    ],
  },
  creativity: {
    docxTitle: "Creativity（創造力）",
    zh: [
      "經濟和社會企業家精神",
      "提出正確的探究問題",
      "追求和表達新穎的想法和解決方案",
      "將想法付諸實踐的領導力",
    ],
    en: [
      "Economic and social entrepreneurialism",
      "Asking the right inquiry questions",
      "Pursuing and expressing novel ideas and solutions",
      "Leadership to turn ideas into action",
    ],
  },
  critical: {
    docxTitle: "Critical Thinking（批判性思維）",
    note: "中英對照寫「批判性思維」。課程分享模板和這個網站用「批判思考」。",
    zh: [
      "評估資訊和論點",
      "建立連結和識別模式",
      "有意義的知識建構",
      "在現實世界中對想法進行實驗、反思和採取行動",
    ],
    en: [
      "Evaluating information and arguments",
      "Making connections and identifying patterns",
      "Meaningful knowledge construction",
      "Experimenting, reflecting and taking action on ideas in the real world",
    ],
  },
}

export type SurveyForm = {
  slug: CompetencySlug | "agency"
  zh: string
  en: string
  zhCopy: string
  enCopy: string
}

export const surveyForms: SurveyForm[] = [
  {
    slug: "agency",
    zh: "學習主體性",
    en: "Agency",
    zhCopy: "https://docs.google.com/forms/d/1wYvJYiEsS3x7U4IRZ9LQaePH_yWULZLQbSPSSfA5eQM/copy",
    enCopy: "https://docs.google.com/forms/d/1w1snMXUrWoh8J68YNlCtf3_KklphO1Z9wMdpzsWI11M/copy",
  },
  {
    slug: "character",
    zh: "品格",
    en: "Character",
    zhCopy: "https://docs.google.com/forms/d/14rJvNMma3SuDGm-D1bZHx8-hCwVlXjEA9NYvDoxFDJM/copy",
    enCopy: "https://docs.google.com/forms/d/1FsdB8ta1aLcyu3UH7nYXzBAnROH731UWjQ_XW19A96M/copy",
  },
  {
    slug: "citizenship",
    zh: "公民素養",
    en: "Citizenship",
    zhCopy: "https://docs.google.com/forms/d/1q5IJyVkQjRAQALDWRFEfRbg1ULvlgsFYxos6Qmo6JY4/copy",
    enCopy: "https://docs.google.com/forms/d/1Z0gsumZxrqvfEyMl8dfVnVSlkZq9WBaBRnGjzjdZFQ0/copy",
  },
  {
    slug: "collaboration",
    zh: "協作",
    en: "Collaboration",
    zhCopy: "https://docs.google.com/forms/d/1fXZI1bkvgvL9SOqV9UrFq1e1O0-rj2YSYLrB1tO--qg/copy",
    enCopy: "https://docs.google.com/forms/d/1GUz5I2nCEyMEHIAoQMwJMsZXQneysdWAvfPBHcfCZDQ/copy",
  },
  {
    slug: "communication",
    zh: "溝通",
    en: "Communication",
    zhCopy: "https://docs.google.com/forms/d/1VNgzrED-T4_ZPN9Q0kIa1Fcg7vJlAsGG3MSTk2jOVNY/copy",
    enCopy: "https://docs.google.com/forms/d/1bKYTQrhGvXb05I9fQ0-MrK1Dae_Kv8wFsIcd-EQ8VYw/copy",
  },
  {
    slug: "creativity",
    zh: "創造力",
    en: "Creativity",
    zhCopy: "https://docs.google.com/forms/d/1nDbccaXi2A7mT1ejE9IcwisVkiw1sFU-OoDyndf2ZNI/copy",
    enCopy: "https://docs.google.com/forms/d/169vXUTJNmUwmtTuxW-xhjdpWViihV7_gAqD2yQJicag/copy",
  },
  {
    slug: "critical",
    zh: "批判思考",
    en: "Critical Thinking",
    zhCopy: "https://docs.google.com/forms/d/12hKBcRT48RHNEmdTr8-QjNl9FotTj-y01NvHde6CtlY/copy",
    enCopy: "https://docs.google.com/forms/d/1vQ6_650FouoQJA921l8UH32UXsiKxP5vQM27XuQ5VJs/copy",
  },
]

export function surveyFor(slug: CompetencySlug) {
  return surveyForms.find((item) => item.slug === slug)
}

export const templateSteps = [
  {
    title: "評估",
    text: "寫下對學生的了解和這次的目標，並從六項素養裡挑一到兩項，對上校本學生圖像。",
  },
  {
    title: "設計",
    text: "用學習夥伴、學習環境、教學實踐和數位利用，把活動寫成一堂課。",
  },
  {
    title: "實施",
    text: "留下學生怎麼走到那個目標，以及你拿什麼當學習證據。",
  },
  {
    title: "檢核與反思",
    text: "看前後的變化和夥伴的回饋，決定下一次只改哪一件事。",
  },
] as const

export type TemplateGroup = "format" | "tool" | "official"

export type TemplateItem = {
  title: string
  format: string
  summary: string
  wishId: string
  group: TemplateGroup
}

export const templateGroups: { id: TemplateGroup; title: string; lede: string }[] = [
  {
    id: "format",
    title: "可以直接拿去填的格式",
    lede: "花中分享課程時用的 Word 和簡報。檔案在資源板，按下去之後在該則貼文下載。",
  },
  {
    id: "tool",
    title: "共備時會一起看的工具",
    lede: "對照、圖和提問單。用來對焦，不是另一套評分表。",
  },
  {
    id: "official",
    title: "只給入口、不轉載的文件",
    lede: "手冊和學生版學習進程留在原檔。這個網站不把全文搬進來。",
  },
]

export const templates: TemplateItem[] = [
  {
    title: "NPDL 課程分享模板",
    format: "Word",
    summary: "學校與課程基本資料、六項素養勾選、四個設計要素，以及實施和檢核。填的時候從六項裡選一到兩項，並寫上對應的校本學生能力圖像。",
    wishId: "lDK1ZRLA9mVMaJ9z",
    group: "format",
  },
  {
    title: "NPDL 教案簡報模板",
    format: "PowerPoint",
    summary: "對外分享或共備報告時用的簡報格式，和 Word 模板是一套。",
    wishId: "lkROZPp9X3pkZjMg",
    group: "format",
  },
  {
    title: "Teachmeet 分享簡報格式",
    format: "PowerPoint",
    summary: "檔名為 NPDL Taiwan Teachmeet Template，作者欄是 Nancy Huang（黃燕靜）。這是分享用的簡報格式，不是某一門課的成果。",
    wishId: "0BA3ZpoPxV3XQnPb",
    group: "format",
  },
  {
    title: "6C 中英對照",
    format: "Word",
    summary: "花中資源板上的六項說法。素養頁的「花中使用的說法」就是依這份整理，沒有改寫成另一套定義。",
    wishId: "wKmOZ57KoglXazMA",
    group: "tool",
  },
  {
    title: "學習設計四要素圖",
    format: "PDF",
    summary: "學習夥伴、學習環境、教學實踐、數位利用的圖。四個要素頁有備課用的說明。",
    wishId: "x5A7aroR2vGPQwr6",
    group: "tool",
  },
  {
    title: "學習設計訓練工具",
    format: "PDF",
    summary: "協作探究裡，評估和設計階段可以拿來問彼此的問題。",
    wishId: "PVKBQOp027mBZj5x",
    group: "tool",
  },
  {
    title: "Y 型圖",
    format: "PDF",
    summary: "共備時用來把學生作品和素養證據攤開的圖。",
    wishId: "Ae2Ravo7VYeKQnz4",
    group: "tool",
  },
  {
    title: "教師簡易對話指南",
    format: "PDF",
    summary: "看學生作品時，用來把對話拉回證據的簡短指南。",
    wishId: "BJkrQA91vKr0QEge",
    group: "tool",
  },
  {
    title: "教師自我評估工具",
    format: "PDF",
    summary: "教師看自己在學習夥伴和學習環境上的把握。這是資源板上的工具，不是本站另寫的量表。",
    wishId: "lkDVaKVDArepWPp9",
    group: "tool",
  },
  {
    title: "佩英老師的課程教準實踐手冊",
    format: "PDF",
    summary: "陳佩英老師整理的實踐手冊。全文留在資源板。",
    wishId: "zV61Q6xEjzmjWO98",
    group: "official",
  },
  {
    title: "學生版學習進程",
    format: "PDF",
    summary: "這份接近官方的 Deep Learning Progressions。正式等級以全球夥伴的工具為準，本站不轉載。",
    wishId: "kxodWG25X3JbZgP7",
    group: "official",
  },
]

export type ArchiveYear = "2026" | "2023" | "2022" | "plans"

export const archiveYears: { id: ArchiveYear | "all"; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "2026", label: "2026" },
  { id: "2023", label: "2023" },
  { id: "2022", label: "2022" },
  { id: "plans", label: "計畫結合" },
]

export type ArchiveLink = {
  label: string
  format: string
  wishId: string
}

export type ArchiveItem = {
  id: string
  title: string
  year: ArchiveYear
  yearLabel: string
  people: string
  kind: string
  summary: string
  links: ArchiveLink[]
}

export const archiveItems: ArchiveItem[] = [
  {
    id: "sdgs-2026",
    title: "SDGs 行動不 NG",
    year: "2026",
    yearLabel: "2026",
    people: "黃怡婷、麥芃芃",
    kind: "簡報",
    summary: "資源板的計畫對照把這門課接在國文與英文，標題就是 SDGs 行動不 NG。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "e9YpQNpzlyO1WxjM" }],
  },
  {
    id: "i-see-you",
    title: "I see you",
    year: "2026",
    yearLabel: "2026",
    people: "謝璦羽",
    kind: "簡報",
    summary: "同一則計畫對照把謝璦羽的課寫成全英語的 SEL。簡報標題是 I see you。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "dMA1W85x1jkAa4OV" }],
  },
  {
    id: "international-2026",
    title: "國際教育",
    year: "2026",
    yearLabel: "2026",
    people: "黃燕靜",
    kind: "簡報",
    summary: "計畫對照寫的是全英語授課加上國際教育，做法包含跨國視訊。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "zV61Q6xk14EEWO98" }],
  },
  {
    id: "running-2026",
    title: "不只會考試，更要會跑步",
    year: "2026",
    yearLabel: "2026",
    people: "鄭雅方、邱培杰",
    kind: "簡報",
    summary: "副標是健康體位對健康促進成效之研究。計畫對照把邱培杰的線接在學務的健康促進。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "Xb8YaLpwlylBayn1" }],
  },
  {
    id: "hualien-tech",
    title: "花蓮學（新興科技）",
    year: "2026",
    yearLabel: "2026",
    people: "黃楨喻、林佩琪",
    kind: "簡報",
    summary: "資訊與家政合開。計畫對照寫的主題是智慧辨識。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "lDK1ZRLodkGYaJ9z" }],
  },
  {
    id: "first-aid",
    title: "大傷分類 Go",
    year: "2026",
    yearLabel: "2026",
    people: "黃雅蕾",
    kind: "簡報",
    summary: "簡報標題是基礎急救課程，主軸放在協作。計畫對照把這條線接在健護與高優的急救證照。",
    links: [{ label: "開啟簡報", format: "PowerPoint", wishId: "wKmOZ57EvB2VazMA" }],
  },
  {
    id: "ocean",
    title: "搶救海洋大作戰",
    year: "2026",
    yearLabel: "2026",
    people: "黃雅蕾",
    kind: "PDF",
    summary: "首頁署名國立花蓮高級中學、黃雅蕾。內頁以資源板上的 PDF 為準。",
    links: [{ label: "開啟 PDF", format: "PDF", wishId: "R7dXadN4bkoeZ6bl" }],
  },
  {
    id: "hualien-study",
    title: "花蓮學",
    year: "2023",
    yearLabel: "2023 整理",
    people: "黃燕靜、麥芃芃、楊鵬耀",
    kind: "課程分享",
    summary: "高一校訂必修。檔案記載課程自 2020 年起，含藝術、音樂與英詩。這份是課程分享模板填好的 Word。",
    links: [{ label: "開啟 Word", format: "Word", wishId: "wKmOZ57bdkx0azMA" }],
  },
  {
    id: "travel-english",
    title: "旅遊英文",
    year: "2022",
    yearLabel: "2022／110 學年第二學期",
    people: "謝璦羽、麥芃芃",
    kind: "多元選修",
    summary: "高三、兩學分，主軸放在溝通。學生用英語做簡報、訪青年旅社、一起攀岩，也到太魯閣族支亞干部落踏查，依對象調整說法。",
    links: [
      { label: "課程分享 Word", format: "Word", wishId: "yEPVZko59J3pZb0Y" },
      { label: "110 學年第二學期簡報", format: "PowerPoint", wishId: "R7dXadN4bnPjZ6bl" },
    ],
  },
  {
    id: "plans",
    title: "花中 NPDL 與各樣計畫怎麼接",
    year: "plans",
    yearLabel: "資源板貼文",
    people: "花蓮高中 NPDL 資源板",
    kind: "共備筆記",
    summary: "邱培杰接健康促進；黃雅蕾接急救證照；謝璦羽接全英語 SEL；黃燕靜接國際教育與跨國視訊；黃楨喻、林佩琪接花蓮學新興科技；黃怡婷、麥芃芃接 SDGs 行動不 NG。",
    links: [{ label: "看原貼文", format: "Padlet", wishId: "PVKBQOp9BEo5Zj5x" }],
  },
]

export const archiveYearOrder: ArchiveYear[] = ["2026", "2023", "2022", "plans"]

export function archiveYearHeading(year: ArchiveYear) {
  if (year === "2026") return "2026"
  if (year === "2023") return "2023"
  if (year === "2022") return "2022"
  return "和校內計畫怎麼接"
}
