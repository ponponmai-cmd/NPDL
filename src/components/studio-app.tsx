"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Circle } from "lucide-react"
import { competencies } from "@/lib/competencies"
import {
  createDraft,
  draftFileName,
  draftFromExemplar,
  gradeBands,
  gradeLabel,
  loadDrafts,
  saveDrafts,
  scoreDraft,
  toBrief,
  type DesignDraft,
} from "@/lib/drafts"
import { getExemplar } from "@/lib/exemplars"
import { CompetencyMark } from "@/components/competency-mark"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type StudioState = {
  drafts: DesignDraft[]
  draft: DesignDraft | null
  savedJson: string
  storageNote: string | null
  queryNote: string | null
}

function bootStudio(from: string | null): StudioState {
  const loaded = loadDrafts()
  const stored = loaded.drafts[0] ?? null
  if (from) {
    const seeded = draftFromExemplar(from)
    if (seeded) {
      return {
        drafts: loaded.drafts,
        draft: seeded,
        savedJson: JSON.stringify(seeded),
        storageNote: loaded.error,
        queryNote: `已帶入示例「${getExemplar(from)?.title ?? ""}」。這份還沒存，改完可以存到這台瀏覽器。`,
      }
    }
    return {
      drafts: loaded.drafts,
      draft: stored,
      savedJson: stored ? JSON.stringify(stored) : "",
      storageNote: loaded.error,
      queryNote: "網址上的示例找不到，改從空白或已存的設計開始。",
    }
  }
  return {
    drafts: loaded.drafts,
    draft: stored,
    savedJson: stored ? JSON.stringify(stored) : "",
    storageNote: loaded.error,
    queryNote: null,
  }
}

export function StudioApp() {
  const searchParams = useSearchParams()
  const [studio, setStudio] = useState<StudioState>(() => bootStudio(searchParams.get("from")))
  const [titleError, setTitleError] = useState<string | null>(null)
  const [savedMessage, setSavedMessage] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle")
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const { drafts, draft, savedJson, storageNote, queryNote } = studio

  const dirty = draft ? JSON.stringify(draft) !== savedJson : false

  useEffect(() => {
    if (!dirty) return
    const onLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }
    window.addEventListener("beforeunload", onLeave)
    return () => window.removeEventListener("beforeunload", onLeave)
  }, [dirty])

  function guardDirty() {
    if (!dirty) return true
    return window.confirm("這個設計還沒存。要放棄剛才的修改嗎？")
  }

  function openDraft(next: DesignDraft) {
    if (draft?.id === next.id) return
    if (!guardDirty()) return
    setStudio((current) => ({
      ...current,
      draft: next,
      savedJson: JSON.stringify(next),
      queryNote: null,
    }))
    setTitleError(null)
    setSavedMessage(null)
    setCopyState("idle")
  }

  function startBlank() {
    if (!guardDirty()) return
    const next = createDraft()
    setStudio((current) => ({
      ...current,
      draft: next,
      savedJson: JSON.stringify(next),
      queryNote: null,
    }))
    setTitleError(null)
    setSavedMessage(null)
  }

  function startSample() {
    if (!guardDirty()) return
    const next = draftFromExemplar("harbor-plastic")
    if (!next) return
    setStudio((current) => ({
      ...current,
      draft: next,
      savedJson: JSON.stringify(next),
      queryNote: "已載入示例。存檔之後才會留在左側清單。",
    }))
    setTitleError(null)
    setSavedMessage(null)
  }

  function update(partial: Partial<DesignDraft>) {
    setStudio((current) => ({
      ...current,
      draft: current.draft ? { ...current.draft, ...partial } : current.draft,
    }))
    setSavedMessage(null)
    if (partial.title !== undefined) setTitleError(null)
  }

  function toggleCompetency(slug: DesignDraft["competencies"][number]) {
    if (!draft) return
    const exists = draft.competencies.includes(slug)
    update({
      competencies: exists ? draft.competencies.filter((item) => item !== slug) : [...draft.competencies, slug],
    })
  }

  function persistCurrent() {
    if (!draft) return
    if (draft.title.trim().length < 2) {
      setTitleError("先寫一個至少兩個字的任務名稱，之後才找得到它。")
      document.getElementById("draft-title")?.focus()
      return
    }
    const nextDraft: DesignDraft = {
      ...draft,
      title: draft.title.trim(),
      updatedAt: new Date().toISOString(),
    }
    const exists = drafts.some((item) => item.id === nextDraft.id)
    const nextList = (exists ? drafts.map((item) => (item.id === nextDraft.id ? nextDraft : item)) : [nextDraft, ...drafts]).sort(
      (a, b) => (a.updatedAt < b.updatedAt ? 1 : -1),
    )
    const error = saveDrafts(nextList)
    setStudio((current) => ({
      ...current,
      drafts: nextList,
      draft: nextDraft,
      savedJson: JSON.stringify(nextDraft),
      storageNote: error,
    }))
    setSavedMessage(error ? "畫面上已更新，但沒有寫進瀏覽器。" : "已存在這台瀏覽器，只有這台裝置看得到。")
    setTitleError(null)
  }

  function removeDraft(id: string) {
    const nextList = drafts.filter((item) => item.id !== id)
    const error = saveDrafts(nextList)
    setPendingDelete(null)
    setStudio((current) => {
      const removingCurrent = current.draft?.id === id
      const fallback = nextList[0] ?? null
      return {
        ...current,
        drafts: nextList,
        storageNote: error,
        draft: removingCurrent ? fallback : current.draft,
        savedJson: removingCurrent ? (fallback ? JSON.stringify(fallback) : "") : current.savedJson,
      }
    })
  }

  async function copyBrief() {
    if (!draft) return
    try {
      await navigator.clipboard.writeText(toBrief(draft))
      setCopyState("copied")
    } catch {
      setCopyState("failed")
    }
  }

  function downloadBrief() {
    if (!draft) return
    const blob = new Blob([toBrief(draft)], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = draftFileName(draft)
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (!draft) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-medium text-primary">設計工坊</p>
        <h1 className="mt-2 font-heading text-4xl leading-tight md:text-5xl">這台瀏覽器還沒有設計</h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          設計只存在這台裝置，不會上傳。你可以從空白開始，或先載入一堂海岸垃圾的示例，看一份填完的稿長什麼樣子。
        </p>
        {storageNote ? (
          <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm leading-6 ring-1 ring-foreground/10" role="alert">
            {storageNote}
          </p>
        ) : null}
        {queryNote ? <p className="mt-4 text-sm leading-6 text-muted-foreground">{queryNote}</p> : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="h-11 px-4" onClick={startBlank}>
            從空白開始
          </Button>
          <Button type="button" variant="outline" className="h-11 px-4" onClick={startSample}>
            載入港邊示例
          </Button>
        </div>
      </div>
    )
  }

  return (
    <StudioEditor
      draft={draft}
      drafts={drafts}
      dirty={dirty}
      storageNote={storageNote}
      queryNote={queryNote}
      titleError={titleError}
      savedMessage={savedMessage}
      copyState={copyState}
      pendingDelete={pendingDelete}
      onOpen={openDraft}
      onBlank={startBlank}
      onSample={startSample}
      onUpdate={update}
      onToggleCompetency={toggleCompetency}
      onSave={persistCurrent}
      onCopy={copyBrief}
      onDownload={downloadBrief}
      onAskDelete={setPendingDelete}
      onRemove={removeDraft}
    />
  )
}

function StudioEditor({
  draft,
  drafts,
  dirty,
  storageNote,
  queryNote,
  titleError,
  savedMessage,
  copyState,
  pendingDelete,
  onOpen,
  onBlank,
  onSample,
  onUpdate,
  onToggleCompetency,
  onSave,
  onCopy,
  onDownload,
  onAskDelete,
  onRemove,
}: {
  draft: DesignDraft
  drafts: DesignDraft[]
  dirty: boolean
  storageNote: string | null
  queryNote: string | null
  titleError: string | null
  savedMessage: string | null
  copyState: "idle" | "copied" | "failed"
  pendingDelete: string | null
  onOpen: (draft: DesignDraft) => void
  onBlank: () => void
  onSample: () => void
  onUpdate: (partial: Partial<DesignDraft>) => void
  onToggleCompetency: (slug: DesignDraft["competencies"][number]) => void
  onSave: () => void
  onCopy: () => void
  onDownload: () => void
  onAskDelete: (id: string | null) => void
  onRemove: (id: string) => void
}) {
  const score = useMemo(() => scoreDraft(draft), [draft])
  const brief = useMemo(() => toBrief(draft), [draft])

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl">我的設計</h1>
          <span className="text-xs text-muted-foreground">{drafts.length} 筆</span>
        </div>
        <div className="flex gap-2">
          <Button type="button" size="sm" onClick={onBlank}>
            新增
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={onSample}>
            載入示例
          </Button>
        </div>
        {drafts.length === 0 ? (
          <p className="rounded-xl bg-white px-3 py-3 text-sm leading-6 text-muted-foreground ring-1 ring-foreground/10">
            還沒有存檔。寫完按「存到這台瀏覽器」，才會出現在這裡。
          </p>
        ) : (
          <ul className="space-y-2">
            {drafts.map((item) => {
              const selected = item.id === draft.id
              return (
                <li key={item.id} className="rounded-xl bg-white ring-1 ring-foreground/10">
                  <button
                    type="button"
                    onClick={() => onOpen(item)}
                    className={cn("w-full px-3 py-2 text-left", selected && "bg-[#f3ecdf]")}
                    aria-current={selected ? "true" : undefined}
                  >
                    <span className="block truncate font-medium">{item.title || "未命名"}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {gradeLabel(item.grade)} · {new Date(item.updatedAt).toLocaleString("zh-TW", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </aside>

      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault()
          onSave()
        }}
      >
        <div>
          <p className="text-sm font-medium text-primary">設計工坊</p>
          <p className="mt-1 max-w-2xl leading-7 text-muted-foreground">
            一次只盯一到兩項素養，把四個要素寫成這班做得到的事。欄位可以先空著，但沒有任務名稱就無法存檔。
          </p>
        </div>
        {storageNote ? (
          <p className="rounded-lg bg-white px-3 py-2 text-sm leading-6 ring-1 ring-foreground/10" role="alert">
            {storageNote}
          </p>
        ) : null}
        {queryNote ? <p className="text-sm leading-6 text-muted-foreground">{queryNote}</p> : null}

        <section className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <div>
            <Label htmlFor="draft-title">任務名稱</Label>
            <Input
              id="draft-title"
              value={draft.title}
              onChange={(event) => onUpdate({ title: event.target.value })}
              placeholder="例如：港邊的塑膠瓶要去哪裡"
              className="mt-2 h-11"
              aria-invalid={titleError ? true : undefined}
              aria-describedby={titleError ? "draft-title-error" : undefined}
            />
            {titleError ? (
              <p id="draft-title-error" className="mt-2 text-sm text-destructive" role="alert">
                {titleError}
              </p>
            ) : null}
          </div>
          <fieldset>
            <legend className="text-sm font-medium">年段</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {gradeBands.map((grade) => {
                const selected = draft.grade === grade.id
                return (
                  <button
                    key={grade.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onUpdate({ grade: grade.id })}
                    className={cn(
                      "rounded-lg px-3 py-2 text-left ring-1 ring-foreground/10",
                      selected ? "bg-primary text-primary-foreground" : "hover:bg-[#f6f1e7]",
                    )}
                  >
                    <span className="block text-sm font-medium">{grade.label}</span>
                    <span className={cn("block text-xs", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {grade.hint}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
          <div>
            <Label htmlFor="draft-subject">學科</Label>
            <Input
              id="draft-subject"
              value={draft.subject}
              onChange={(event) => onUpdate({ subject: event.target.value })}
              placeholder="例如：地理、公民"
              className="mt-2 h-10"
            />
          </div>
          <Field
            id="draft-issue"
            label="真實問題"
            hint="寫成一個校外的人也在意的問題，而不是「完成第幾課」。"
            value={draft.issue}
            onChange={(issue) => onUpdate({ issue })}
            placeholder="這一帶的塑膠瓶從哪裡來？區公所接下來一個月可以做哪一件小而具體的事？"
          />
          <Field
            id="draft-learners"
            label="學習者現況"
            hint="這班現在會什麼、卡在哪。不要寫成你希望他們成為的樣子。"
            value={draft.learners}
            onChange={(learners) => onUpdate({ learners })}
            placeholder="高一。多數人會說做好回收，但分不清清潔隊、攤販和漁船各自的說法。"
          />
        </section>

        <section className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">這次主軸</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">選一到兩項。其他素養可以出現，但不要每項都當目標。</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {competencies.map((item) => {
              const selected = draft.competencies.includes(item.slug)
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggleCompetency(item.slug)}
                  className={cn(
                    "flex items-start gap-3 rounded-xl px-3 py-3 text-left ring-1 ring-foreground/10",
                    selected ? "bg-[#f6f1e7]" : "hover:bg-[#fbf8f2]",
                  )}
                >
                  <CompetencyMark slug={item.slug} />
                  <span>
                    <span className="block font-medium">
                      {item.zh}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">{item.en}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.question}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">四個要素</h2>
          <Field
            id="draft-partnerships"
            label="學習夥伴"
            hint="誰在任務中途就參與？學生、教師、家人、社區裡的誰？"
            value={draft.partnerships}
            onChange={(partnerships) => onUpdate({ partnerships })}
            placeholder="清潔隊與回收場在第三節受訪。區公所承辦人答應看十頁以內的簡報。"
          />
          <Field
            id="draft-environment"
            label="學習環境"
            hint="怎樣的空間與氣氛，讓未完成的想法可以被看見？"
            value={draft.environment}
            onChange={(environment) => onUpdate({ environment })}
            placeholder="未完成的地圖貼在走廊，其他班級可以加註他們看到的瓶子。"
          />
          <Field
            id="draft-pedagogy"
            label="教學實踐"
            hint="哪一個教學動作是為了那一兩項素養？"
            value={draft.pedagogy}
            onChange={(pedagogy) => onUpdate({ pedagogy })}
            placeholder="學生先寫假設，再把兩種互相矛盾的說法並排，不能平均成一句正確答案。"
          />
          <Field
            id="draft-digital"
            label="善用數位"
            hint="這個工具是在放大、加速，還是把人連起來？拿掉它會少掉什麼？"
            value={draft.digital}
            onChange={(digital) => onUpdate({ digital })}
            placeholder="共用地圖用來比較地點。簡報只服務區公所，頁數被限制。"
          />
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
          <h2 className="font-heading text-2xl">怎麼知道有往前</h2>
          <Field
            id="draft-evidence"
            label="學習證據"
            hint="寫看得到的行為。避免「參與熱絡」「態度良好」。"
            value={draft.evidence}
            onChange={(evidence) => onUpdate({ evidence })}
            placeholder="簡報能指出建議忽略了誰。小組能並排兩份矛盾說法，並寫出還缺的證據。"
          />
          <Field
            id="draft-revision"
            label="下一次要改"
            hint="探究的最後一步。只寫一個教學動作，不列入完成度。"
            value={draft.revision}
            onChange={(revision) => onUpdate({ revision })}
            placeholder="下次把淨灘收成二十分鐘，把時間留給說法為什麼不一樣。"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="h-11 px-4">
              存到這台瀏覽器
            </Button>
            <p className="text-sm text-muted-foreground" role="status">
              {dirty ? "有尚未儲存的修改。" : savedMessage || "目前沒有未儲存的修改。"}
            </p>
          </div>
        </section>
      </form>

      <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-foreground/10">
          <Progress value={score.percent}>
            <ProgressLabel>設計完成度</ProgressLabel>
            <ProgressValue>{() => `${score.percent}%`}</ProgressValue>
          </Progress>
          <ul className="mt-4 space-y-2">
            {score.checks.map((check) => (
              <li key={check.id} className="flex gap-2 text-sm leading-5">
                {check.ok ? (
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                ) : (
                  <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
                <span>
                  <span className={check.ok ? "text-foreground" : "text-muted-foreground"}>{check.label}</span>
                  {check.ok ? null : <span className="mt-0.5 block text-xs text-muted-foreground">{check.hint}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div id="design-brief" className="rounded-2xl bg-[#241c16] p-4 text-[#f6f1e7]">
          <p className="text-xs tracking-wide text-[#e7c9a4]">備課摘要</p>
          <pre className="mt-3 font-sans text-sm leading-6 whitespace-pre-wrap">{brief}</pre>
          <div className="mt-4 flex flex-wrap gap-2 print:hidden">
            <Button type="button" variant="secondary" onClick={onCopy}>
              {copyState === "copied" ? "已複製" : "複製摘要"}
            </Button>
            <Button type="button" variant="outline" className="border-white/20 bg-transparent text-[#f6f1e7] hover:bg-white/10" onClick={onDownload}>
              下載文字檔
            </Button>
            <Button type="button" variant="outline" className="border-white/20 bg-transparent text-[#f6f1e7] hover:bg-white/10" onClick={() => window.print()}>
              列印
            </Button>
          </div>
          {copyState === "failed" ? (
            <p className="mt-3 text-sm text-[#f0d2d0]" role="alert">
              無法寫入剪貼簿。請直接選取上方摘要。
            </p>
          ) : null}
        </div>
        {drafts.some((item) => item.id === draft.id) ? (
          <div className="print:hidden">
            {pendingDelete === draft.id ? (
              <div className="rounded-xl bg-white p-3 text-sm ring-1 ring-foreground/10">
                <p>刪掉「{draft.title || "未命名"}」？這台瀏覽器裡的版本會一起消失。</p>
                <div className="mt-2 flex gap-2">
                  <Button type="button" variant="destructive" size="sm" onClick={() => onRemove(draft.id)}>
                    確定刪除
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => onAskDelete(null)}>
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <Button type="button" variant="ghost" onClick={() => onAskDelete(draft.id)}>
                刪除這份設計
              </Button>
            )}
          </div>
        ) : (
          <p className="text-xs leading-5 text-muted-foreground print:hidden">這份還沒存進清單。刪除會在存檔後出現。</p>
        )}
      </aside>
    </div>
  )
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  hint: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-muted-foreground">
        {hint}
      </p>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-describedby={`${id}-hint`}
        className="mt-2 min-h-24 bg-white"
      />
    </div>
  )
}
