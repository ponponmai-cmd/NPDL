import Link from "next/link"
import { competencies, type CompetencySlug } from "@/lib/competencies"
import { cn } from "@/lib/utils"

export function CompetencyMark({
  slug,
  className,
}: {
  slug: CompetencySlug
  className?: string
}) {
  const item = competencies.find((competency) => competency.slug === slug)
  if (!item) return null
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md font-heading text-lg text-white",
        className,
      )}
      style={{ backgroundColor: item.color }}
      aria-hidden
    >
      {item.mark}
    </span>
  )
}

export function CompetencyChip({ slug }: { slug: CompetencySlug }) {
  const item = competencies.find((competency) => competency.slug === slug)
  if (!item) return null
  return (
    <Link
      href={`/competencies/${item.slug}`}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/80 py-1 pr-2.5 pl-1 text-sm ring-1 ring-foreground/10 hover:bg-white"
    >
      <CompetencyMark slug={slug} className="size-6 text-sm" />
      {item.zh}
    </Link>
  )
}
