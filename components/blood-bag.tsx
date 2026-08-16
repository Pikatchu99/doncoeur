'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Bag body (pre-rotation), in SVG viewBox units.
const BAG_X = 250
const BAG_Y = 10
const BAG_W = 324
const BAG_H = 528
const BAG_BOTTOM = BAG_Y + BAG_H // 360
const FILL_TOP = BAG_Y + BAG_H * 0.18 // ~82% full, 204.2
const FILL_HEIGHT = BAG_BOTTOM - FILL_TOP
const BAG_ROTATION = -10
const BAG_CENTER_X = BAG_X + BAG_W / 2 // 385
const BAG_CENTER_Y = BAG_Y + BAG_H / 2 // 265

// Starts right at the "œ" in "cœur" — its rounded tip sits on the glyph so the tube reads
// as if it begins from that letter — then curls into a ribbon-like flourish and rises into
// a small connector fitting at the top of the bag. overflow:visible lets this bleed past
// the illustration's own grid cell into the text column. Coordinates measured against the
// rendered headline via Range/rect measurements, mapped into this SVG's viewBox space.
const TUBE_PATH =
  'M-588 370C-500 430 -466 470 -415 415 -350 380 -280 460 -180 430 -100 400 -60 300 -20 280 80 220 200 240 290 171'

// Mobile: the hero copy stacks above the bag instead of sitting beside it, so instead of
// weaving through the headline (desktop), the tube bleeds far up past the illustration's
// own box — through the stacked text above it — so neither its start nor the seam with
// that content is visible on screen, then drops down into the bag.
const MOBILE_TUBE_PATH = 'M270 -1600C320 -1100 240 -500 280 -100 295 0 260 100 290 171'

// Small fitting the tube plugs into, straddling the bag's top-left edge — without it the
// tube visually stops short of the bag with an empty gap between the two.
const PORT_X = 290
const PORT_Y = 148
const PORT_W = 34
const PORT_H = 46

const FILL_DELAY = 1.4 // waits for blood to travel the tube before the bag starts filling
const FILL_DURATION = 3.2
const POST_FILL = FILL_DELAY + FILL_DURATION

const BUBBLES = [
  { cx: BAG_X + 72, size: 7, delay: 0, duration: 3.4 },
  { cx: BAG_X + 168, size: 5, delay: 0.9, duration: 3.9 },
  { cx: BAG_X + 246, size: 8, delay: 1.8, duration: 3.1 },
  { cx: BAG_X + 120, size: 4, delay: 2.5, duration: 4.2 },
]

const WAVE_PERIOD = 100
const WAVE_AMP = 8
const WAVE_START = 90
const WAVE_PERIODS = 6

function buildWavePath() {
  let d = `M${WAVE_START} 0`
  for (let i = 0; i < WAVE_PERIODS; i++) {
    const x = WAVE_START + i * WAVE_PERIOD
    d += ` C${x + 16} ${-WAVE_AMP} ${x + 34} ${-WAVE_AMP} ${x + 50} 0`
    d += ` C${x + 66} ${WAVE_AMP} ${x + 84} ${WAVE_AMP} ${x + 100} 0`
  }
  const endX = WAVE_START + WAVE_PERIODS * WAVE_PERIOD
  d += ` L${endX} 34 L${WAVE_START} 34 Z`
  return d
}

export function BloodBag() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const bagGroupRef = useRef<SVGGElement>(null)
  const fluidRectRef = useRef<SVGRectElement>(null)
  const waveGroupRef = useRef<SVGGElement>(null)
  const tubeFlowRef = useRef<SVGPathElement>(null)
  const tubeFlowMobileRef = useRef<SVGPathElement>(null)
  const bubbleRefs = useRef<Array<SVGCircleElement | null>>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set([tubeFlowRef.current, tubeFlowMobileRef.current], { strokeDashoffset: 60 })
        gsap.to([tubeFlowRef.current, tubeFlowMobileRef.current], {
          strokeDashoffset: 0,
          duration: 4.5,
          ease: 'none',
          repeat: -1,
        })

        const fillTl = gsap.timeline({ delay: FILL_DELAY })
        fillTl
          .fromTo(
            fluidRectRef.current,
            { attr: { y: BAG_BOTTOM, height: 0 } },
            {
              attr: { y: FILL_TOP, height: FILL_HEIGHT },
              duration: FILL_DURATION,
              ease: 'back.out(1.15)',
            },
            0,
          )
          .fromTo(
            waveGroupRef.current,
            { y: BAG_BOTTOM },
            { y: FILL_TOP, duration: FILL_DURATION, ease: 'back.out(1.15)' },
            0,
          )

        gsap.to(fluidRectRef.current, {
          attr: { height: `+=${FILL_HEIGHT * 0.02}` },
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: POST_FILL,
        })

        gsap.to(waveGroupRef.current, { x: -WAVE_PERIOD, duration: 3.4, ease: 'none', repeat: -1 })

        bubbleRefs.current.forEach((el, i) => {
          if (!el) return
          const bubble = BUBBLES[i]
          gsap.set(el, { y: 0, opacity: 0 })
          gsap.to(el, {
            delay: POST_FILL + bubble.delay,
            repeat: -1,
            ease: 'sine.out',
            onRepeat: () => gsap.set(el, { x: gsap.utils.random(-8, 8) }),
            keyframes: [
              { opacity: 1, duration: bubble.duration * 0.12 },
              { y: -120, opacity: 1, duration: bubble.duration * 0.7 },
              { opacity: 0, duration: bubble.duration * 0.18 },
            ],
          })
        })

        gsap.fromTo(
          bagGroupRef.current,
          { y: -10, rotation: BAG_ROTATION - 2 },
          {
            y: 0,
            rotation: BAG_ROTATION,
            duration: 1.3,
            ease: 'bounce.out',
            delay: 0.3,
            transformOrigin: `${BAG_CENTER_X}px ${BAG_CENTER_Y}px`,
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(fluidRectRef.current, { attr: { y: FILL_TOP, height: FILL_HEIGHT } })
        gsap.set(waveGroupRef.current, { y: FILL_TOP })
        gsap.set(bagGroupRef.current, {
          rotation: BAG_ROTATION,
          transformOrigin: `${BAG_CENTER_X}px ${BAG_CENTER_Y}px`,
        })
      })
    },
    { scope: sceneRef },
  )

  return (
    <div
      className="blood-scene"
      ref={sceneRef}
      aria-label="Poche de sang posée, alimentée par une tubulure incurvée"
    >
      <svg className="blood-illustration" viewBox="0 0 580 460" aria-hidden="true">
        <defs>
          <clipPath id="bagClip">
            <rect x={BAG_X} y={BAG_Y} width={BAG_W} height={BAG_H} rx="28" ry="30" />
          </clipPath>
        </defs>

        <ellipse
          className="bag-ground-shadow"
          cx={BAG_CENTER_X + 70}
          cy={BAG_Y + BAG_H + 18}
          rx="210"
          ry="18"
          transform={`rotate(${BAG_ROTATION} ${BAG_CENTER_X} ${BAG_Y + BAG_H + 18})`}
        />

        <g className="hidden lg:block">
          <path className="tube-outline" d={TUBE_PATH} fill="none" />
          <path className="tube-body" d={TUBE_PATH} fill="none" />
          <path
            className="tube-flow"
            ref={tubeFlowRef}
            d={TUBE_PATH}
            fill="none"
            strokeDasharray="26 34"
            pathLength={100}
          />
        </g>
        <g className="lg:hidden">
          <path className="tube-outline" d={MOBILE_TUBE_PATH} fill="none" />
          <path className="tube-body" d={MOBILE_TUBE_PATH} fill="none" />
          <path
            className="tube-flow"
            ref={tubeFlowMobileRef}
            d={MOBILE_TUBE_PATH}
            fill="none"
            strokeDasharray="26 34"
            pathLength={100}
          />
        </g>
        <rect className="tube-port" x={PORT_X} y={PORT_Y} width={PORT_W} height={PORT_H} rx="8" />

        <g ref={bagGroupRef} transform={`rotate(${BAG_ROTATION} ${BAG_CENTER_X} ${BAG_CENTER_Y})`}>
          <rect
            className="bag-body"
            x={BAG_X}
            y={BAG_Y}
            width={BAG_W}
            height={BAG_H}
            rx="28"
            ry="30"
          />

          <g clipPath="url(#bagClip)">
            <rect
              ref={fluidRectRef}
              className="bag-fluid"
              x={BAG_X}
              y={BAG_BOTTOM}
              width={BAG_W}
              height="0"
            />
            <g ref={waveGroupRef} className="fluid-wave">
              <path d={buildWavePath()} />
            </g>
            {BUBBLES.map((bubble, i) => (
              <circle
                key={bubble.cx}
                ref={(el) => {
                  bubbleRefs.current[i] = el
                }}
                className="fluid-bubble"
                cx={bubble.cx}
                cy={BAG_BOTTOM - 20}
                r={bubble.size}
              />
            ))}
          </g>

          <g className="bag-label" transform={`translate(${BAG_CENTER_X} ${BAG_Y + 56})`}>
            <text className="bag-label-title" textAnchor="middle" dy="0">
              DONCŒUR
            </text>
            <text className="bag-label-sub" textAnchor="middle" dy="20">
              DON DE SANG · AOÛT
            </text>
            <text className="bag-label-tag" textAnchor="middle" dy="40">
              Chaque goutte compte
            </text>
          </g>
        </g>
      </svg>

      <svg className="vein-loop" viewBox="0 0 500 280" fill="none" aria-hidden="true">
        <path
          d="M12 218C100 198 74 104 170 118s66 96 153 63c66-25 70-109 165-129"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 11"
        />
        <path
          d="M0 238C90 220 103 175 140 178s57 48 105 31"
          stroke="currentColor"
          strokeOpacity=".35"
          strokeWidth="14"
        />
      </svg>
    </div>
  )
}
