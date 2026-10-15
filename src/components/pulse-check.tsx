"use client"

import { useMemo, useState } from "react"
import { pulseGroups, pulseLevels, pulseNarrative, type PulseId, type PulseLevel } from "@/lib/pulse"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PulseCheck() {
  const [answers, setAnswers] = useState<Partial<Record<PulseId, PulseLevel>>>({})
  const total = pulseGroups.reduce((sum, group) => sum + group.items.length, 0)
  const answered = Object.keys(answers).length
  const result = useMemo(() => pulseNarrative(answers), [answers])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          已回答 {answered} / {total}。四個等級是這台裝置上的自我判斷，不會送出。
        </p>
        {answered > 0 ? (
          <Button type="button" variant="outline" onClick={() => setAnswers({})}>
            重新勾選
          </Button>
        ) : null}
      </div>
      {pulseGroups.map((group) => (
        <fieldset key={group.id} className="rounded-2xl bg-white p-5 ring-1 ring-foreground/10 md:p-6">
          <legend className="px-1 font-heading text-2xl">{group.title}</legend>
          <div className="mt-4 space-y-5">
            {group.items.map((item) => (
              <div key={item.id}>
                <p className="leading-7" id={`pulse-${item.id}`}>
                  {item.text}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4" role="radiogroup" aria-labelledby={`pulse-${item.id}`}>
                  {pulseLevels.map((level) => {
                    const selected = answers[item.id] === level.value
                    return (
                      <button
                        key={level.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAnswers((current) => ({ ...current, [item.id]: level.value }))}
                        className={cn(
                          "rounded-lg px-2 py-2 text-left ring-1 ring-foreground/10",
                          selected ? "bg-primary text-primary-foreground" : "bg-[#fbf8f2] hover:bg-[#f3ecdf]",
                        )}
                      >
                        <span className="block text-sm font-medium">{level.label}</span>
                        <span className={cn("block text-xs", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {level.hint}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
      {result ? (
        <aside className="rounded-2xl bg-primary px-5 py-6 text-primary-foreground md:px-7" aria-live="polite">
          <p className="text-sm text-primary-foreground/80">八題平均 {result.average.toFixed(1)} / 4</p>
          <h2 className="mt-1 font-heading text-3xl">{result.headline}</h2>
          <p className="mt-3 max-w-3xl leading-8">{result.detail}</p>
        </aside>
      ) : (
        <p className="rounded-xl bg-white px-4 py-3 text-sm leading-7 text-muted-foreground ring-1 ring-foreground/10">
          八題都選完之後，這裡會依最薄的那一組條件，給一個下一步。還沒選的題不會被當成零分。
        </p>
      )}
    </div>
  )
}
