'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { centers } from '@/lib/data'

const CenterMap = dynamic(() => import('@/components/center-map').then((mod) => mod.CenterMap), {
  ssr: false,
  loading: () => <div className="bg-muted h-[440px] animate-pulse rounded-[2rem]" />,
})

export function CentresFinder() {
  const [query, setQuery] = useState(''),
    [city, setCity] = useState('Toutes les villes'),
    [selected, setSelected] = useState(centers[0]),
    [located, setLocated] = useState(false)

  const filtered = useMemo(
    () =>
      centers.filter(
        (c) =>
          `${c.name} ${c.city} ${c.country}`.toLowerCase().includes(query.toLowerCase()) &&
          (city === 'Toutes les villes' || c.city === city),
      ),
    [query, city],
  )

  return (
    <section id="centres" className="reveal border-border bg-secondary/45 border-y py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="section-title">
          Le bon endroit,
          <br />
          près de chez vous.
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <CenterMap
            centers={filtered}
            active={selected}
            onSelect={setSelected}
            located={located}
            onLocate={() => setLocated(true)}
          />
          <div>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />
              <input
                className="field-input pl-11"
                aria-label="Rechercher un centre"
                placeholder="Ville, pays ou centre"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              className="field-input mt-3"
              aria-label="Filtrer par ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option>Toutes les villes</option>
              {[...new Set(centers.map((c) => c.city))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="mt-4 flex flex-col gap-3">
              {filtered.length === 0 && (
                <p className="border-border bg-card text-muted-foreground rounded-2xl border p-4 text-sm">
                  Aucun centre ne correspond à cette recherche. Essayez une autre ville ou un autre
                  mot-clé.
                </p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelected(c)}
                  className={`center-row bg-card rounded-2xl border p-4 text-left ${selected.name === c.name ? 'center-row-active border-primary' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {c.city}, {c.country} · {c.distance}
                      </p>
                    </div>
                    <span className="status-open rounded-full px-2 py-1 text-[10px] font-bold">
                      {c.open ? 'OUVERT' : 'FERMÉ'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-3 text-xs">
                    {c.address} · {c.hours}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
