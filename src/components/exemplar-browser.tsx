"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { competencies, isCompetencySlug } from "@/lib/competencies"
import { exemplars } from "@/lib/exemplars"
import { gradeBands, gradeLabel } from "@/lib/drafts"
import { CompetencyChip } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ExemplarBrowser() {
  const [grade, setGrade] = useState<string>("all")
  const [competency, setCompetency] = useState<string>("all")

  const visible = useMemo(
    () =>
      exemplars.filter((item) => {
        const gradeOk = grade === "all" || item.grade === grade
        const competencyOk =
          competency === "all" || (isCompetencySlug(competency) && item.competencies.includes(competency))
        return gradeOk && competencyOk
      }),
    [grade, competency],
  )

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="依年段篩選">
          <FilterChip active={grade === "all"} onClick={() => setGrade("all")}>
            全部年段
          </FilterChip>
          {gradeBands.map((item) => (
            <FilterChip key={item.id} active={grade === item.id} onClick={() => setGrade(item.id)}>
              {item.label}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="依素養篩選">
          <FilterChip active={competency === "all"} onClick={() => setCompetency("all")}>
            全部素養
          </FilterChip>
          {competencies.map((item) => (
            <FilterChip key={item.slug} active={competency === item.slug} onClick={() => setCompetency(item.slug)}>
              {item.zh}
            </FilterChip>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white px-5 py-10 text-center ring-1 ring-foreground/10">
          <p className="font-heading text-2xl">這個組合還沒有示例</p>
          <p className="mx-auto mt-2 max-w-md leading-7 text-muted-foreground">
            試著拿掉年段或素養的其中一個條件。你也可以直接到設計工坊，用空白稿寫自己的任務。
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button
              type="button"
              className={buttonVariants({ variant: "outline" })}
              onClick={() => {
                setGrade("all")
                setCompetency("all")
              }}
            >
              清除篩選
            </button>
            <Link href="/studio" className={buttonVariants()}>
              從空白開始
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.slug}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
                <p className="text-sm text-muted-foreground">
                  {gradeLabel(item.grade)} · {item.subjects} · {item.sessions}
                </p>
                <h2 className="mt-2 font-heading text-2xl">
                  <Link href={`/exemplars/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 leading-7 text-muted-foreground">{item.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.competencies.map((slug) => (
                    <CompetencyChip key={slug} slug={slug} />
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/10",
        active ? "bg-primary text-primary-foreground" : "bg-white hover:bg-[#f3ecdf]",
      )}
    >
      {children}
    </button>
  )
}
