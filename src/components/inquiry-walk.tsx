"use client"

import { useState } from "react"
import { inquiryMoves } from "@/lib/inquiry"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function InquiryWalk() {
  const [index, setIndex] = useState(0)
  const move = inquiryMoves[index]

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <ol className="space-y-2">
        {inquiryMoves.map((item, itemIndex) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-current={itemIndex === index ? "step" : undefined}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left ring-1 ring-foreground/10",
                itemIndex === index ? "bg-primary text-primary-foreground" : "bg-white hover:bg-white/80",
              )}
            >
              <span className="block text-xs opacity-80">{item.step}</span>
              <span className="font-medium">{item.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <article className="rounded-2xl bg-white p-6 ring-1 ring-foreground/10 md:p-8">
        <p className="text-sm text-primary">{move.step} / 05</p>
        <h2 className="mt-1 font-heading text-3xl">{move.title}</h2>
        <p className="mt-3 text-lg leading-8">{move.prompt}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-[#f6f1e7] p-4">
            <p className="text-sm font-medium">教師這一步在做</p>
            <p className="mt-2 leading-7">{move.teacher}</p>
          </div>
          <div className="rounded-xl bg-[#f6f1e7] p-4">
            <p className="text-sm font-medium">學生身上看得到</p>
            <p className="mt-2 leading-7">{move.student}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          例子來自花中教案「旅遊英文」。用來走一遍探究，不是把整份 Word 重貼一遍。
        </p>
        <div className="mt-6 flex gap-2">
          <Button type="button" variant="outline" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
            上一步
          </Button>
          <Button type="button" disabled={index === inquiryMoves.length - 1} onClick={() => setIndex((value) => value + 1)}>
            下一步
          </Button>
        </div>
      </article>
    </div>
  )
}
