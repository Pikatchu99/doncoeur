# DonCœur

Landing page d'information sur le don de sang, centrée sur le Bénin (Cotonou, Porto-Novo, Parakou). Projet réalisé pour le **Figma to Code Challenge — Édition 4** (« Un sujet, une IA, votre instinct »).

Le brief fournissait uniquement un cahier des charges de contenu (aucune maquette) — la direction visuelle, la structure narrative et l'implémentation sont un parti pris original.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + [shadcn](https://ui.shadcn.com) (style `base-nova`) pour les primitives UI (`@base-ui/react`)
- **GSAP** (`@gsap/react`) pour les animations (poche de sang, tube de circulation, apparition du titre)
- **react-leaflet** + OpenStreetMap pour la carte des centres
- **lucide-react** pour les icônes
- Aucun backend : toutes les données (centres, FAQ) sont statiques, définies dans `app/page.tsx`

## Lancer le projet

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Autres scripts : `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm format` (Prettier).

## Partis pris de conception

- **Identité visuelle originale** : palette ivoire / encre brune / rouge sang, typographie serif expressive pour les titres, illustration SVG animée (poche de sang qui se remplit, tube de circulation sanguine reliant le logo à la poche, puis reliant les étapes du parcours de don) plutôt qu'un thème préconçu.
- **Approche rassurante et pédagogique** : le simulateur d'éligibilité avance une question à la fois (plutôt qu'un long formulaire), pour ne jamais submerger un visiteur qui n'a jamais donné.
- **Ancrage local** : contenus, centres et repères géographiques centrés sur le Bénin plutôt qu'une liste générique panafricaine, pour rester crédible et vérifiable.
- **Un seul fichier de page** (`app/page.tsx`) pour l'essentiel du contenu, avec les animations extraites dans des composants dédiés (`components/blood-bag.tsx`, `components/journey-tube.tsx`, `components/animated-headline.tsx`) — voir `CLAUDE.md` pour le détail de l'architecture.

## Méthodologie IA

Voir [`PROMPTS.md`](./PROMPTS.md) pour le détail des outils utilisés, la séquence de prompts, les ajustements manuels et les limites rencontrées.

## Limites connues

- Les données des centres (adresses, horaires, contacts) sont des données de démonstration, à remplacer par des informations officielles avant toute mise en ligne réelle.
- La carte est une représentation indicative ; « Simuler ma position » utilise une position fixe, pas une géolocalisation réelle.
- Le calcul d'éligibilité est simplifié pour les besoins du challenge — la page rappelle qu'un entretien médical professionnel reste nécessaire pour confirmer l'aptitude au don.
