import { ArrowRight, MapPin } from 'lucide-react'
import { AnimatedHeadline } from '@/components/animated-headline'
import { BloodBag } from '@/components/blood-bag'

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="hero-section relative mx-auto grid max-w-7xl gap-8 px-5 pt-16 pb-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:pt-20 lg:pb-28"
      >
        <div className="blood-thread blood-thread-hero" aria-hidden="true" />
        <div className="reveal relative z-10">
          <AnimatedHeadline />
          <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-8">
            À Cotonou, Porto-Novo ou Parakou, une heure suffit pour offrir du temps et une nouvelle
            chance à quelqu’un près de vous.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#eligibilite"
              className="button-lift bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold"
            >
              Faire le point <ArrowRight className="size-4" />
            </a>
            <a
              href="#centres"
              className="button-lift border-border bg-card inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 font-semibold"
            >
              Trouver un centre <MapPin className="text-primary size-4" />
            </a>
          </div>
        </div>
        <div className="reveal relative min-h-[430px] lg:min-h-[560px]">
          <BloodBag />
          <div className="hero-caption border-border bg-card/90 absolute bottom-0 left-4 max-w-[250px] rounded-2xl border p-4 shadow-lg backdrop-blur">
            <p className="font-serif text-xl font-bold">Une poche se remplit.</p>
            <p className="text-muted-foreground mt-1 text-xs leading-5">
              Et avec elle, l’espoir circule.
            </p>
          </div>
        </div>
      </section>
      <div className="vein-divider" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path
            className="wave-fill"
            d="M0 46C170 5 214 84 362 42s205-12 319 8 210 47 318 4 148-7 201-11V90H0Z"
          />
          <path
            className="flow-path"
            fill="none"
            d="M0 46C170 5 214 84 362 42s205-12 319 8 210 47 318 4 148-7 201-11"
          />
        </svg>
      </div>
    </>
  )
}
