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
    name: "VIF Code Violet",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Un floral poudré et féminin, pour une signature tout en douceur.",
    img: imgCodeViolet,
    feature: false,
  },
  {
    name: "VIF Vintage Intense",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Une fragrance florale et boisée à l'élégance intemporelle, pensée pour lui.",
    img: imgVintageIntense,
    feature: true,
  },
  {
    name: "VIF #TAG",
    category: "parfums",
    categoryLabel: "Parfums",
    desc: "Une brume légère qui parfume cheveux et peau en un geste, fraîcheur immédiate.",
    img: imgTagParfum,
    feature: false,
  },
  {
    name: "Gel Douche Dream Sweet",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche gourmand et sucré, pour un moment de douceur sous la douche.",
    img: imgDreamSweet,
    feature: false,
  },
  {
    name: "Gel Douche Floral Bath",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche fleuri et léger, pour une peau fraîche et délicatement parfumée.",
    img: imgFloralBath,
    feature: false,
  },
  {
    name: "Gel Douche Grand Bleu",
    category: "bain-corps",
    categoryLabel: "Bain & Corps",
    desc: "Un gel douche marin et vivifiant, pensé pour lui.",
    img: imgGrandBleu,
    feature: false,
  },
  {
    name: "BB Cream",
    category: "soins-visage",
    categoryLabel: "Soins Visage",
    desc: "Un soin teinté qui unifie le teint et protège au quotidien.",
    img: imgBbCream,
    feature: false,
  },
  {
    name: "Concentré Hydratant Ageless",
    category: "soins-visage",
    categoryLabel: "Soins Visage",
    desc: "Un concentré anti-âge qui hydrate en profondeur pour un teint repulpé et lumineux.",
    img: imgConcentreHydratant,
    feature: false,
  },
  {
    name: "Coffret Soin Intime",
    category: "soins-intimes",
    categoryLabel: "Soins Intimes",
    desc: "Un rituel d'hygiène intime complet, formulé avec douceur, réuni dans un coffret dédié.",
    img: imgCoffretSoinIntime,
    feature: true,
  },
];
