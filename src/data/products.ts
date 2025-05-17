export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  artisan: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  occasions: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "wooden-planter1",
    name: "Handcrafted Wooden Planter",
    price: 34.99,
    description: "Beautiful handcrafted wooden planter, perfect for small indoor plants. Made with sustainable materials and finished with non-toxic paint.",
    artisan: "Emma's Crafts",
    rating: 4,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    occasions: ["housewarming", "just-because"]
  },
  {
    id: "ceramic-mug1",
    name: "Hand-Painted Ceramic Mug",
    price: 19.99,
    description: "Unique hand-painted ceramic mug. Each piece features original artwork and is one-of-a-kind. Dishwasher and microwave safe.",
    artisan: "Pablo's Pottery",
    rating: 5,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    occasions: ["birthday", "just-because"]
  },
  {
    id: "leather-wallet1",
    name: "Handstitched Leather Wallet",
    price: 49.99,
    description: "Premium handstitched leather wallet with multiple card slots and a coin compartment. Made from genuine locally sourced leather.",
    artisan: "Maria's Leather Goods",
    rating: 4,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    occasions: ["birthday", "anniversary"]
  },
  {
    id: "scented-candle1",
    name: "Natural Soy Wax Candle",
    price: 24.99,
    description: "Hand-poured soy wax candle with natural essential oils. Long-lasting and clean burning with a delightful lavender scent.",
    artisan: "Candle Crafters",
    rating: 5,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1603006905393-c279c0681c45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    occasions: ["date-night", "just-because"]
  },
  {
    id: "woven-basket1",
    name: "Traditional Woven Basket",
    price: 39.99,
    description: "Handwoven basket made with natural fibers. Perfect for storage or as a decorative piece. Each basket follows traditional weaving techniques.",
    artisan: "Weaving Wonders",
    rating: 4,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1616486788371-62d930495c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    occasions: ["housewarming", "just-because"]
  },
  {
    id: "knitted-blanket1",
    name: "Hand-Knitted Throw Blanket",
    price: 79.99,
    description: "Cozy hand-knitted throw blanket made from premium merino wool. Perfect for keeping warm on chilly evenings.",
    artisan: "Knit & Purl Studio",
    rating: 5,
    reviews: 27,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    occasions: ["anniversary", "just-because"]
  },
  {
    id: "wine-set1",
    name: "Handcrafted Wine Accessory Set",
    price: 59.99,
    description: "Elegant wine accessory set including a wooden wine stopper, aerator, and drip ring. Perfect for wine enthusiasts.",
    artisan: "Woodwork Wonders",
    rating: 5,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1586370434639-0fe43b4782ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Kitchen",
    occasions: ["date-night", "anniversary"]
  },
  {
    id: "chocolate-box1",
    name: "Artisanal Chocolate Box",
    price: 29.99,
    description: "Luxury handmade chocolates featuring local ingredients and unique flavor combinations. Beautifully packaged in a gift box.",
    artisan: "Sweet Delights",
    rating: 5,
    reviews: 48,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Food",
    occasions: ["date-night", "birthday", "anniversary"]
  },
  {
    id: "rose-bouquet1",
    name: "Hand-Tied Rose Bouquet",
    price: 49.99,
    description: "Beautiful arrangement of fresh roses hand-tied with decorative ribbon. Perfect expression of love and appreciation.",
    artisan: "Paper & Petals",
    rating: 4,
    reviews: 36,
    image: "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Flowers",
    occasions: ["date-night", "anniversary"]
  },
  {
    id: "picnic-basket1",
    name: "Complete Picnic Basket Set",
    price: 89.99,
    description: "Fully equipped wicker picnic basket with plates, cutlery, and wine glasses for two. Perfect for romantic outdoor dates.",
    artisan: "Weaving Wonders",
    rating: 5,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Outdoor",
    occasions: ["date-night"]
  },
  {
    id: "custom-bracelet1",
    name: "Personalized Name Bracelet",
    price: 39.99,
    description: "Handcrafted bracelet that can be customized with a name or special date. Made with sterling silver and available in gold or silver finish.",
    artisan: "Jewelry Artisans Co.",
    rating: 5,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1573408301828-139ef0b7e414?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Jewelry",
    occasions: ["birthday", "anniversary"]
  },
  {
    id: "spa-kit1",
    name: "Handmade Spa Gift Set",
    price: 44.99,
    description: "Complete spa kit with handmade soap, bath bombs, body scrub, and essential oils. All made with natural ingredients.",
    artisan: "Natural Elements",
    rating: 4,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Bath & Body",
    occasions: ["birthday", "just-because"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const getProductsByOccasion = (occasion: string): Product[] => {
  return PRODUCTS.filter(product => product.occasions.includes(occasion));
}; 