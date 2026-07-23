export type ShoeBoxPattern = "none" | "adidas-stripes" | "fila-bars" | "bottom-band" | "converse-badge";

export type ShoeHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  details: string[];
};

export type Sneaker = {
  id: string;
  brand: string;
  model: string;
  nickname: string;
  releaseYear: number;
  purchaseDate: string;
  purchaseLocation: string;
  retailPrice: string;
  currentValue: string;
  comfort: number;
  style: number;
  condition: string;
  favoriteOutfit: string;
  firstTimeWorn: string;
  collectionLabel: string;
  category: string;
  bought: string;
  size: string;
  story: string;
  material?: string;
  detailColorSwatches?: string[];
  gallery: string[];
  detailShoeImage?: string;
  detailOpenBoxImage?: string;
  detailClosedBoxImage?: string;
  model3D?: string;
  boxTexture?: string;
  hotspots: ShoeHotspot[];
  boxColor: string;
  boxTextColor: string;
  boxLabelColor: string;
  lidText: string;
  sideMark: string;
  pattern: ShoeBoxPattern;
  patternColor: string;
  accentBarColor?: string;
  shoeAccentStart: string;
  shoeAccentEnd: string;
  logoColor: string;
};

export const shoes: Sneaker[] = [
  {
    id: "dunk-low",
    brand: "NIKE",
    model: "Dunk Low",
    nickname: "Dunk Low",
    releaseYear: 2022,
    purchaseDate: "2022-08-14",
    purchaseLocation: "Nike Store",
    retailPrice: "$110",
    currentValue: "$125",
    comfort: 4.1,
    style: 4.7,
    condition: "Excellent",
    favoriteOutfit: "Cream cargos and an oversized white tee",
    firstTimeWorn: "Weekend city walk",
    collectionLabel: "Dunk Low",
    category: "Lifestyle",
    bought: "US Kansas (2025)",
    size: "US 7.5/UK 8",
    story: "One of the most recognizable sneakers in the game. Great for daily wear and outfit versatility, but not the best choice if you're looking for maximum comfort on long walks.",
    material: "Leather & rubber",
    detailColorSwatches: ["#ffffff", "#7b2137"],
    gallery: ["/images/nike-shoe.png", "/images/nike-shoe.png", "/images/nike-shoe.png"],
    detailShoeImage: "/images/nike-shoe.png",
    detailOpenBoxImage: "/images/nike-box-open.png",
    detailClosedBoxImage: "/images/nike-box.png",
    hotspots: [],
    boxColor: "#c75f34",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "NIKE",
    sideMark: "◜",
    pattern: "none",
    patternColor: "#ffffff",
    shoeAccentStart: "#ffffff",
    shoeAccentEnd: "#7b2137",
    logoColor: "#7b2137"
  },
  {
    id: "new-balance-1906r",
    brand: "NEW BALANCE",
    model: "1906R",
    nickname: "1906R",
    releaseYear: 2024,
    purchaseDate: "2024-05-18",
    purchaseLocation: "New Balance Store",
    retailPrice: "$155",
    currentValue: "$160",
    comfort: 4.7,
    style: 4.6,
    condition: "Excellent",
    favoriteOutfit: "Gray cargos and a black hoodie",
    firstTimeWorn: "City day out",
    collectionLabel: "1906R",
    category: "Lifestyle / Running",
    bought: "18 MAY 2024",
    size: "UK 8.5",
    story: "A tech-runner look that feels modern, sharp, and easy to wear every day.",
    material: "Mesh, synthetic & rubber",
    detailColorSwatches: ["#f2f2f2", "#5f6670", "#111111"],
    gallery: [
      "/images/new balance shoe.png",
      "/images/new balance shoe.png",
      "/images/new balance shoe.png"
    ],
    detailShoeImage: "/images/new balance shoe.png",
    detailOpenBoxImage: "/images/New balance box open.png",
    detailClosedBoxImage: "/images/new-balance-box-1.png",
    hotspots: [],
    boxColor: "#5f6670",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "NEW BALANCE",
    sideMark: "NB",
    pattern: "none",
    patternColor: "#ffffff",
    shoeAccentStart: "#d9d9d9",
    shoeAccentEnd: "#8d8d8d",
    logoColor: "#111111"
  },
  {
    id: "converse-chuck-70",
    brand: "CONVERSE",
    model: "Chuck 70",
    nickname: "All Star",
    releaseYear: 2023,
    purchaseDate: "2023-09-22",
    purchaseLocation: "Converse Store",
    retailPrice: "$95",
    currentValue: "$100",
    comfort: 4.0,
    style: 4.6,
    condition: "Good",
    favoriteOutfit: "Relaxed denim and white oxford shirt",
    firstTimeWorn: "Weekend downtown walk",
    collectionLabel: "Chuck 70",
    category: "Lifestyle/ Casual",
    bought: " IN India (2022)",
    size: "UK 8",
    story: "Minimal, iconic, and endlessly wearable. It's the pair you reach for when you don't want to think twice about your outfit.",
    material: "Canvas & rubber",
    detailColorSwatches: ["#ffffff", "#111111"],
    gallery: [
      "/images/58c7326f5e314f82aa1a4616d5885ad0-removebg-preview.png",
      "/images/58c7326f5e314f82aa1a4616d5885ad0-removebg-preview.png",
      "/images/58c7326f5e314f82aa1a4616d5885ad0-removebg-preview.png"
    ],
    detailShoeImage: "/images/58c7326f5e314f82aa1a4616d5885ad0-removebg-preview.png",
    detailOpenBoxImage: "/images/Gemini_Generated_Image_vkka5wvkka5wvkka-removebg-preview.png",
    detailClosedBoxImage: "/images/converse-box-transparent.png",
    hotspots: [],
    boxColor: "#ab8a62",
    boxTextColor: "#2a1d17",
    boxLabelColor: "#f5efe4",
    lidText: "CONVERSE",
    sideMark: "CONVERSE",
    pattern: "converse-badge",
    patternColor: "#4a2f26",
    shoeAccentStart: "#d9d9d9",
    shoeAccentEnd: "#ffffff",
    logoColor: "#1f2937"
  },
  {
    id: "future-rider",
    brand: "PUMA",
    model: "Fade Pro",
    nickname: "Fade Pro",
    releaseYear: 2024,
    purchaseDate: "2024-01-17",
    purchaseLocation: "Puma Store",
    retailPrice: "$95",
    currentValue: "$92",
    comfort: 4.2,
    style: 4.3,
    condition: "Excellent",
    favoriteOutfit: "Black joggers and varsity jacket",
    firstTimeWorn: "Airport fit",
    collectionLabel: "Fade Pro",
    category: "Lifestyle",
    bought: "17 JANUARY 2024",
    size: "9 UK 8",
    story: "The red box is loud enough that it earns a place even when closed.",
    material: "Nylon & suede",
    detailColorSwatches: ["#ffffff", "#d7262d", "#1a1a1a"],
    gallery: ["/images/yeezy-1.svg"],
    hotspots: [],
    boxColor: "#d7262d",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "PUMA",
    sideMark: "PUMA",
    pattern: "bottom-band",
    patternColor: "#7dd8ef",
    shoeAccentStart: "#7dd8ef",
    shoeAccentEnd: "#ffffff",
    logoColor: "#ffffff"
  },
  {
    id: "adidas-samba",
    brand: "ADIDAS",
    model: "Samba",
    nickname: "Samba",
    releaseYear: 2024,
    purchaseDate: "2024-06-11",
    purchaseLocation: "Adidas Store",
    retailPrice: "$100",
    currentValue: "$120",
    comfort: 4.2,
    style: 4.6,
    condition: "Excellent",
    favoriteOutfit: "Loose denim and a clean white tee",
    firstTimeWorn: "Weekend coffee run",
    collectionLabel: "Samba",
    category: "Lifestyle",
    bought: "11 JUNE 2024",
    size: "9 UK 8",
    story: "A terrace classic that stays sharp, versatile, and easy to style every day.",
    material: "Leather, suede & rubber",
    detailColorSwatches: ["#ffffff", "#1d64a8", "#111111"],
    gallery: ["/images/adidas-samba.png"],
    hotspots: [],
    boxColor: "#1d64a8",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "ADIDAS",
    sideMark: "▲",
    pattern: "adidas-stripes",
    patternColor: "#ffffff",
    shoeAccentStart: "#d9d9d9",
    shoeAccentEnd: "#8d8d8d",
    logoColor: "#111111"
  }
];
