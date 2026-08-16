import { ArrowRight, Droplets } from 'lucide-react'

export function FinalCta() {
  return (
    <section className="final-cta reveal bg-primary text-primary-foreground mx-5 mb-12 overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 lg:mx-auto lg:max-w-7xl">
      <Droplets className="mx-auto mb-5 size-9 animate-bounce" />
      <p className="text-primary-foreground/70 font-mono text-xs tracking-[.2em] uppercase">
        Le premier pas est proche
      </p>
      <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-bold sm:text-5xl">
        Et si votre prochain geste changeait une histoire ?
      </h2>
      <a
        href="#eligibilite"
        className="button-lift bg-card text-card-foreground mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold"
      >
        Faire le point <ArrowRight className="text-primary size-4" />
      </a>
    </section>
  )
}
