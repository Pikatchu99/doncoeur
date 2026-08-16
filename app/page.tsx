import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { WhyDonate } from '@/components/sections/why-donate'
import { EligibilityQuiz } from '@/components/sections/eligibility-quiz'
import { Journey } from '@/components/sections/journey'
import { CentresFinder } from '@/components/sections/centres-finder'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <WhyDonate />
      <EligibilityQuiz />
      <Journey />
      <CentresFinder />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  )
}
