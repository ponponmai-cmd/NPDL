"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { competencies, isCompetencySlug } from "@/lib/competencies"
import { exemplarYears, exemplars } from "@/lib/exemplars"
import { CompetencyChip } from "@/components/competency-mark"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ExemplarBrowser() {
  const [year, setYear] = useState<string>("all")
  const [competency, setCompetency] = useState<string>("all")

  const visible = useMemo(
    () =>
      exemplars.filter((item) => {
        const yearOk = year === "all" || item.year === year
        const competencyOk =
          competency === "all" ||
          (isCompetencySlug(competency) &&
            (item.current.some((mark) => mark.slug === competency) || item.next.slug === competency))
        return yearOk && competencyOk
      }),
    [year, competency],
  )

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="依學年篩選">
          {exemplarYears.map((item) => (
            <FilterChip key={item.id} active={year === item.id} onClick={() => setYear(item.id)}>
              {item.label}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="依全球素養篩選">
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
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        篩選會同時看「已經對上」和「下一步可以設計」。下一步是依照教案裡已經出現、但還沒被設成主軸的部分寫的備課建議。
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white px-5 py-10 text-center ring-1 ring-foreground/10">
          <p className="font-heading text-2xl">這個學年和素養的組合還沒有花中教案</p>
          <p className="mx-auto mt-2 max-w-md leading-7 text-muted-foreground">拿掉其中一個條件，或改看全部素養。</p>
          <button
            type="button"
            className={buttonVariants({ variant: "outline", className: "mt-5" })}
            onClick={() => {
              setYear("all")
              setCompetency("all")
            }}
          >
            清除篩選
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((item) => (
            <li key={item.slug}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
                <p className="text-sm text-muted-foreground">
                  {item.yearLabel} · {item.subjects}
                </p>
                <h2 className="mt-2 font-heading text-2xl">
                  <Link href={`/exemplars/${item.slug}`} className="hover:text-primary">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.people}</p>
                <p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p>
                <div className="mt-4">
                  <p className="text-xs font-medium tracking-wide text-primary">已經對上</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.current.map((mark) => (
                      <CompetencyChip key={mark.slug} slug={mark.slug} />
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-medium tracking-wide text-primary">下一步可以設計</p>
                  <div className="mt-2">
                    <CompetencyChip slug={item.next.slug} />
                  </div>
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
