interface Metric {
  value: string
  label: string
}

export interface Dictionary {
  loader: { label: string }
  nav: { label: string; home: string; work: string; services: string; about: string; contact: string; skip: string }
  hero: { eyebrow: string; title: string; subtitle: string; cta: string; scroll: string }
  manifesto: { label: string; text: string }
  work: {
    title: string
    intro: string
    open: string
    close: string
    year: string
    panelLabel: string
    items: Record<string, { title: string; category: string; description: string; metrics: Metric[] }>
  }
  services: { title: string; items: { title: string; description: string }[] }
  about: { title: string; text: string; stats: { value: number; suffix: string; label: string }[] }
  contact: {
    title: string
    intro: string
    fields: { name: string; email: string; message: string }
    submit: string
    sending: string
    success: string
    failure: string
    retry: string
    errors: { required: string; email: string; short: string }
  }
  footer: { rights: string }
  fallback: { webgl: string }
}

export const fr: Dictionary = {
  loader: { label: 'Chargement du site' },
  nav: {
    label: 'Navigation principale',
    home: "Retour à l'accueil",
    work: 'Projets',
    services: 'Savoir-faire',
    about: 'Studio',
    contact: 'Contact',
    skip: 'Aller au contenu',
  },
  hero: {
    eyebrow: 'Studio de création numérique',
    title: 'Des expériences web qui prennent de la profondeur',
    subtitle: 'Nous concevons des sites immersifs en 3D, pensés pour être vus, ressentis et retenus.',
    cta: 'Découvrir nos projets',
    scroll: 'Défiler',
  },
  manifesto: {
    label: 'Manifeste',
    text: "Nous croyons qu'un site web ne se contente pas d'afficher une marque. Il lui donne un espace, une matière, une lumière. Chaque détail compte, chaque mouvement raconte quelque chose.",
  },
  work: {
    title: 'Projets sélectionnés',
    intro: 'Quelques réalisations récentes pour des marques qui voient grand.',
    open: 'Voir le projet',
    close: 'Fermer le panneau',
    year: 'Année',
    panelLabel: 'Détails du projet',
    items: {
      aurore: {
        title: 'Aurore',
        category: 'Site de marque',
        description: "Un lancement de produit mis en scène autour d'une lumière changeante.",
        metrics: [
          { value: '+62 %', label: 'de précommandes le jour du lancement' },
          { value: '1,4 s', label: 'de chargement moyen' },
          { value: '98', label: "score d'accessibilité" },
        ],
      },
      nocturne: {
        title: 'Nocturne',
        category: 'Expérience interactive',
        description: "Une exploration sonore et visuelle d'un festival de nuit.",
        metrics: [
          { value: '120 000', label: 'visiteurs en trois jours' },
          { value: '4 min 30', label: 'de temps moyen passé' },
          { value: '92 %', label: 'de sessions sur mobile sans ralentissement' },
        ],
      },
      cristal: {
        title: 'Cristal',
        category: 'Configurateur 3D',
        description: 'Un outil de personnalisation en temps réel pour une maison de joaillerie.',
        metrics: [
          { value: '+38 %', label: 'de taux de conversion' },
          { value: '60 i/s', label: 'sur un mobile milieu de gamme' },
          { value: '14', label: 'finitions de matériaux' },
        ],
      },
      meridien: {
        title: 'Méridien',
        category: 'Récit interactif',
        description: 'Un reportage défilant à travers les fuseaux horaires.',
        metrics: [
          { value: '2,1 M', label: 'de lectures' },
          { value: '24', label: 'fuseaux horaires parcourus' },
          { value: '-45 %', label: 'de taux de rebond' },
        ],
      },
    },
  },
  services: {
    title: 'Savoir-faire',
    items: [
      {
        title: 'Direction artistique',
        description: 'Un univers visuel cohérent, du concept au dernier pixel : identité, typographie, lumière et matière.',
      },
      {
        title: 'Développement 3D',
        description: 'Scènes temps réel optimisées pour tous les écrans, avec une solution de repli quand le WebGL est absent.',
      },
      {
        title: 'Animation et mouvement',
        description: 'Des transitions fluides qui guident le regard, avec une alternative pour les personnes sensibles au mouvement.',
      },
      {
        title: 'Performance et accessibilité',
        description: 'Rapide, lisible et respectueux de chaque visiteur : navigation au clavier, contrastes et sémantique soignés.',
      },
    ],
  },
  about: {
    title: 'Un petit studio, de grandes ambitions',
    text: "Nous sommes une équipe de designers et d'ingénieurs réunis par le goût du détail. Chaque projet est traité comme une pièce unique.",
    stats: [
      { value: 40, suffix: '+', label: 'projets livrés' },
      { value: 8, suffix: '', label: "ans d'expérience" },
      { value: 12, suffix: '', label: 'distinctions' },
    ],
  },
  contact: {
    title: 'Parlons de votre projet',
    intro: 'Décrivez votre idée, nous revenons vers vous sous deux jours ouvrés.',
    fields: { name: 'Nom', email: 'Adresse e-mail', message: 'Votre message' },
    submit: 'Envoyer',
    sending: 'Envoi en cours',
    success: "Démonstration : formulaire validé, aucun message n'a été transmis.",
    failure: "Le message n'a pas pu être envoyé. Vérifiez votre connexion et réessayez.",
    retry: 'Réessayer',
    errors: {
      required: 'Ce champ est obligatoire.',
      email: 'Veuillez saisir une adresse e-mail valide.',
      short: 'Votre message doit contenir au moins 10 caractères.',
    },
  },
  footer: { rights: 'Tous droits réservés.' },
  fallback: { webgl: "La 3D n'est pas disponible sur cet appareil. Le contenu reste accessible." },
}
