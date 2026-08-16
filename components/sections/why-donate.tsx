export function WhyDonate() {
  return (
    <section id="pourquoi" className="reveal border-border bg-secondary/45 border-b">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Pourquoi donner</p>
            <h2 className="section-title">Votre sang ne se fabrique pas.</h2>
            <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
              Dans chaque ville, les équipes attendent des donneurs. Un accident, une naissance, une
              opération : derrière chaque poche, il y a une histoire qui continue.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['10 000', 'dons nécessaires chaque jour'],
                ['45 min', 'pour tout le parcours'],
                ['1 geste', 'pour faire circuler la vie'],
              ].map(([big, title]) => (
                <article key={title} className="illustrated-card bg-card rounded-3xl p-6">
                  <p className="text-primary font-serif text-5xl font-bold">{big}</p>
                  <p className="mt-5 font-semibold">{title}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="relative mx-auto h-80 w-full max-w-sm sm:h-95 lg:mx-0 lg:h-105">
            <img
              src="/photos/blood-bags-types.jpg"
              alt="Poches de sang de différents groupes, prêtes pour la transfusion"
              className="border-card absolute top-0 left-0 h-[75%] w-[80%] -rotate-3 rounded-3xl border-4 object-cover shadow-xl"
            />
            <img
              src="/photos/blood-bag-drip.jpg"
              alt="Poche de sang suspendue avec sa tubulure, pendant une transfusion"
              className="border-card absolute right-0 bottom-0 h-[58%] w-[58%] rotate-3 rounded-3xl border-4 object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
