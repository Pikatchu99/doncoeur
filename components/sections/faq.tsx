'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/lib/data'

export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section className="reveal mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
      <div>
        <p className="eyebrow">On en parle</p>
        <h2 className="section-title">
          Les questions que
          <br />
          vous vous posez.
        </h2>
      </div>
      <div className="divide-border border-border divide-y border-y">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button
              className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold"
              aria-expanded={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{q}</span>
              <ChevronDown
                className={`text-primary size-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openFaq === i && (
              <p className="faq-answer text-muted-foreground pr-10 pb-5 text-sm leading-7">{a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
