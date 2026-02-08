import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'scientific-calculator-fx-991ex',
    name: 'Scientific Calculator FX-991EX',
    price: 15000,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1574607383476-f517f220d398?auto=format&fit=crop&q=80&w=400',
    category: 'Stationery'
  },
  {
    id: '2',
    slug: 'a4-spiral-notebooks-pack-of-3',
    name: 'A4 Spiral Notebooks (Pack of 3)',
    price: 3500,
    rating: 4.5,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400',
    category: 'Stationery'
  },
  {
    id: '3',
    slug: 'premium-local-rice-1kg',
    name: 'Premium Local Rice 1kg',
    price: 2500,
    originalPrice: 2800,
    rating: 4.2,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    category: 'Groceries',
    onSale: true
  },
  {
    id: '4',
    slug: 'fresh-uht-milk-1l',
    name: 'Fresh UHT Milk 1L',
    price: 1800,
    rating: 4.9,
    reviews: 200,
    image: 'https://images.unsplash.com/photo-1550583724-125581cc25fb?auto=format&fit=crop&q=80&w=400',
    category: 'Groceries'
  },
  {
    id: '5',
    slug: 'toilet-paper-4-ply-pack-of-4',
    name: 'Toilet Paper 4-Ply (Pack of 4)',
    price: 2200,
    rating: 4.6,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    category: 'Essentials'
  },
  {
    id: '6',
    slug: 'instant-noodles-chicken-flavor',
    name: 'Instant Noodles (Chicken Flavor)',
    price: 450,
    rating: 5.0,
    reviews: 500,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400',
    category: 'Snacks'
  },
  {
    id: '7',
    slug: 'ballpoint-pens-blue-box-of-10',
    name: 'Ballpoint Pens Blue (Box of 10)',
    price: 1500,
    rating: 4.7,
    reviews: 150,
    image: 'https://images.unsplash.com/photo-1585336139118-132f70e4a7dd?auto=format&fit=crop&q=80&w=400',
    category: 'Stationery'
  },
  {
    id: '8',
    slug: 'antibacterial-bath-soap',
    name: 'Antibacterial Bath Soap',
    price: 800,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400',
    category: 'Personal Care'
  },
  {
    id: '9',
    slug: 'fresh-sliced-bread-white',
    name: 'Fresh Sliced Bread (White)',
    price: 1100,
    rating: 4.8,
    reviews: 300,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    category: 'Groceries'
  },
  {
    id: '10',
    slug: 'energy-drink-500ml',
    name: 'Energy Drink 500ml',
    price: 1200,
    rating: 4.3,
    reviews: 77,
    image: 'https://images.unsplash.com/photo-1622543953495-a9a5a2a46a17?auto=format&fit=crop&q=80&w=400',
    category: 'Drinks'
  }
];

export const CATEGORIES = [
  'All Categories',
  'Stationery',
  'Groceries',
  'Essentials',
  'Snacks',
  'Personal Care',
  'Drinks'
];
