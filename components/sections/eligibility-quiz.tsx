'use client'

import { useState } from 'react'
import { ArrowRight, HeartPulse } from 'lucide-react'

export function EligibilityQuiz() {
  const [firstName, setFirstName] = useState(''),
    [age, setAge] = useState(''),
    [weight, setWeight] = useState(''),
    [sex, setSex] = useState(''),
    [lastDonation, setLastDonation] = useState(''),
    [neverDonated, setNeverDonated] = useState(false),
    [question, setQuestion] = useState(0),
    [formError, setFormError] = useState(''),
    [eligibility, setEligibility] = useState<string | null>(null)

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

  return (
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
            Une question à la fois. Répondez simplement, comme vous le feriez avec une personne qui
            vous accompagne.
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
  )
}
