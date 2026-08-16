import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Mono, DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-dm-serif' })
const dmMono = DM_Mono({ weight: '400', subsets: ['latin'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  title: 'DonCœur — Un petit geste. Un cœur qui bat.',
  description:
    'Comprendre le don de sang, vérifier son éligibilité et trouver un centre près de chez soi.',
  generator: 'DonCœur',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f8f4ec',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${dmSans.variable} ${dmSerif.variable} ${dmMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
