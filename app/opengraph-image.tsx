import { ImageResponse } from 'next/og'

export const alt = 'DonCœur — Un petit geste. Un cœur qui bat.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Hex equivalents of the oklch tokens in app/globals.css `:root`, since the
// ImageResponse (satori) renderer doesn't support oklch() colors.
const BACKGROUND = '#fdf6ed' // --background
const FOREGROUND = '#251614' // --foreground
const PRIMARY = '#b31124' // --primary
const SOFT_PINK = '#ffdddb' // --secondary
const BORDER = '#e0ccc4' // --border

const WORDMARK_DON = 'Don'
const WORDMARK_COEUR = 'Cœur'
const TAGLINE = 'Un petit geste. Un cœur qui bat.'
const KICKER = 'DON DE SANG · BÉNIN'
const FOOTER_LEFT = 'doncoeur.vercel.app'
const FOOTER_RIGHT = 'Cotonou · Porto-Novo · Parakou'

type LoadedFont = {
  name: string
  data: ArrayBuffer
  weight: 400
  style: 'normal'
}

async function loadGoogleFont(family: string, text: string): Promise<ArrayBuffer> {
  const params = new URLSearchParams({ family: `${family}:wght@400`, text })
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${params.toString()}`)).text()
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/)
  if (match) {
    const response = await fetch(match[1])
    if (response.ok) return response.arrayBuffer()
  }
  throw new Error(`Could not load font data for "${family}"`)
}

export default async function Image() {
  const fonts: LoadedFont[] = []

  // Best-effort brand fonts (DM Serif Display / DM Sans) fetched from Google
  // Fonts at render time. If that fails for any reason (no network at build
  // time, rate limiting, etc.) we fall back to the generic font baked into
  // next/og so the image still renders correctly.
  try {
    const [serifData, sansData] = await Promise.all([
      loadGoogleFont('DM Serif Display', `${WORDMARK_DON}${WORDMARK_COEUR}`),
      loadGoogleFont('DM Sans', `${TAGLINE}${KICKER}${FOOTER_LEFT}${FOOTER_RIGHT}`),
    ])
    fonts.push(
      { name: 'DM Serif Display', data: serifData, weight: 400, style: 'normal' },
      { name: 'DM Sans', data: sansData, weight: 400, style: 'normal' },
    )
  } catch {
    // Ignore — fonts stays empty and satori uses its bundled default font.
  }

  const serifFamily = fonts.some((f) => f.name === 'DM Serif Display')
    ? 'DM Serif Display'
    : 'serif'
  const sansFamily = fonts.some((f) => f.name === 'DM Sans') ? 'DM Sans' : 'sans-serif'

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: BACKGROUND,
        padding: '72px 88px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -150,
          right: -70,
          width: 420,
          height: 420,
          backgroundColor: SOFT_PINK,
          borderRadius: '0% 50% 50% 50%',
          transform: 'rotate(45deg)',
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            padding: '10px 22px',
            borderRadius: 999,
            border: `2px solid ${BORDER}`,
            color: PRIMARY,
            fontFamily: sansFamily,
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          {KICKER}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            display: 'flex',
            fontFamily: serifFamily,
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          <span style={{ color: FOREGROUND }}>{WORDMARK_DON}</span>
          <span style={{ color: PRIMARY }}>{WORDMARK_COEUR}</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: sansFamily,
            fontSize: 40,
            color: FOREGROUND,
            opacity: 0.85,
          }}
        >
          {TAGLINE}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: sansFamily,
          fontSize: 26,
          color: FOREGROUND,
          opacity: 0.6,
        }}
      >
        <div style={{ display: 'flex' }}>{FOOTER_LEFT}</div>
        <div style={{ display: 'flex' }}>{FOOTER_RIGHT}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  )
}
