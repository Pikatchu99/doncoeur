import { Droplets } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-border bg-card border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3 lg:px-8">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="logo-mark bg-primary text-primary-foreground grid size-9 place-items-center rounded-full">
              <Droplets className="size-4" />
            </span>
            <p className="font-serif text-2xl font-bold">
              Don<span className="text-primary">Cœur</span>
            </p>
          </a>
          <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-6">
            Donner, simplement. Retrouver un centre proche et faire le premier pas ensemble.
          </p>
        </div>
        <div>
          <p className="font-semibold">Explorer</p>
          <div className="text-muted-foreground mt-4 flex flex-col gap-2 text-sm">
            <a href="#pourquoi" className="nav-link">
              Pourquoi donner
            </a>
            <a href="#parcours" className="nav-link">
              Le parcours
            </a>
            <a href="#centres" className="nav-link">
              Trouver un centre
            </a>
          </div>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p className="text-muted-foreground mt-4 text-sm leading-6">
            bonjour@doncoeur.bj
            <br />
            Bénin
          </p>
        </div>
      </div>
      <div className="border-border text-muted-foreground flex flex-col gap-2 border-t px-5 py-5 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 DonCœur</p>
        <p>
          Conçu par <a href="https://github.com/Pikatchu99">Yémalin</a>
        </p>
      </div>
    </footer>
  )
}
