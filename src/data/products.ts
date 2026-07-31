import imgCodeViolet from "../assets/products/produit-vif-code-violet.png";
import imgVintageIntense from "../assets/products/produit-vif-vintage-intense.png";
import imgTagParfum from "../assets/products/produit-vif-tag-parfum.png";
import imgDreamSweet from "../assets/products/produit-vif-gel-douche-dream-sweet.png";
import imgFloralBath from "../assets/products/produit-vif-gel-douche-floral-bath.png";
import imgGrandBleu from "../assets/products/produit-vif-gel-douche-grand-bleu.png";
import imgBbCream from "../assets/products/produit-vif-bb-cream.png";
import imgConcentreHydratant from "../assets/products/produit-vif-concentre-hydratant-ageless.png";
import imgCoffretSoinIntime from "../assets/products/produit-vif-coffret-soin-intime.png";

export const categories = [
  { slug: "tous", label: "Tous" },
  { slug: "parfums", label: "Parfums" },
  { slug: "bain-corps", label: "Bain & Corps" },
  { slug: "soins-visage", label: "Soins Visage" },
  { slug: "soins-intimes", label: "Soins Intimes" },
];

export const products = [
  {
    slug: "vif-code-violet",
    name: "VIF Code Violet",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Un floral poudré et féminin, pour une signature tout en douceur.",
    longDesc:
      "Un floral poudré et féminin, pensé comme une signature discrète mais mémorable. Un sillage tout en douceur, à porter au quotidien comme dans les grandes occasions.",
    img: imgCodeViolet,
    feature: false,
  },
  {
    slug: "vif-vintage-intense",
    name: "VIF Vintage Intense",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Une fragrance florale et boisée à l'élégance intemporelle, pensée pour lui.",
    longDesc:
      "Une fragrance florale et boisée à l'élégance intemporelle, pensée pour lui. Un flacon présenté dans un écrin soigné, aussi élégant à offrir qu'à porter.",
    img: imgVintageIntense,
    feature: true,
  },
  {
    slug: "vif-tag",
    name: "VIF #TAG",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Une brume légère qui parfume cheveux et peau en un geste, fraîcheur immédiate.",
    longDesc:
      "Une brume légère à vaporiser sur cheveux et peau en un geste, pour une fraîcheur immédiate et un parfum qui accompagne la journée sans jamais peser.",
    img: imgTagParfum,
    feature: false,
  },
  {
    slug: "gel-douche-dream-sweet",
    name: "Gel Douche Dream Sweet",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche gourmand et sucré, pour un moment de douceur sous la douche.",
    longDesc:
      "Un gel douche gourmand et sucré qui nettoie en douceur tout en laissant la peau délicatement parfumée. Un vrai moment de détente à chaque douche.",
    img: imgDreamSweet,
    feature: false,
  },
  {
    slug: "gel-douche-floral-bath",
    name: "Gel Douche Floral Bath",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche fleuri et léger, pour une peau fraîche et délicatement parfumée.",
    longDesc:
      "Un gel douche fleuri et léger, à la mousse onctueuse, pour une peau fraîche et délicatement parfumée du matin au soir.",
    img: imgFloralBath,
    feature: false,
  },
  {
    slug: "gel-douche-grand-bleu",
    name: "Gel Douche Grand Bleu",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche marin et vivifiant, pensé pour lui.",
    longDesc:
      "Un gel douche marin et vivifiant, pensé pour lui, avec un sillage frais inspiré du grand large. Idéal pour bien commencer la journée.",
    img: imgGrandBleu,
    feature: false,
  },
  {
    slug: "bb-cream",
    name: "BB Cream",
    category: "soins-visage",
    categoryLabel: "Soins Visage",
    desc: "Un soin teinté qui unifie le teint et protège au quotidien.",
    longDesc:
      "Un soin teinté qui unifie le teint et protège la peau au quotidien, pour un fini naturel et frais dès le matin.",
    img: imgBbCream,
    feature: false,
  },
  {
    slug: "concentre-hydratant-ageless",
    name: "Concentré Hydratant Ageless",
    category: "soins-visage",
    categoryLabel: "Soins Visage",
    desc: "Un concentré anti-âge qui hydrate en profondeur pour un teint repulpé et lumineux.",
    longDesc:
      "Un concentré anti-âge qui hydrate en profondeur, pour un teint repulpé, plus lumineux et une peau visiblement plus souple au fil de son utilisation.",
    img: imgConcentreHydratant,
    feature: false,
  },
  {
    slug: "coffret-soin-intime",
    name: "Coffret Soin Intime",
    category: "soins-intimes",
    categoryLabel: "Soins Intimes",
    desc: "Un rituel d'hygiène intime complet, formulé avec douceur, réuni dans un coffret dédié.",
    longDesc:
      "Un rituel d'hygiène intime complet, formulé avec douceur et réuni dans un coffret dédié — l'essentiel d'une routine intime confortable au quotidien, prêt à offrir ou à s'offrir.",
    img: imgCoffretSoinIntime,
    feature: true,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: (typeof products)[number], count = 3) {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, count);
}
