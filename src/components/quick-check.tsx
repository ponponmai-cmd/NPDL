"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { competencies, isCompetencySlug, type CompetencySlug } from "@/lib/competencies"
import { schoolPhrases } from "@/lib/school"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const levels = [
  { value: 1, label: "很少像我" },
  { value: 2, label: "有時像我" },
  { value: 3, label: "常常像我" },
  { value: 4, label: "這就是我" },
] as const

function slugFromWindow(): CompetencySlug {
  const value = new URLSearchParams(window.location.search).get("c")
  return value && isCompetencySlug(value) ? value : "character"
}

export function QuickCheck() {
  const fromUrl = useSyncExternalStore(() => () => {}, slugFromWindow, () => "character" as const)
  const [picked, setPicked] = useState<CompetencySlug | null>(null)
  const slug = picked ?? fromUrl
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const phrase = schoolPhrases[slug]
  const item = competencies.find((competency) => competency.slug === slug)

  const summary = useMemo(() => {
    const scored = phrase.zh.map((line, index) => ({
      line,
      score: answers[`${slug}:${index}`],
    }))
    if (scored.some((entry) => entry.score === undefined)) return null
    const lowest = Math.min(...scored.map((entry) => entry.score as number))
    const lines = scored.filter((entry) => entry.score === lowest).map((entry) => entry.line)
    return { lowest, lines }
  }, [answers, phrase.zh, slug])

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="選擇素養">
        {competencies.map((competency) => {
          const selected = competency.slug === slug
          return (
            <button
              key={competency.slug}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setPicked(competency.slug)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/15",
                selected ? "bg-primary text-primary-foreground" : "bg-white hover:bg-[#f3ecdf]",
              )}
            >
              {competency.zh}
            </button>
          )
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-2xl">{item?.zh}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{phrase.docxTitle}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setAnswers((current) => {
                const next = { ...current }
                phrase.zh.forEach((_, index) => {
                  delete next[`${slug}:${index}`]
                })
                return next
              })
            }
          >
            清除這一項
          </Button>
        </div>
        {phrase.note ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{phrase.note}</p> : null}
        <div className="mt-5 space-y-5">
          {phrase.zh.map((line, index) => {
            const key = `${slug}:${index}`
            return (
              <div key={line}>
                <p className="leading-7" id={`check-${key}`}>
                  {line}
                </p>
                <div
                  className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4"
                  role="radiogroup"
                  aria-labelledby={`check-${key}`}
                >
                  {levels.map((level) => {
                    const selected = answers[key] === level.value
                    return (
                      <button
                        key={level.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAnswers((current) => ({ ...current, [key]: level.value }))}
                        className={cn(
                          "rounded-lg px-2 py-2 text-sm ring-1 ring-foreground/10",
                          selected ? "bg-primary text-primary-foreground" : "bg-[#fbf8f2] hover:bg-[#f3ecdf]",
                        )}
                      >
                        {level.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {summary ? (
        <aside className="mt-4 rounded-2xl bg-primary px-5 py-6 text-primary-foreground" aria-live="polite">
          <p className="text-sm text-primary-foreground/80">這一項都選完了</p>
          <h3 className="mt-1 font-heading text-2xl">相對比較不像的說法</h3>
          <ul className="mt-3 space-y-2 leading-7">
            {summary.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm leading-6 text-primary-foreground/80">
            可以拿去跟同學對一下。這不是成績，也不是墨爾本大學的問卷結果。
          </p>
        </aside>
      ) : (
        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm leading-7 text-muted-foreground ring-1 ring-foreground/10">
          這一項的句子都選完，下面會標出你勾得比較低的說法。還沒選的句子不會被當成零分。
        </p>
      )}
    </div>
  )
}
