'use client'

import { useState } from 'react'
import { Droplets, Menu, X } from 'lucide-react'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="logo-mark bg-primary text-primary-foreground grid size-10 place-items-center rounded-full">
            <Droplets className="size-5" />
          </span>
          <span className="font-serif text-xl font-bold">
            Don<span className="text-primary">Cœur</span>
          </span>
        </a>
        <nav className="text-muted-foreground hidden items-center gap-7 text-sm font-medium lg:flex">
          <a href="#pourquoi">Pourquoi donner</a>
          <a href="#eligibilite">Éligibilité</a>
          <a href="#parcours">Le parcours</a>
          <a href="#centres">Trouver un centre</a>
        </nav>
        <a
          href="#eligibilite"
          className="button-lift bg-primary text-primary-foreground hidden rounded-full px-5 py-2.5 text-sm font-semibold lg:block"
        >
          Faire le point
        </a>
        <button
          className="rounded-full p-2 lg:hidden"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-border flex flex-col gap-4 border-t px-5 py-5 lg:hidden">
          <a href="#pourquoi">Pourquoi donner</a>
          <a href="#eligibilite">Éligibilité</a>
          <a href="#parcours">Le parcours</a>
          <a href="#centres">Trouver un centre</a>
        </nav>
      )}
    </header>
  )
}
