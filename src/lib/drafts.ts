import { getCompetency, isCompetencySlug, type CompetencySlug } from "@/lib/competencies"
import { getExemplar } from "@/lib/exemplars"

export const gradeBands = [
  { id: "es-low", label: "國小低年級", hint: "一到二年級" },
  { id: "es-high", label: "國小中高年級", hint: "三到六年級" },
  { id: "ms", label: "國中", hint: "七到九年級" },
  { id: "hs", label: "高中", hint: "十到十二年級" },
] as const

export type GradeBand = (typeof gradeBands)[number]["id"]

export type DesignDraft = {
  id: string
  updatedAt: string
  title: string
  grade: GradeBand | ""
  subject: string
  issue: string
  learners: string
  competencies: CompetencySlug[]
  partnerships: string
  environment: string
  pedagogy: string
  digital: string
  evidence: string
  revision: string
}

export const draftStorageKey = "shenxue-designs-v1"

export function createDraft(partial: Partial<DesignDraft> = {}): DesignDraft {
  return {
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString(),
    title: "",
    grade: "",
    subject: "",
    issue: "",
    learners: "",
    competencies: [],
    partnerships: "",
    environment: "",
    pedagogy: "",
    digital: "",
    evidence: "",
    revision: "",
    ...partial,
  }
}

export function draftFromExemplar(slug: string) {
  const exemplar = getExemplar(slug)
  if (!exemplar) return null
  return createDraft({
    title: exemplar.title,
    grade: "hs",
    subject: exemplar.subjects,
    issue: exemplar.summary,
    learners: exemplar.people,
    competencies: exemplar.current.map((mark) => mark.slug),
    evidence: exemplar.current.map((mark) => mark.note).join("\n"),
    revision: `下一步可以設計「${getCompetency(exemplar.next.slug)?.zh ?? ""}」：${exemplar.next.note}`,
  })
}

function isGrade(value: unknown): value is GradeBand | "" {
  return value === "" || gradeBands.some((grade) => grade.id === value)
}

export function isDesignDraft(value: unknown): value is DesignDraft {
  if (!value || typeof value !== "object") return false
  const draft = value as Partial<DesignDraft>
  if (typeof draft.id !== "string" || typeof draft.title !== "string") return false
  if (!isGrade(draft.grade)) return false
  if (!Array.isArray(draft.competencies) || !draft.competencies.every((item) => typeof item === "string" && isCompetencySlug(item))) {
    return false
  }
  const strings: unknown[] = [
    draft.subject,
    draft.issue,
    draft.learners,
    draft.partnerships,
    draft.environment,
    draft.pedagogy,
    draft.digital,
    draft.evidence,
    draft.revision,
    draft.updatedAt,
  ]
  return strings.every((item) => typeof item === "string")
}

export function loadDrafts(): { drafts: DesignDraft[]; error: string | null } {
  if (typeof window === "undefined") return { drafts: [], error: null }
  try {
    const raw = window.localStorage.getItem(draftStorageKey)
    if (!raw) return { drafts: [], error: null }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return { drafts: [], error: "這台瀏覽器裡的設計資料讀不起來，已先略過。" }
    }
    const drafts = parsed.filter(isDesignDraft).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    const error =
      drafts.length !== parsed.length ? "有幾筆舊資料格式不合，已略過。" : null
    return { drafts, error }
  } catch {
    return {
      drafts: [],
      error: "讀不到這台瀏覽器的儲存空間。這次仍可設計，但重新整理後不會留下。",
    }
  }
}

export function saveDrafts(drafts: DesignDraft[]) {
  try {
    window.localStorage.setItem(draftStorageKey, JSON.stringify(drafts))
    return null
  } catch {
    return "無法寫入這台瀏覽器。設計還在畫面上，但重新整理後可能消失。"
  }
}

export function gradeLabel(id: GradeBand | "") {
  return gradeBands.find((grade) => grade.id === id)?.label ?? "未選年段"
}

export type ScoreCheck = {
  id: string
  label: string
  ok: boolean
  hint: string
  weight: number
}

export function scoreDraft(draft: DesignDraft) {
  const checks: ScoreCheck[] = [
    {
      id: "title",
      label: "任務名稱",
      ok: draft.title.trim().length >= 2,
      hint: "取一個學生聽得懂的名字。",
      weight: 8,
    },
    {
      id: "grade",
      label: "年段",
      ok: draft.grade !== "",
      hint: "同一個問題，在不同年段會差很多。",
      weight: 6,
    },
    {
      id: "subject",
      label: "學科",
      ok: draft.subject.trim().length >= 1,
      hint: "寫出這次真正用到的學科。",
      weight: 6,
    },
    {
      id: "issue",
      label: "真實問題",
      ok: draft.issue.trim().length >= 12,
      hint: "寫成一個校外的人也會在意的問題。",
      weight: 14,
    },
    {
      id: "learners",
      label: "學習者現況",
      ok: draft.learners.trim().length >= 12,
      hint: "寫這班現在會什麼、還不會什麼。",
      weight: 12,
    },
    {
      id: "competencies",
      label: "聚焦一到兩項素養",
      ok: draft.competencies.length >= 1 && draft.competencies.length <= 2,
      hint:
        draft.competencies.length > 2
          ? "先收斂到一或兩項當主軸。"
          : "選這次真正要練的素養。",
      weight: 12,
    },
    {
      id: "partnerships",
      label: "學習夥伴",
      ok: draft.partnerships.trim().length >= 8,
      hint: "誰在中途就參與，而不只是來看成果？",
      weight: 8,
    },
    {
      id: "environment",
      label: "學習環境",
      ok: draft.environment.trim().length >= 8,
      hint: "空間、時間和氣氛要怎麼配合？",
      weight: 8,
    },
    {
      id: "pedagogy",
      label: "教學實踐",
      ok: draft.pedagogy.trim().length >= 8,
      hint: "哪一個教學動作是為了那項素養？",
      weight: 8,
    },
    {
      id: "digital",
      label: "善用數位",
      ok: draft.digital.trim().length >= 8,
      hint: "拿掉這個工具，學習會少掉什麼？",
      weight: 8,
    },
    {
      id: "evidence",
      label: "學習證據",
      ok: draft.evidence.trim().length >= 12,
      hint: "寫出看得到的行為，而不是「表現良好」。",
      weight: 10,
    },
  ]
  const total = checks.reduce((sum, check) => sum + check.weight, 0)
  const got = checks.reduce((sum, check) => sum + (check.ok ? check.weight : 0), 0)
  return { percent: Math.round((got / total) * 100), checks }
}

export function toBrief(draft: DesignDraft) {
  const names = draft.competencies
    .map((slug) => getCompetency(slug)?.zh)
    .filter(Boolean)
    .join("、")
  const lines = [
    `深學工坊｜學習設計`,
    ``,
    draft.title.trim() || "（尚未命名）",
    `${gradeLabel(draft.grade)}　${draft.subject.trim() || "未填學科"}`,
    `主軸素養：${names || "未選"}`,
    ``,
    `真實問題`,
    draft.issue.trim() || "（未填）",
    ``,
    `學習者現況`,
    draft.learners.trim() || "（未填）",
    ``,
    `學習夥伴`,
    draft.partnerships.trim() || "（未填）",
    ``,
    `學習環境`,
    draft.environment.trim() || "（未填）",
    ``,
    `教學實踐`,
    draft.pedagogy.trim() || "（未填）",
    ``,
    `善用數位`,
    draft.digital.trim() || "（未填）",
    ``,
    `學習證據`,
    draft.evidence.trim() || "（未填）",
    ``,
    `下一次要改`,
    draft.revision.trim() || "（未填）",
    ``,
    `此摘要由深學工坊產生，供備課討論使用。`,
  ]
  return lines.join("\n")
}

export function draftFileName(draft: DesignDraft) {
  const base = draft.title.trim() || "未命名設計"
  return `${base.replace(/[\\/:*?"<>|]/g, "").slice(0, 40)}.txt`
}
