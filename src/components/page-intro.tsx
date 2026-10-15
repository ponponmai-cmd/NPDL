export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium tracking-wide text-primary">{eyebrow}</p>
      <h1 className="mt-2 font-heading text-4xl leading-tight text-balance md:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{lede}</p>
    </div>
  )
}
