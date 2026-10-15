# SAIF ZELFANI — CREATIVE BENTO STUDIO

Version : 2026 · Site statique HTML/CSS/JavaScript · Compatible GitHub Pages.

## Direction artistique

- Concept : Creative Bento Studio — portfolio d'un Digital Marketer & Creative Designer.
- Palette : encre #16161D, violet #6541F5, citron #D9FA54, ivoire #F5F4EF, tons pastel.
- Accueil : grand bloc typographique, projets Coquette.tn et Losange, galerie asymétrique, méthode, biographie et contact.
- 14 études de cas conservées, dont les campagnes Coquette.tn et les carrousels Losange.
- Filtres combinables : type de projet + marque.
- Aucun résultat commercial chiffré inventé.

## Prérequis

Git et un navigateur. Aucune dépendance npm / Node.js nécessaire.

## Installation sur le PC Windows, branche `redesign-studio-v3`

1. Vérifier que le dossier du repository GitHub est synchronisé et propre.
2. Télécharger l'archive `SAIF_ZELFANI_BENTO_MAJ.zip` dans `Téléchargements`.
3. Extraire son **contenu** à la racine du repository (pas dans un sous-dossier) en remplaçant `index.html` et les pages du dossier `projets`, mais en conservant tous les fichiers existants.
4. Vérifier les changements avec `git status --short` et ouvrir `index.html` localement.
5. Une fois validé : `git add -A`, `git commit -m "Creative Bento Studio redesign"`, `git push -u origin redesign-studio-v3`.
6. Ouvrir une Pull Request de `redesign-studio-v3` vers `main` sur GitHub, puis fusionner seulement après validation. GitHub Pages sur main se mettra alors à jour.

## Retour arrière

Avant le commit : `git restore index.html projets/` puis `git clean -n` pour prévisualiser les nouveaux fichiers non suivis ; ne jamais utiliser `git clean -fd` sans inspecter.

Une fois commité : `git switch main` permet de retrouver la version publique sur une autre branche, sans supprimer le travail expérimental.

## Fonctionnalités

- 14 projets et 4 éléments mis en avant.
- Filtres catégorie + entreprise.
- Navigation mobile avec clavier/Escape.
- Carrousels d'études de cas et visionneuse (scripts existants conservés).
- Bouton de téléchargement du CV.
- Prise de contact par `mailto:` (aucun backend, aucun message envoyé automatiquement).
- Préférence système « Réduire les animations » respectée.

## Fichiers modifiés

- `index.html` — nouvelle page d'accueil.
- `bento.css`, `bento.js`, `bento-case.css` — nouveaux styles et interactions.
- `projets/*/index.html` — 14 pages adaptées avec navigation cohérente.
- `.nojekyll` — désactivation de Jekyll côté GitHub Pages.

Les images, les PDF et les anciens scripts originaux sont conservés.
