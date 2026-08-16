'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const LINE_1 = ['Votre', 'geste', 'peut']
const LINE_2 = ['faire', 'battre', 'un', 'cœur.']

function renderWords(words: string[]) {
  return words.flatMap((word, i) =>
    i === 0
      ? [
          <span key={word} className="headline-word inline-block">
            {word}
          </span>,
        ]
      : [
          ' ',
          <span key={word} className="headline-word inline-block">
            {word}
          </span>,
        ],
  )
}

export function AnimatedHeadline() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.headline-word', {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          delay: 0.15,
        })
      })
    },
    { scope: headingRef },
  )

  return (
    <h1
      ref={headingRef}
      className="max-w-2xl font-serif text-5xl leading-[.96] font-bold tracking-[-.04em] text-balance sm:text-6xl lg:text-8xl"
    >
      {renderWords(LINE_1)}
      <br />
      <em className="text-primary font-normal">{renderWords(LINE_2)}</em>
    </h1>
  )
}
