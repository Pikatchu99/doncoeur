'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Weaves through the 4 step-number badges (approximate positions in a 1000x230 box
// matching the 4-column card grid, including the ±28px zigzag stagger on cards 2/4),
// bleeding far past the grid's own edges so neither end is visible on screen.
const TUBE_PATH =
  'M-600 45C-500 45 -100 45 45 45 150 45 195 73 295 73 395 73 440 45 545 45 650 45 695 73 795 73 900 73 1200 60 1600 30'

export function JourneyTube() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const bgFlowRef = useRef<SVGPathElement>(null)
  const fgFlowRef = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set([bgFlowRef.current, fgFlowRef.current], { strokeDashoffset: 60 })
        gsap.to([bgFlowRef.current, fgFlowRef.current], {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'none',
          repeat: -1,
        })
      })
    },
    { scope: wrapRef },
  )

  return (
    <div ref={wrapRef} aria-hidden="true">
      {/* Behind the cards — carries the tube under columns 1 and 3. */}
      <svg
        className="journey-tube journey-tube-bg"
        viewBox="0 0 1000 230"
        preserveAspectRatio="none"
      >
        <path className="journey-tube-outline" d={TUBE_PATH} fill="none" />
        <path className="journey-tube-body" d={TUBE_PATH} fill="none" />
        <path
          className="journey-tube-flow"
          ref={bgFlowRef}
          d={TUBE_PATH}
          fill="none"
          strokeDasharray="18 22"
          pathLength={100}
        />
      </svg>
      {/* In front of the cards, but clipped to columns 2 and 4 — same path, so the tube
          reads as continuous while alternating which side of each card it's on. */}
      <svg
        className="journey-tube journey-tube-fg"
        viewBox="0 0 1000 230"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="journeyFgClip" clipPathUnits="userSpaceOnUse">
            <rect x="250" y="0" width="250" height="230" />
            <rect x="750" y="0" width="250" height="230" />
          </clipPath>
        </defs>
        <g clipPath="url(#journeyFgClip)">
          <path className="journey-tube-outline" d={TUBE_PATH} fill="none" />
          <path className="journey-tube-body" d={TUBE_PATH} fill="none" />
          <path
            className="journey-tube-flow"
            ref={fgFlowRef}
            d={TUBE_PATH}
            fill="none"
            strokeDasharray="18 22"
            pathLength={100}
          />
        </g>
      </svg>
    </div>
  )
}
