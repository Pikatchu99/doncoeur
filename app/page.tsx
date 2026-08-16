'use client'

import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Droplets,
  Heart,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { BloodBag } from '@/components/blood-bag'
import { AnimatedHeadline } from '@/components/animated-headline'
import { JourneyTube } from '@/components/journey-tube'
const CenterMap = dynamic(() => import('@/components/center-map').then((mod) => mod.CenterMap), {
  ssr: false,
  loading: () => <div className="bg-muted h-[440px] animate-pulse rounded-[2rem]" />,
})
const journeySteps = [
  {
    number: '01',
    title: 'Accueil',
    text: 'On vous accueille, on vous explique.',
    Icon: Heart,
    variant: 'heart',
  },
  {
    number: '02',
    title: 'Échange',
    text: 'Un professionnel répond à vos questions.',
    Icon: MessageCircle,
    variant: '',
  },
  {
    number: '03',
    title: 'Don',
    text: 'Dix minutes pour faire circuler la vie.',
    Icon: Droplets,
    variant: 'drop',
  },
  {
    number: '04',
    title: 'Pause',
    text: 'Une collation, puis vous repartez.',
    Icon: Sun,
    variant: 'sun',
  },
]

type Center = {
  name: string
  city: string
  country: string
  address: string
  hours: string
  open: boolean
  phone: string
  donations: string[]
  mode: string
  distance: string
  lat: number
  lng: number
}
const centers: Center[] = [
  {
    name: 'Agence nationale pour la transfusion sanguine',
    city: 'Cotonou',
    country: 'Bénin',
    address: 'Avenue Jean-Paul II',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 30 04 52',
    donations: ['Sang total', 'Plasma'],
    mode: 'Avec ou sans rendez-vous',
    distance: '2,6 km',
    lat: 6.37,
    lng: 2.39,
  },
  {
    name: 'Centre départemental de transfusion sanguine',
    city: 'Porto-Novo',
    country: 'Bénin',
    address: 'Route de Porto-Novo',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 20 21 25 33',
    donations: ['Sang total'],
    mode: 'Sur rendez-vous',
    distance: '4,1 km',
    lat: 6.5,
    lng: 2.62,
  },
  {
    name: 'Centre hospitalier départemental du Borgou',
    city: 'Parakou',
    country: 'Bénin',
    address: 'Route de Nikki',
    hours: 'Lun–Ven 8h–16h',
    open: false,
    phone: '+229 23 61 02 14',
    donations: ['Sang total', 'Plasma'],
    mode: 'Sur rendez-vous',
    distance: '5,3 km',
    lat: 9.34,
    lng: 2.63,
  },
  {
    name: 'Centre de santé communal d’Abomey-Calavi',
    city: 'Abomey-Calavi',
    country: 'Bénin',
    address: 'Route de l’Université',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 36 12 08',
    donations: ['Sang total'],
    mode: 'Avec ou sans rendez-vous',
    distance: '3,2 km',
    lat: 6.4489,
    lng: 2.3554,
  },
  {
    name: 'Centre hospitalier départemental du Zou',
    city: 'Abomey',
    country: 'Bénin',
    address: 'Avenue Kpodégbé',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 22 50 03 21',
    donations: ['Sang total', 'Plasma'],
    mode: 'Sur rendez-vous',
    distance: '6,7 km',
    lat: 7.1833,
    lng: 1.9833,
  },
  {
    name: 'Centre hospitalier de zone de Bohicon',
    city: 'Bohicon',
    country: 'Bénin',
    address: 'Route Nationale 2',
    hours: 'Lun–Ven 8h–16h',
    open: false,
    phone: '+229 22 51 07 44',
    donations: ['Sang total'],
    mode: 'Sur rendez-vous',
    distance: '7,4 km',
    lat: 7.1783,
    lng: 2.0667,
  },
  {
    name: 'Centre hospitalier départemental de l’Atacora',
    city: 'Natitingou',
    country: 'Bénin',
    address: 'Quartier Kouti',
    hours: 'Lun–Ven 8h–16h',
    open: true,
    phone: '+229 23 82 11 09',
    donations: ['Sang total', 'Plasma'],
    mode: 'Avec ou sans rendez-vous',
    distance: '8,9 km',
    lat: 10.3042,
    lng: 1.3796,
  },
  {
    name: 'Centre de santé communal de Ouidah',
    city: 'Ouidah',
    country: 'Bénin',
    address: 'Route des Pêches',
    hours: 'Lun–Sam 8h–17h',
    open: true,
    phone: '+229 21 34 15 27',
    donations: ['Sang total'],
    mode: 'Sans rendez-vous',
    distance: '4,5 km',
    lat: 6.3628,
    lng: 2.0852,
  },
]
const faqs = [
  [
    'Est-ce que le don fait mal ?',
    'La sensation ressemble à une prise de sang classique. La piqûre ne dure que quelques secondes, avec une équipe à vos côtés.',
  ],
  [
    'Combien de temps faut-il prévoir ?',
    'Comptez environ 45 minutes sur place, dont 10 minutes pour le prélèvement.',
  ],
  [
    'Puis-je donner si je n’ai jamais donné ?',
    'Oui. La première fois, l’équipe prend simplement plus de temps pour répondre à vos questions.',
  ],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false),
    [firstName, setFirstName] = useState(''),
    [age, setAge] = useState(''),
    [weight, setWeight] = useState(''),
    [sex, setSex] = useState(''),
    [lastDonation, setLastDonation] = useState(''),
    [neverDonated, setNeverDonated] = useState(false),
    [question, setQuestion] = useState(0),
    [formError, setFormError] = useState(''),
    [eligibility, setEligibility] = useState<string | null>(null)
  const [query, setQuery] = useState(''),
    [city, setCity] = useState('Toutes les villes'),
    [selected, setSelected] = useState(centers[0]),
    [located, setLocated] = useState(false),
    [openFaq, setOpenFaq] = useState<number | null>(0)
  const questions = [
    {
      id: 'firstName',
      label: 'Bonjour, comment puis-je vous appeler ?',
      hint: 'Votre prénom',
      value: firstName,
      set: setFirstName,
      type: 'text',
      placeholder: 'ex. Awa',
    },
    {
      id: 'age',
      label: 'Quel âge avez-vous ?',
      hint: 'Votre âge',
      value: age,
      set: setAge,
      type: 'number',
      placeholder: 'ex. 28 ans',
    },
    {
      id: 'weight',
      label: 'Quel est votre poids, la dernière fois ?',
      hint: 'Votre poids',
      value: weight,
      set: setWeight,
      type: 'number',
      placeholder: 'ex. 62 kg',
    },
    {
      id: 'sex',
      label: 'Comment vous définissez-vous ?',
      hint: 'Ça ajuste le délai minimum entre deux dons',
      value: sex,
      set: setSex,
      type: 'select',
      options: ['Homme', 'Femme'],
      placeholder: '',
    },
    {
      id: 'lastDonation',
      label: 'Quand avez-vous donné pour la dernière fois ?',
      hint: 'Dernier don',
      value: lastDonation,
      set: setLastDonation,
      type: 'date',
      placeholder: '',
      optional: true,
    },
  ]

  function computeEligibility() {
    const disclaimer =
      'Seul un entretien médical professionnel peut confirmer votre aptitude au don.'
    const ageNum = Number(age)
    const weightNum = Number(weight)

    if (ageNum < 18 || ageNum > 65) {
      return `Merci ${firstName}, l’âge requis pour donner se situe entre 18 et 65 ans révolus — ce n’est pas encore le cas pour vous. ${disclaimer}`
    }
    if (weightNum < 50) {
      return `Merci ${firstName}, un poids minimum de 50 kg est requis pour donner. ${disclaimer}`
    }
    if (!neverDonated && lastDonation) {
      const requiredMonths = sex === 'Femme' ? 4 : 3
      const nextEligible = new Date(lastDonation)
      nextEligible.setMonth(nextEligible.getMonth() + requiredMonths)
      if (new Date() < nextEligible) {
        const formatted = nextEligible.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        return `Merci ${firstName}, le délai de ${requiredMonths} mois entre deux dons n’est pas encore écoulé. Vous pourrez donner à nouveau à partir du ${formatted}. ${disclaimer}`
      }
    }
    return `Merci ${firstName}, vous pouvez faire le premier pas. Rendez-vous dans un centre proche de vous. ${disclaimer}`
  }

  function nextQuestion() {
    const current = questions[question]
    const satisfied = Boolean(current.value) || (current.id === 'lastDonation' && neverDonated)
    if (!satisfied) {
      setFormError('Merci de répondre avant de continuer.')
      return
    }
    setFormError('')
    if (question < questions.length - 1) setQuestion(question + 1)
    else setEligibility(computeEligibility())
  }
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
    <main className="bg-background text-foreground min-h-screen overflow-hidden">
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
      <section id="pourquoi" className="reveal border-border bg-secondary/45 border-b">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div>
              <p className="eyebrow">Pourquoi donner</p>
              <h2 className="section-title">Votre sang ne se fabrique pas.</h2>
              <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
                Dans chaque ville, les équipes attendent des donneurs. Un accident, une naissance,
                une opération : derrière chaque poche, il y a une histoire qui continue.
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
      <section id="eligibilite" className="reveal bg-ink text-ink-foreground py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <p className="eyebrow text-primary">Avant de venir</p>
            <h2 className="section-title text-ink-foreground">
              On regarde ça
              <br />
              <em className="text-primary font-normal">ensemble.</em>
            </h2>
            <p className="text-ink-muted mt-6 max-w-md leading-7">
              Une question à la fois. Répondez simplement, comme vous le feriez avec une personne
              qui vous accompagne.
            </p>
          </div>
          <div className="bg-card text-card-foreground rounded-[2rem] p-6 shadow-2xl sm:p-8">
            <div className="text-muted-foreground flex items-center justify-between font-mono text-xs">
              <span>
                ÉTAPE {eligibility ? questions.length : question + 1} / {questions.length}
              </span>
              <span>{firstName || 'Votre parcours'}</span>
            </div>
            {eligibility ? (
              <div className="result-pop py-12">
                <div className="bg-secondary text-primary grid size-14 place-items-center rounded-full">
                  <HeartPulse />
                </div>
                <h3 className="mt-6 font-serif text-xl leading-8 font-bold">{eligibility}</h3>
                <a
                  href="#centres"
                  className="button-lift bg-primary text-primary-foreground mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold"
                >
                  Trouver mon centre <ArrowRight className="size-4" />
                </a>
              </div>
            ) : (
              <div className="py-10">
                <p className="eyebrow">On commence doucement</p>
                <h3 className="mt-3 font-serif text-3xl font-bold">{questions[question].label}</h3>
                {questions[question].hint && (
                  <p className="text-muted-foreground mt-2 text-sm">{questions[question].hint}</p>
                )}
                {questions[question].type === 'select' ? (
                  <select
                    className="field-input mt-8"
                    value={questions[question].value}
                    onChange={(e) => questions[question].set(e.target.value)}
                  >
                    <option value="">Choisissez une réponse</option>
                    {questions[question].options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="field-input mt-8"
                    type={questions[question].type}
                    placeholder={questions[question].placeholder}
                    value={questions[question].value}
                    disabled={questions[question].id === 'lastDonation' && neverDonated}
                    onChange={(e) => {
                      questions[question].set(e.target.value)
                      if (questions[question].id === 'lastDonation' && e.target.value) {
                        setNeverDonated(false)
                      }
                    }}
                  />
                )}
                {questions[question].id === 'lastDonation' && (
                  <label className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={neverDonated}
                      onChange={(e) => {
                        setNeverDonated(e.target.checked)
                        if (e.target.checked) setLastDonation('')
                      }}
                    />
                    Je n’ai jamais donné
                  </label>
                )}
                {formError && <p className="text-primary mt-3 text-sm">{formError}</p>}
                <button
                  onClick={nextQuestion}
                  className="button-lift bg-primary text-primary-foreground mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold"
                >
                  {question === questions.length - 1 ? 'Vérifier mon éligibilité' : 'Continuer'}{' '}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
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
      <section
        id="centres"
        className="reveal border-border bg-secondary/45 border-y py-16 lg:py-24"
      >
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
                    Aucun centre ne correspond à cette recherche. Essayez une autre ville ou un
                    autre mot-clé.
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
      <section className="reveal mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-24">
        <div>
          <p className="eyebrow">On en parle</p>
          <h2 className="section-title">
            Les questions que
            <br />
            vous vous posez.
          </h2>
        </div>
        <div className="divide-border border-border divide-y border-y">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{q}</span>
                <ChevronDown
                  className={`text-primary size-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <p className="faq-answer text-muted-foreground pr-10 pb-5 text-sm leading-7">{a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
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
    </main>
  )
}
