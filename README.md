# Orbite Studio : site vitrine 3D

Site vitrine en français, construit avec Vite, React 18, TypeScript strict, React Three Fiber, GSAP, Lenis et Tailwind CSS. Toute la 3D est générée par code (aucune image, aucun modèle, aucun fichier HDR externe).

## Installation

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:5173.

## Scripts

| Commande          | Rôle                                                   |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Serveur de développement Vite                          |
| `npm run build`   | Vérification des types (`tsc -b`) puis build de production |
| `npm run lint`    | ESLint (typescript-eslint, react-hooks, react-refresh) |
| `npm run preview` | Sert le build de production en local                   |

Les versions des dépendances sont figées (sans `^` ni `~`).

## Structure du projet

```
src/
  animations/   hooks GSAP et Lenis (défilement, révélations, compteurs)
  components/   composants d'interface, un par fichier
  config/       marque, design, durées, données des projets
  hooks/        mouvement réduit, capacités de l'appareil
  i18n/         dictionnaire des textes
  lib/          utilitaires purs (validation du formulaire)
  scene/        tout le code three.js, chargé à la demande
  sections/     sections de la page
  styles/       CSS global (grain, grille 12 colonnes)
```

## Architecture de la scène 3D

Le dossier `src/scene` est le seul à importer three.js. Il est chargé après le premier rendu, ce qui garde le bundle initial léger.

- `SceneLoader.tsx` : point d'entrée. Détecte WebGL, attend un moment d'inactivité du navigateur, puis charge `SceneCanvas` avec `React.lazy`. Sans WebGL, ou si le chargement échoue, `FallbackGradient.tsx` affiche un dégradé statique (`SceneErrorBoundary.tsx` capte les erreurs).
- `SceneCanvas.tsx` : `Canvas` R3F, DPR limité à 1.5. Le rendu est suspendu (`frameloop="never"`) quand l'onglet est masqué. Il continue sinon tant que la page est ouverte, la scène étant fixe en arrière-plan.
- `store.ts` : état partagé hors React (progression de défilement, section active, projet survolé, couleur d'accent, fin du loader). La progression est lue directement dans `useFrame` pour ne pas déclencher de rendu React.
- `layout.ts` : poses pilotées par le défilement (cluster, grille, éclatement, rotation).
- `Shapes.tsx` et `Shape.tsx` : les quatre formes, une par projet, en verre ou en métal.
- `deformMaterial.ts` : matériau physique avec déformation de sommets par bruit, activée au survol d'un projet.
- `Particles.tsx` : 2400 particules sur ordinateur, moitié moins sur mobile.
- `Lights.tsx` : environnement de studio procédural (`Lightformer`), deux lumières directionnelles et une lumière d'accent qui change de couleur selon la section.
- `CameraRig.tsx` : parallaxe à la souris et zoom d'entrée à la fin du loader.
- `Effects.tsx` : bloom léger, vignette, aberration chromatique, mappage tonal ACES (identique au chemin sans effets) (décalage inférieur à 0.002). Désactivés sur mobile et sur machines à 4 coeurs ou moins.

## Changer les couleurs

Les couleurs vivent à trois endroits qui doivent rester alignés :

1. `src/config/design.ts` : objet `COLORS` (`bg`, `ink`, `accent`), utilisé par la scène 3D.
2. `tailwind.config.ts` : `theme.extend.colors` (`bg`, `ink`, `accent`, `muted`, `line`), utilisé par les classes Tailwind.
3. `src/styles/global.css` : variables CSS `--bg`, `--ink`, `--accent` en haut du fichier. Le dégradé de repli de `src/scene/FallbackGradient.tsx` et `index.html` (`theme-color`) contiennent aussi la couleur de fond.

Les couleurs d'accent par section sont dans `SECTION_ACCENTS` (`src/scene/store.ts`).

## Modifier les projets

Les données techniques sont dans `src/config/projects.ts` : identifiant, année, couleur et géométrie (`sphere`, `torus`, `box`, `icosahedron`). Les textes (titre, catégorie, description, métriques) sont dans `src/i18n/fr.ts`, sous `work.items`, indexés par le même identifiant.

Pour ajouter un projet, ajoutez une entrée dans les deux fichiers avec le même `id`, puis ajoutez une position dans `CLUSTER` et `GRID` (`src/scene/layout.ts`) et une classe de placement dans `CARD_CLASSES` (`src/sections/Projects.tsx`).

## Changer le nom de marque

Modifiez `BRAND_NAME` et `BRAND_EMAIL` dans `src/config/brand.ts`. Mettez aussi à jour le titre et les balises meta de `index.html`, qui ne peuvent pas importer cette constante.

## Ajouter une langue (i18n)

Tous les textes sont dans `src/i18n/fr.ts`, typés par l'interface `Dictionary`.

1. Créez `src/i18n/en.ts` qui exporte `export const en: Dictionary = { ... }` avec les mêmes clés.
2. Remplacez les imports `fr` par un accès au dictionnaire courant (par exemple un contexte React qui choisit entre `fr` et `en`). Le compilateur signale toute clé manquante grâce à `Dictionary`.
3. Adaptez l'attribut `lang` de `index.html` selon la langue choisie.

## Accessibilité et performance

- `prefers-reduced-motion` est respecté : pas de défilement fluide, animations coupées, formes immobiles.
- Navigation clavier complète, focus visible, panneau de projet avec piège de focus et fermeture par Échap, accordéon ARIA.
- Le formulaire de contact est une démonstration : aucun envoi réel, et le message de succès l'indique. L'état d'erreur n'apparaît que lorsque le navigateur est hors ligne.
- Le panneau de projet est rendu dans `document.body` et bloque aussi Lenis (`setScrollLocked`).

## Déploiement (GitHub Pages)

Le site est publié par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`, ou manuellement via « Run workflow ». Adresse : https://aure58500-pixel.github.io/3dsite/

1. Dans le dépôt GitHub : **Settings → Pages → Source : GitHub Actions**.
2. Poussez sur `main` (ou lancez le workflow depuis l'onglet Actions).

Le chemin de base `/3dsite/` est défini par `base` dans `vite.config.ts`. Si le dépôt est renommé, mettez-le à jour.

Remarque : il n'y a pas encore de `package-lock.json`, donc le workflow utilise `npm install`. Générez le lockfile avec `npm install`, commitez-le, puis remplacez par `npm ci` dans le workflow pour des builds reproductibles.
