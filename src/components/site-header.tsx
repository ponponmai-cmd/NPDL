"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/competencies", label: "六大素養" },
  { href: "/design", label: "四個要素" },
  { href: "/inquiry", label: "協作探究" },
  { href: "/exemplars", label: "課堂示例" },
  { href: "/start", label: "學校怎麼開始" },
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-[#f7f3ea]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary font-heading text-lg text-primary-foreground">
            深
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-base">深學工坊</span>
            <span className="block text-[11px] tracking-wide text-muted-foreground">NPDL 深度學習</span>
          </span>
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="主要">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-white hover:text-foreground",
                isActive(pathname, link.href) && "bg-white text-foreground shadow-sm",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden lg:block">
          <Link
            href="/studio"
            className={buttonVariants({ size: "lg", className: "h-10 px-3.5" })}
            aria-current={isActive(pathname, "/studio") ? "page" : undefined}
          >
            設計工坊
          </Link>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="ml-auto lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">{open ? "關閉選單" : "開啟選單"}</span>
        </Button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-foreground/10 px-4 py-3 lg:hidden" aria-label="手機">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-2 py-2 text-base",
                    isActive(pathname, link.href) ? "bg-white" : "hover:bg-white/70",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/studio"
                className={buttonVariants({ className: "h-10 w-full" })}
                onClick={() => setOpen(false)}
              >
                設計工坊
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
