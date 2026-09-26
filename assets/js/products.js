/* =========================================================
   DENTAVIA — Catalogue (single source of truth)
   Loaded before store.js / product.js on every page.
   PRICES ARE PLACEHOLDERS — replace `price` with real DA values.
   ========================================================= */

const PRODUCTS = [
  {
    id: "powder",
    img: "assets/img/powder.jpg",
    name: "Poudre Blanchissante Naturelle",
    subtitle: "Booster de nettoyage en profondeur",
    cat: "Poudre dentifrice",
    tag: "Best-seller",
    price: 2400,
    size: "70 g",
    color: "#3a2472",
    blurb: "Une poudre dentifrice naturelle qui nettoie en profondeur et ravive l'éclat du sourire.",
    overview:
      "La Poudre DentaVia est l'étape « nettoyage profond » de la routine. Sa formule naturelle aide à éliminer les taches de surface et polit délicatement l'émail pour un sourire plus net et plus lumineux — sans agressivité.",
    how: [
      "Aide à éliminer les taches de surface (café, thé, tabac)",
      "Polit délicatement l'émail",
      "Ravive la brillance naturelle des dents",
      "Laisse une sensation de propreté durable",
    ],
    ingredients: [
      { name: "Formule naturelle", benefit: "Nettoyage doux et efficace, respectueux de l'émail" },
      { name: "Agents polissants doux", benefit: "Lissent la surface pour une meilleure réflexion de la lumière" },
      { name: "Agents de fraîcheur", benefit: "Laissent une sensation de bouche propre et fraîche" },
    ],
    benefits: [
      { title: "Nettoyage profond", text: "Élimine la pellicule et les résidus de surface." },
      { title: "Dents blanches", text: "Ravive l'éclat naturel du sourire." },
      { title: "Haleine fraîche", text: "Une sensation de propreté qui dure." },
      { title: "Sourire confiant", text: "Un rituel simple pour un sourire assumé." },
    ],
    usage: "2 à 3 fois par semaine, en complément de votre dentifrice.",
  },

  {
    id: "purple",
    img: "assets/img/purple.jpg",
    name: "Purple Formula V34",
    subtitle: "Sérum correcteur de couleur · blancheur instantanée",
    cat: "Sérum blanchissant",
    tag: "Nouveau",
    price: 2800,
    size: "50 ml",
    color: "#8b3dd6",
    blurb: "La technologie V34 : des pigments violets qui neutralisent les reflets jaunes pour un sourire instantanément plus blanc.",
    overview:
      "Inspirée des techniques de correction de couleur des salons de beauté, la Purple Formula applique la théorie des couleurs complémentaires à votre sourire. Le violet se situe à l'opposé du jaune sur le cercle chromatique : les pigments violets neutralisent visuellement les reflets jaunes pour un sourire plus froid, plus lumineux et plus net — instantanément.",
    how: [
      "Pigments optiques violets : neutralisent le jaune dès la 1ʳᵉ utilisation",
      "Ingrédients blanchissants : réduisent les taches au fil du temps",
      "Agents polissants doux : lissent la surface de l'émail",
      "Agents de fraîcheur : haleine fraîche et sensation de propreté",
    ],
    ingredients: [
      { name: "Pigments violets", benefit: "Correction optique : neutralisent les reflets jaunes instantanément" },
      { name: "Peroxyde d'hydrogène", benefit: "Aide à réduire les taches de surface au fil du temps" },
      { name: "Silice", benefit: "Polissage doux pour une brillance accrue" },
      { name: "Glycérine", benefit: "Texture lisse et confortable à l'application" },
      { name: "Menthol", benefit: "Fraîcheur et sensation de bouche propre" },
    ],
    benefits: [
      { title: "Éclat instantané", text: "Les pigments violets réduisent visiblement le jaune dès l'application." },
      { title: "Blanchiment optique", text: "Une blancheur perçue grâce à la correction de couleur." },
      { title: "Haleine fraîche", text: "Le menthol procure une sensation rafraîchissante." },
      { title: "Anti-taches", text: "Soutient la réduction des taches de surface dans le temps." },
      { title: "Self-care moderne", text: "Transforme le blanchiment en rituel beauté." },
    ],
    usage: "1 à 2 fois par jour — le matin et avant de sortir.",
  },

  {
    id: "pink",
    img: "assets/img/pink.jpg",
    name: "Pink Formula",
    subtitle: "Fraîcheur quotidienne au clou de girofle",
    cat: "Soin quotidien",
    tag: null,
    price: 2800,
    size: "50 ml",
    color: "#e14a9b",
    blurb: "Fraîcheur, confort et entretien de la blancheur au quotidien, inspiré du clou de girofle (Qronfel).",
    overview:
      "La Pink Formula est l'étape d'entretien quotidien de la routine DentaVia. Enrichie aux bienfaits du clou de girofle (Qronfel) — ingrédient traditionnel de soin buccal — elle allie fraîcheur, confort et maintien de la blancheur pour transformer le brossage en un rituel doux et rafraîchissant.",
    how: [
      "Clou de girofle (Qronfel) : fraîcheur et confort buccal",
      "Fluorure de sodium : protège et renforce l'émail",
      "Peroxyde d'hydrogène : entretient la blancheur du sourire",
      "Bicarbonate de sodium : nettoie et neutralise les acides",
    ],
    ingredients: [
      { name: "Clou de girofle (Qronfel)", benefit: "Fraîcheur chaleureuse et confort buccal apaisant" },
      { name: "Fluorure de sodium", benefit: "Renforce l'émail et protège contre les caries" },
      { name: "Peroxyde d'hydrogène", benefit: "Aide à maintenir un sourire éclatant" },
      { name: "Bicarbonate de sodium", benefit: "Nettoie, neutralise les acides, réduit les taches" },
      { name: "Menthol", benefit: "Sensation de fraîcheur et haleine nette" },
    ],
    benefits: [
      { title: "Haleine fraîche", text: "Clou de girofle et menthol pour une fraîcheur durable." },
      { title: "Confort buccal", text: "Un brossage doux et apaisant au quotidien." },
      { title: "Entretien blancheur", text: "Préserve l'éclat obtenu jour après jour." },
      { title: "Protection émail", text: "Le fluorure aide à renforcer les dents." },
      { title: "Confiance au quotidien", text: "Bouche propre, sourire assuré, toute la journée." },
    ],
    usage: "Chaque jour, matin et soir, comme soin d'entretien.",
  },

  {
    id: "duo",
    img: "assets/img/duo.jpg",
    name: "Duo Smile Kit",
    subtitle: "Purple V34 + Pink Formula",
    cat: "Coffret",
    tag: "Duo",
    price: 3800,
    size: "2 × 50 ml",
    color: "#b23bd0",
    blurb: "Les deux Smile Kit réunis : blancheur instantanée avec le Purple V34, fraîcheur et entretien au quotidien avec le Pink.",
    overview:
      "Le duo essentiel pour un sourire éclatant. Le Purple V34 neutralise les reflets jaunes pour une blancheur instantanée, tandis que le Pink entretient la fraîcheur et la blancheur jour après jour. Deux gestes complémentaires, un sourire confiant.",
    how: [
      "Purple V34 : blancheur optique instantanée (matin & avant de sortir)",
      "Pink Formula : fraîcheur et entretien au clou de girofle (chaque jour)",
      "Une routine complète de blanchiment, sans peroxyde agressif",
    ],
    ingredients: [
      { name: "Purple V34", benefit: "Pigments violets qui neutralisent le jaune instantanément" },
      { name: "Pink Formula", benefit: "Clou de girofle, fluorure et fraîcheur au quotidien" },
    ],
    benefits: [
      { title: "Deux formules", text: "Blancheur instantanée + entretien quotidien." },
      { title: "Prix avantageux", text: "Moins cher que les deux kits séparés." },
      { title: "Routine complète", text: "Matin et soir, un sourire éclatant." },
    ],
    usage: "Purple le matin, Pink matin et soir en entretien.",
  },

  {
    id: "routine",
    img: "assets/img/routine.jpg",
    name: "Routine Complète",
    subtitle: "Poudre + Purple + Pink",
    cat: "Coffret",
    tag: "Économie",
    price: 4900,
    size: "3 produits",
    color: "#5a2ba0",
    blurb: "Les trois étapes DentaVia réunies : nettoyage profond, blancheur instantanée et fraîcheur quotidienne.",
    overview:
      "La routine complète pour un sourire éclatant : la Poudre pour un nettoyage profond, la Purple Formula pour une blancheur instantanée, et la Pink Formula pour la fraîcheur et l'entretien au quotidien. Trois rôles complémentaires, un seul rituel.",
    how: [
      "Étape 1 — Poudre : nettoyage profond (2 à 3× / semaine)",
      "Étape 2 — Purple V34 : blancheur instantanée (1 à 2× / jour)",
      "Étape 3 — Pink : fraîcheur & entretien (chaque jour)",
    ],
    ingredients: [
      { name: "Coffret 3 produits", benefit: "La routine DentaVia complète, à prix avantageux" },
    ],
    benefits: [
      { title: "Routine complète", text: "Les trois étapes qui se complètent." },
      { title: "Prix avantageux", text: "Plus économique que les produits séparés." },
      { title: "Résultats optimaux", text: "Nettoyer, blanchir, entretenir." },
    ],
    usage: "Suivez les trois étapes pour des résultats optimaux.",
  },

  {
    id: "mouthwash-mint",
    sku: "0119",
    img: "assets/img/mouthwash-mint.jpg",
    name: "Bain de Bouche White Boost",
    subtitle: "Menthe intense · Sans alcool",
    cat: "Bain de bouche",
    tag: "Nouveau",
    price: 600,
    size: "250 ml",
    color: "#1f4fd8",
    blurb: "Un bain de bouche blanchissant au quotidien, à la menthe intense — 0 % alcool.",
    overview:
      "Le Bain de Bouche White Boost est un soin quotidien conçu pour aider à maintenir un sourire à l'aspect plus blanc, tout en apportant une fraîcheur de menthe intense. Sa formule sans alcool accompagne l'hygiène bucco-dentaire de tous les jours et laisse la bouche propre et rafraîchie.",
    how: [
      "Aide à maintenir un sourire à l'aspect plus blanc",
      "Fraîcheur intense à la menthe",
      "Soin blanchissant à utiliser chaque jour",
      "Formule sans alcool (0 % alcool)",
    ],
    ingredients: [
      { name: "Formule sans alcool", benefit: "Un soin doux, sans sensation de brûlure" },
      { name: "Menthe intense", benefit: "Fraîcheur durable et haleine nette" },
      { name: "Formule dentaire USA", benefit: "Un soin quotidien pensé pour l'hygiène bucco-dentaire" },
    ],
    benefits: [
      { title: "Sourire plus blanc", text: "Aide à maintenir l'éclat du sourire au quotidien." },
      { title: "Fraîcheur intense", text: "Une sensation de menthe qui dure." },
      { title: "Soin quotidien", text: "Un geste simple à ajouter à votre routine." },
      { title: "0 % alcool", text: "Une formule douce pour la bouche." },
    ],
    usage: "Chaque jour après le brossage. Ne pas avaler.",
  },

  {
    id: "mouthwash-strawberry",
    sku: "0129",
    img: "assets/img/mouthwash-strawberry.jpg",
    name: "Bain de Bouche Anti-bactérien",
    subtitle: "Fraise-menthe · Sans alcool",
    cat: "Bain de bouche",
    tag: "Nouveau",
    price: 600,
    size: "250 ml",
    color: "#c72a8a",
    blurb: "Un bain de bouche antibactérien au quotidien, fraîcheur longue durée, saveur fraise-menthe — 0 % alcool.",
    overview:
      "Le Bain de Bouche Anti-bactérien accompagne l'hygiène bucco-dentaire de tous les jours et procure une fraîcheur longue durée. Sa saveur fraise-menthe laisse la bouche propre, fraîche et confortable, sans alcool.",
    how: [
      "Protection antibactérienne au quotidien",
      "Haleine fraîche",
      "Fraîcheur longue durée",
      "Saveur fraise-menthe, formule sans alcool (0 % alcool)",
    ],
    ingredients: [
      { name: "Formule sans alcool", benefit: "Un soin doux, sans sensation de brûlure" },
      { name: "Fraise-menthe", benefit: "Une saveur fruitée et rafraîchissante" },
      { name: "Formule dentaire USA", benefit: "Un soin quotidien pensé pour l'hygiène bucco-dentaire" },
    ],
    benefits: [
      { title: "Protection antibactérienne", text: "Soutient l'hygiène bucco-dentaire de tous les jours." },
      { title: "Haleine fraîche", text: "Une bouche propre et rafraîchie." },
      { title: "Fraîcheur longue durée", text: "Une sensation de fraîcheur qui dure." },
      { title: "0 % alcool", text: "Une formule douce pour la bouche." },
    ],
    usage: "Chaque jour après le brossage. Ne pas avaler.",
  },

  {
    id: "mouthwash-pack",
    sku: "0118",
    img: "assets/img/mouthwash-pack.jpg",
    name: "Pack Bain de Bouche",
    subtitle: "White Boost + Anti-bactérien",
    cat: "Coffret",
    tag: "Pack",
    price: 1200,
    size: "2 × 250 ml",
    color: "#7a3fb0",
    blurb: "Les deux bains de bouche DentaVia réunis : blancheur à la menthe intense et protection antibactérienne fraise-menthe.",
    overview:
      "Le pack complet pour une bouche fraîche au quotidien : le White Boost à la menthe intense aide à maintenir un sourire à l'aspect plus blanc, et l'Anti-bactérien à la fraise-menthe apporte protection et fraîcheur longue durée. Deux bains de bouche sans alcool, pour toute la famille.",
    how: [
      "White Boost (menthe intense) : soin blanchissant quotidien",
      "Anti-bactérien (fraise-menthe) : protection et fraîcheur longue durée",
      "Deux formules sans alcool (0 % alcool)",
    ],
    ingredients: [
      { name: "White Boost", benefit: "Menthe intense, aide à maintenir un sourire plus blanc" },
      { name: "Anti-bactérien", benefit: "Fraise-menthe, protection antibactérienne et haleine fraîche" },
    ],
    benefits: [
      { title: "Deux bains de bouche", text: "Blancheur à la menthe + protection à la fraise-menthe." },
      { title: "0 % alcool", text: "Des formules douces pour la bouche." },
      { title: "Fraîcheur toute la journée", text: "Une haleine fraîche et une bouche propre." },
    ],
    usage: "Chaque jour après le brossage. Ne pas avaler.",
  },
];

/* Shared helpers */
const fmt = (n) => n.toLocaleString("fr-DZ") + " DA";
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
const imgOf = (p) => p.img || `assets/img/${p.id}.png`;
const isPhoto = (src) => /\.(jpe?g|webp|avif)$/i.test(src || "");
const mediaClass = (p) => (isPhoto(imgOf(p)) ? " is-photo" : "");
