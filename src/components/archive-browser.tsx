"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { OutLink } from "@/components/out-link"
import { Input } from "@/components/ui/input"
import {
  archiveItems,
  archiveYearHeading,
  archiveYearOrder,
  archiveYears,
  wishUrl,
  type ArchiveYear,
} from "@/lib/school"
import { cn } from "@/lib/utils"

function isYear(value: string | undefined): value is ArchiveYear {
  return value === "2026" || value === "2023" || value === "2022" || value === "plans"
}

function yearFromWindow(): ArchiveYear | "all" {
  const value = new URLSearchParams(window.location.search).get("year") ?? undefined
  return isYear(value) ? value : "all"
}

export function ArchiveBrowser() {
  const fromUrl = useSyncExternalStore(() => () => {}, yearFromWindow, () => "all" as const)
  const [picked, setPicked] = useState<ArchiveYear | "all" | null>(null)
  const year = picked ?? fromUrl
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return archiveItems.filter((item) => {
      if (year !== "all" && item.year !== year) return false
      if (!needle) return true
      const haystack = `${item.title} ${item.people} ${item.summary} ${item.kind}`.toLowerCase()
      return haystack.includes(needle)
    })
  }, [query, year])

  const groups = archiveYearOrder
    .map((id) => ({
      id,
      items: filtered.filter((item) => item.year === id),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="學年">
          {archiveYears.map((option) => {
            const selected = year === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPicked(option.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm ring-1 ring-foreground/15",
                  selected ? "bg-primary text-primary-foreground" : "bg-white hover:bg-[#f3ecdf]",
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <label className="block w-full md:max-w-xs">
          <span className="sr-only">搜尋課程或老師</span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋課程或老師"
            className="h-10 bg-white"
          />
        </label>
      </div>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white px-5 py-8 text-center leading-7 ring-1 ring-foreground/10">
          沒有符合的檔案。
          {query ? `「${query}」可以改成老師的姓，或把學年改回全部。` : "把學年改回全部。"}
        </p>
      ) : (
        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <section key={group.id}>
              <h2 className="font-heading text-2xl">{archiveYearHeading(group.id)}</h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item.id} className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-foreground/10">
                    <p className="text-xs text-muted-foreground">
                      {item.yearLabel} · {item.kind}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.people}</p>
                    <p className="mt-3 flex-1 leading-7">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <OutLink key={link.wishId} href={wishUrl(link.wishId)}>
                          {link.label}
                          <span className="text-xs font-normal text-muted-foreground">{link.format}</span>
                        </OutLink>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
