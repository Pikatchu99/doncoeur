# PROMPTS.md

## Outils sollicités

- v0 pour la structuration, la stratégie éditoriale et l’implémentation React/Next.js.
- `GenerateDesignInspiration` pour explorer une direction visuelle originale.
- `agent-browser` pour vérifier le rendu responsive et le parcours du simulateur.

## Séquence des prompts significatifs

1. Définition du sujet HemoLink et des contenus obligatoires du challenge.
2. Création d’un plan produit pour une landing page informative, rassurante et accessible.
3. Validation du plan puis implémentation de la page, du simulateur et du répertoire de centres.
4. Vérification visuelle desktop/mobile et test de l’éligibilité avec un profil valide.

## Ajustements manuels

- Choix d’une direction éditoriale chaleureuse : ivoire, encre brune et rouge sanguin, avec une typographie serif expressive pour les titres.
- Fusion de la cartographie et du répertoire dans une même section afin de rendre la recherche de centre immédiatement actionnable.
- Ajout de données locales pour huit villes et de filtres par ville, type de don et disponibilité.
- Ajout d’états explicites pour les erreurs de saisie, l’éligibilité, la prochaine date possible et l’absence de résultat.
- Ajout d’un menu mobile, d’attributs ARIA pour la FAQ et d’états de focus visibles.

## Limites rencontrées

- La carte est une représentation visuelle indicative et non une carte géographique connectée, conformément au périmètre statique du challenge.
- Les réserves, horaires et coordonnées sont des données de démonstration locales et doivent être remplacées par les informations officielles avant publication.
- Le lint n’a pas pu être exécuté car le binaire ESLint n’est pas présent dans l’environnement, tandis que le build Next.js a été validé.
