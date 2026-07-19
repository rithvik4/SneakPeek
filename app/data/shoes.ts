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
    id: "zoom-winflo-8",
    brand: "NIKE",
    model: "Zoom Winflo 8",
    nickname: "Zoom Winflo",
    releaseYear: 2021,
    purchaseDate: "2023-07-09",
    purchaseLocation: "Nike Store",
    retailPrice: "$110",
    currentValue: "$95",
    comfort: 4.3,
    style: 4.0,
    condition: "Good",
    favoriteOutfit: "Training shorts and white tee",
    firstTimeWorn: "Morning treadmill session",
    collectionLabel: "Zoom Winflo",
    category: "Running",
    bought: "09 JULY 2023",
    size: "9 UK 8",
    story: "A daily runner that still looks fast sitting on the shelf.",
    material: "Mesh & synthetic",
    detailColorSwatches: ["#ffffff", "#111111", "#2c2f37"],
    gallery: ["/images/jordan-1-1.svg"],
    hotspots: [],
    boxColor: "#12151f",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "NIKE",
    sideMark: "◜",
    pattern: "none",
    patternColor: "#ffffff",
    shoeAccentStart: "#ff6e6e",
    shoeAccentEnd: "#ff2f92",
    logoColor: "#3f3f46"
  },
  {
    id: "gazelle",
    brand: "ADIDAS",
    model: "Gazelle",
    nickname: "Gazelle",
    releaseYear: 2024,
    purchaseDate: "2024-04-12",
    purchaseLocation: "Adidas Outlet",
    retailPrice: "$100",
    currentValue: "$105",
    comfort: 4.0,
    style: 4.5,
    condition: "Excellent",
    favoriteOutfit: "Blue denim and cream polo",
    firstTimeWorn: "Weekend cafe meet",
    collectionLabel: "Gazelle",
    category: "Lifestyle",
    bought: "12 APRIL 2024",
    size: "9 UK 8",
    story: "The bright blue box that makes the whole stack pop.",
    material: "Suede & textile",
    detailColorSwatches: ["#ffffff", "#3d68ee", "#111111"],
    gallery: ["/images/dunk-1.svg"],
    hotspots: [],
    boxColor: "#3d68ee",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "ADIDAS",
    sideMark: "▲",
    pattern: "adidas-stripes",
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
    model: "Future Rider",
    nickname: "Future Rider",
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
    collectionLabel: "Future Rider",
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
    id: "ashin-modern",
    brand: "NIKE",
    model: "Ashin Modern",
    nickname: "Ashin Modern",
    releaseYear: 2022,
    purchaseDate: "2022-05-03",
    purchaseLocation: "Nike Factory Outlet",
    retailPrice: "$85",
    currentValue: "$70",
    comfort: 3.9,
    style: 4.1,
    condition: "Good",
    favoriteOutfit: "Olive trousers and black overshirt",
    firstTimeWorn: "Office casual Friday",
    collectionLabel: "Ashin Modern",
    category: "Casual",
    bought: "03 MAY 2022",
    size: "9 UK 8",
    story: "Quiet, dark, and understated. The box says exactly what the shoe does.",
    material: "Textile",
    detailColorSwatches: ["#ffffff", "#111111", "#2c4741"],
    gallery: ["/images/yeezy-2.svg"],
    hotspots: [],
    boxColor: "#2c4741",
    boxTextColor: "#ffffff",
    boxLabelColor: "#ffffff",
    lidText: "NIKE",
    sideMark: "◜",
    pattern: "none",
    patternColor: "#ffffff",
    shoeAccentStart: "#d9d9d9",
    shoeAccentEnd: "#8d8d8d",
    logoColor: "#1f2937"
  }
];
