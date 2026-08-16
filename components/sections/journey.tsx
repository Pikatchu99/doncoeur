import { CalendarDays, Clock3, Droplets } from 'lucide-react'
import { JourneyTube } from '@/components/journey-tube'
import { journeySteps } from '@/lib/data'

export function Journey() {
  return (
    <section
      id="parcours"
      className="reveal relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"
    >
      <p className="eyebrow">Le jour J</p>
      <h2 className="section-title">
        Un parcours accompagné,
        <br />
        du début à la fin.
      </h2>
      <div className="journey-wrap mt-12">
        <JourneyTube />
        <div className="grid gap-5 md:grid-cols-4">
          {journeySteps.map(({ number, title, text, Icon, variant }) => (
            <article key={number} className="step-card creative-step">
              <span className="step-number step-number-inline">{number}</span>
              <div className={`step-illustration ${variant}`}>
                <Icon className="size-6" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-bold">{title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">{text}</p>
            </article>
          ))}
        </div>
        {/* Rendered as a separate absolutely-positioned overlay grid (not the numbers inside
            each card) because .creative-step establishes its own stacking context (z-index: 1),
            which would otherwise clip/reorder the badge relative to sibling cards. */}
        <div aria-hidden="true" className="step-number-overlay grid gap-5 md:grid-cols-4">
          {journeySteps.map(({ number }) => (
            <span key={number} className="step-number">
              {number}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-secondary mt-10 grid gap-4 rounded-3xl p-6 sm:grid-cols-3">
        <p className="flex gap-3 text-sm">
          <CalendarDays className="text-primary size-5" />
          Une pièce d’identité
        </p>
        <p className="flex gap-3 text-sm">
          <Droplets className="text-primary size-5" />
          Mangez et hydratez-vous
        </p>
        <p className="flex gap-3 text-sm">
          <Clock3 className="text-primary size-5" />
          Environ 45 minutes
        </p>
      </div>
    </section>
  )
}
