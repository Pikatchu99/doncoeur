# PROMPTS.md

## Outils sollicités

- **v0** (Vercel) pour le scaffold initial : structuration de la page, premier jet éditorial, implémentation React/Next.js/Tailwind de base.
- **Claude Code** pour la quasi-totalité du travail qui a suivi : refonte de l'animation hero, itérations de design pilotées par retours visuels (captures d'écran, croquis annotés), logique d'éligibilité, répertoire de centres, accessibilité, performance, tooling (Prettier), configuration git/GitHub, et ce document.

Passage de v0 à Claude Code : v0 est resté au stade du scaffold générique (une landing page correcte mais interchangeable). Le travail de différenciation — l'identité visuelle originale, l'animation de la poche de sang, l'ancrage local Bénin — s'est fait entièrement en session Claude Code, à base d'allers-retours itératifs plutôt que d'un seul prompt.

## Séquence des prompts significatifs

1. **Cadrage initial (v0)** : définition du sujet (don de sang), structuration de la page, premier jet des sections obligatoires.
2. **Correctif d'environnement** : `pnpm dev` ne démarrait pas — un `pnpm-workspace.yaml` global (hors du projet) faisait remonter la racine du workspace jusqu'au dossier utilisateur. Isolé avec un `pnpm-workspace.yaml` local.
3. **Refonte de l'animation hero — round 1** : l'animation CSS d'origine (remplissage de la poche en boucle infinie) jugée irréaliste. Reconstruite en GSAP avec un remplissage unique (au lieu d'une boucle), vagues, bulles, physique de type "ressort".
4. **Refonte de l'animation hero — round 2 (itératif)** : demande d'une poche "posée" plutôt que suspendue à un crochet ; comparaison avec une référence visuelle (illustration de style Shutterstock, bras de donneur) ; arbitrage explicite de ne pas tenter un bras/une main dessinés à la main en SVG (trop risqué sans outil de dessin visuel) au profit de la poche + un tube stylisé. Plusieurs formes de tube tentées et rejetées avant validation : arc ovale simple, tube traversant tout le hero, tube élargi en bannière sous le mot « cœur » (rejeté — jugé "moche"), goutte tombant du logo dans le tube (tentée puis abandonnée, à refaire plus tard avec un outil vectoriel). Coordonnées finales de la courbe ajustées **manuellement dans le code** par le porteur du projet, par petites itérations, plutôt que devinées par l'IA.
5. **Ajout de vraies photographies** (Unsplash, Pexels) dans la section « Pourquoi donner », pour ancrer la page dans du réel plutôt que dans l'illustration seule.
6. **Refonte de la section « Le parcours »** : les 4 étapes utilisaient la même icône pour tout — diversifiées (cœur, bulle de discussion, goutte, soleil). Ajout d'un tube reliant les 4 numéros d'étape avec un effet d'alternance dessus/dessous les cartes ; bug de stacking-context CSS identifié et corrigé (un `z-index` élevé posé *à l'intérieur* d'une carte ne peut pas dépasser un élément *extérieur* à cette carte).
7. **Recentrage des données sur le Bénin** : remplacement de la liste initiale de 6-8 villes panafricaines par des centres à Cotonou, Porto-Novo et Parakou ; mise à jour de la vue par défaut de la carte.
8. **Nettoyage de contenu** : suppression d'un intitulé de section jugé maladroit, correction d'un tiret cadratin, retrait d'une question de formulaire jugée inutile (avec une correction en cours de route : la mauvaise question avait été retirée en premier lieu).
9. **Refonte du footer** : ajout du logo, correction d'un anglicisme ("Built by" → "Conçu par"), restructuration de la barre du bas.
10. **Outillage** : installation de Prettier + `prettier-plugin-tailwindcss`, reformatage de l'ensemble du code (jusque-là condensé sur une ligne par bloc, héritage du scaffold v0).
11. **Audit Lighthouse** : deux photographies faisaient à elles seules plus d'1 Mo (jamais redimensionnées depuis leur export d'origine, 3936×2624 et 2184×2184 px pour un affichage à ~300-500 px) — recompressées (~200 Ko au total). Correctifs d'accessibilité : `<select>` sans label associé, bouton menu sans nom accessible dynamique, accordéons FAQ/menu sans `aria-expanded`.
12. **Relecture face au brief du challenge** (fourni tardivement dans la session) : identification d'écarts de conformité — voir « Limites rencontrées ».
13. **Mise en conformité process** : initialisation du dépôt git, rédaction du README, création et publication du dépôt GitHub public, renommage du projet (le nom « HemoLink » n'était que l'exemple donné par le brief — choix d'un nom original, **DonCœur**).

## Ajustements manuels

- Direction éditoriale chaleureuse : ivoire, encre brune, rouge sang, typographie serif expressive — choix assumé plutôt qu'un thème de composants préconçu.
- Arbitrage de scope sur l'illustration hero : abandon volontaire d'un bras/main dessinés (trop dépendant d'un outil de dessin visuel pour bien rendre), au profit d'une poche + tube stylisés, plus sobres mais fiables à exécuter en SVG codé à la main.
- Ajustement direct des coordonnées de la courbe du tube hero **dans le code**, par le porteur du projet lui-même, plutôt que par prompt — la précision visuelle d'une courbe organique reste plus rapide à régler à la main qu'à décrire en langage naturel.
- Recentrage géographique délibéré (Bénin plutôt que panafricain) pour une identité plus crédible et vérifiable.
- Retrait puis rétablissement d'une question du simulateur d'éligibilité après une incompréhension sur *laquelle* des questions était visée.

## Limites rencontrées

**Avec l'outil (Claude Code) :**
- Aucun outil de dessin visuel disponible pendant la session : chaque courbe SVG a été écrite à l'aveugle (coordonnées tapées à la main), puis vérifiée par capture d'écran automatisée — un cycle nettement plus lent et moins précis qu'un outil vectoriel avec retour visuel en direct. Plusieurs itérations de l'animation hero ont été nécessaires pour cette raison.
- Un croquis annoté à la main transmet une intention (forme, rythme, points de connexion) mais rarement une géométrie exacte — l'interprétation en coordonnées a fait perdre en fidélité, d'où les allers-retours.
- Deux systèmes de coordonnées différents (le logo dans le header, sticky, vs le SVG du hero) ne partagent pas nativement un même repère — la synchronisation logo/tube (finalement abandonnée par choix produit) demandait une mesure DOM à l'exécution, fragile en cas de changement de mise en page.

**Sur le contenu / la conformité (état à date de ce document) :**
- Le répertoire de centres compte actuellement **3 centres** (Cotonou, Porto-Novo, Parakou) — sous le minimum de 8 exigé par le brief. Décision à trancher : remonter à 8+ centres en restant au Bénin (plusieurs villes du pays), ou élargir la zone géographique.
- L'algorithme d'éligibilité applique actuellement les seuils d'âge (18-65) et de poids (≥ 50 kg), mais **n'implémente pas encore** le délai post-don dépendant du sexe (3 mois homme / 4 mois femme) exigé par l'annexe du brief — la question « sexe » ayant été retirée du formulaire en cours de route, cette donnée n'est plus collectée. À revoir.
- La section « État des réserves » (besoins par groupe sanguin, C7 du brief) n'existe pas encore.
- Les états d'absence de résultat (recherche de centre) et d'erreur de saisie (formulaire d'éligibilité) ne sont pas encore explicites dans l'interface.
- La carte est une représentation indicative (tuiles OpenStreetMap), pas un service de géolocalisation connecté ; « Simuler ma position » utilise une position fixe.
- Les horaires, adresses et coordonnées des centres sont des données de démonstration à remplacer par des informations officielles avant toute mise en ligne réelle.
- Déploiement public non encore réalisé au moment de la rédaction de ce document.
