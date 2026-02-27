export type FiberType = "Alpaca" | "Mohair" | "Cashmere" | "Merino" | "Silk" | "Angora" | "Linen" | "Cotton" | "Blend";
export type YarnWeight = "Lace" | "Fingering" | "Sport" | "DK" | "Worsted" | "Bulky";

export interface Product {
  id: string;
  name: string;
  fiber: FiberType;
  weight: YarnWeight;
  color: string;
  colorHex: string;
  origin: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  yardage: number;
  coneWeight: string;
  careInstructions: string;
  description: string;
}

export const categories: { name: FiberType; description: string; image: string }[] = [
  { name: "Alpaca", description: "Luxuriously soft & warm", image: "https://images.unsplash.com/photo-1560481234-1b8aa0f92a32?w=400&h=400&fit=crop" },
  { name: "Merino", description: "Versatile & ultra-fine", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop" },
  { name: "Cashmere", description: "The ultimate luxury", image: "https://images.unsplash.com/photo-1601731603247-7c9e1e155467?w=400&h=400&fit=crop" },
  { name: "Silk", description: "Luminous drape & sheen", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop" },
  { name: "Mohair", description: "Airy halo & warmth", image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=400&h=400&fit=crop" },
  { name: "Cotton", description: "Breathable & crisp", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop" },
  { name: "Linen", description: "Natural texture & strength", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&h=400&fit=crop" },
  { name: "Blend", description: "Best of multiple fibers", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Baby Alpaca",
    fiber: "Alpaca",
    weight: "DK",
    color: "Natural Cream",
    colorHex: "#F5F0E8",
    origin: "Peru",
    price: 34.00,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=600&fit=crop",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    isBestseller: true,
    yardage: 875,
    coneWeight: "200g",
    careInstructions: "Hand wash cold, lay flat to dry",
    description: "Exceptionally soft baby alpaca yarn spun on generous cones. Perfect for garments that demand both luxury and practicality."
  },
  {
    id: "2",
    name: "Kidsilk Mohair",
    fiber: "Mohair",
    weight: "Lace",
    color: "Dusty Rose",
    colorHex: "#C9A0A0",
    origin: "South Africa",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=600&fit=crop",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    isNew: true,
    yardage: 1200,
    coneWeight: "100g",
    careInstructions: "Hand wash cold, do not wring",
    description: "Ethereal kidsilk mohair with a beautiful halo effect. Ideal for lightweight shawls and layering pieces."
  },
  {
    id: "3",
    name: "Mongolian Cashmere",
    fiber: "Cashmere",
    weight: "Fingering",
    color: "Camel",
    colorHex: "#C4A882",
    origin: "Mongolia",
    price: 68.00,
    originalPrice: 78.00,
    image: "https://images.unsplash.com/photo-1601731603247-7c9e1e155467?w=600&h=600&fit=crop",
    rating: 5.0,
    reviews: 64,
    inStock: true,
    isBestseller: true,
    yardage: 650,
    coneWeight: "100g",
    careInstructions: "Dry clean or hand wash with cashmere shampoo",
    description: "Grade A Mongolian cashmere, incredibly fine and soft. The pinnacle of luxury knitting yarns."
  },
  {
    id: "4",
    name: "Superfine Merino",
    fiber: "Merino",
    weight: "Sport",
    color: "Sage Green",
    colorHex: "#8B9E7C",
    origin: "Australia",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1560481234-1b8aa0f92a32?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    yardage: 750,
    coneWeight: "200g",
    careInstructions: "Machine wash gentle cold, tumble dry low",
    description: "19.5 micron superfine merino, bouncy and resilient. A workhorse yarn that knits beautifully."
  },
  {
    id: "5",
    name: "Mulberry Silk",
    fiber: "Silk",
    weight: "Fingering",
    color: "Pearl",
    colorHex: "#EDE8E0",
    origin: "China",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    isNew: true,
    yardage: 900,
    coneWeight: "150g",
    careInstructions: "Hand wash cold, press with cool iron",
    description: "Pure mulberry silk with incredible luster and drape. Creates stunning evening wear and accessories."
  },
  {
    id: "6",
    name: "French Angora",
    fiber: "Angora",
    weight: "DK",
    color: "Snow White",
    colorHex: "#FAFAF7",
    origin: "France",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=600&fit=crop",
    rating: 4.6,
    reviews: 38,
    inStock: false,
    yardage: 500,
    coneWeight: "100g",
    careInstructions: "Hand wash cold, reshape and dry flat",
    description: "Ethically sourced French angora with an incredibly soft halo. Limited availability."
  },
  {
    id: "7",
    name: "Belgian Linen",
    fiber: "Linen",
    weight: "Sport",
    color: "Natural Flax",
    colorHex: "#D4C9A8",
    origin: "Belgium",
    price: 22.00,
    image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=600&fit=crop",
    rating: 4.5,
    reviews: 91,
    inStock: true,
    yardage: 600,
    coneWeight: "200g",
    careInstructions: "Machine wash, improves with each wash",
    description: "Premium Belgian wet-spun linen. Crisp and cool, perfect for summer garments and home textiles."
  },
  {
    id: "8",
    name: "Egyptian Giza Cotton",
    fiber: "Cotton",
    weight: "Worsted",
    color: "Terracotta",
    colorHex: "#C17747",
    origin: "Egypt",
    price: 19.00,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=600&fit=crop",
    rating: 4.7,
    reviews: 145,
    inStock: true,
    isBestseller: true,
    yardage: 550,
    coneWeight: "250g",
    careInstructions: "Machine wash warm, tumble dry medium",
    description: "Extra-long staple Giza cotton for exceptional softness and stitch definition."
  },
  {
    id: "9",
    name: "Silk-Cashmere Blend",
    fiber: "Blend",
    weight: "Fingering",
    color: "Midnight Blue",
    colorHex: "#2C3E50",
    origin: "Italy",
    price: 56.00,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&h=600&fit=crop",
    rating: 4.9,
    reviews: 72,
    inStock: true,
    isNew: true,
    yardage: 700,
    coneWeight: "150g",
    careInstructions: "Hand wash cold with luxury detergent",
    description: "70% cashmere, 30% silk blend from an Italian mill. Unparalleled softness with silk's luminous sheen."
  },
];
