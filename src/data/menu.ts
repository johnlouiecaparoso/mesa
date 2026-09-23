export type Category = {
  id: string
  name: string
  slug: string
  blurb: string
}

export type AddOn = { id: string; name: string; price: number }
export type Variation = { id: string; name: string; price: number }

export type MenuItem = {
  id: string
  name: string
  categoryId: string
  description: string
  price: number
  image: string
  tags: string[] // dietary / attributes
  featured: boolean
  soldOut: boolean
  variations?: Variation[]
  addOns?: AddOn[]
}

export const categories: Category[] = [
  { id: 'starters', name: 'Starters', slug: 'starters', blurb: 'Pulutan to open the table' },
  { id: 'mains', name: 'Main Dishes', slug: 'mains', blurb: 'The heart of every Filipino meal' },
  { id: 'rice', name: 'Rice', slug: 'rice', blurb: 'Kanin, garlic-fried and more' },
  { id: 'noodles', name: 'Noodles', slug: 'noodles', blurb: 'Pancit for long life' },
  { id: 'desserts', name: 'Desserts', slug: 'desserts', blurb: 'Sweet endings, kakanin & more' },
  { id: 'drinks', name: 'Drinks', slug: 'drinks', blurb: 'Cold refreshers & kapeng barako' },
]

const img = (id: string, w = 900, h = 700) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`

const commonAddOns: AddOn[] = [
  { id: 'egg', name: 'Fried egg', price: 35 },
  { id: 'extra-rice', name: 'Extra garlic rice', price: 45 },
  { id: 'atchara', name: 'Atchara (pickled papaya)', price: 25 },
]

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: 'sisig',
    name: 'Sizzling Sisig',
    categoryId: 'starters',
    description: 'Chopped pork, calamansi, chili and onion on a sizzling plate, crowned with a raw egg.',
    price: 280,
    image: img('1626804475297-41608ea09aeb'),
    tags: ['spicy', 'bestseller'],
    featured: true,
    soldOut: false,
    variations: [
      { id: 'reg', name: 'Regular', price: 0 },
      { id: 'sharing', name: 'Sharing platter', price: 160 },
    ],
    addOns: commonAddOns,
  },
  {
    id: 'lumpia',
    name: 'Lumpiang Shanghai',
    categoryId: 'starters',
    description: 'Hand-rolled pork spring rolls fried to a shattering crisp, with sweet-chili dip.',
    price: 180,
    image: img('1544025162-d76694265947'),
    tags: ['bestseller'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'kwek',
    name: 'Kwek-Kwek',
    categoryId: 'starters',
    description: 'Orange battered quail eggs, deep-fried, with spiced vinegar.',
    price: 150,
    image: img('1541529086526-db283c563270'),
    tags: ['vegetarian-option'],
    featured: false,
    soldOut: true,
  },
  {
    id: 'chicharon',
    name: 'Chicharon Bulaklak',
    categoryId: 'starters',
    description: 'Crispy pork ruffle fat, addictive with vinegar dip. Pulutan royalty.',
    price: 220,
    image: img('1562967914-608f82629710'),
    tags: ['spicy'],
    featured: false,
    soldOut: false,
  },

  // Mains
  {
    id: 'inasal',
    name: 'Chicken Inasal',
    categoryId: 'mains',
    description: 'Bacolod-style grilled chicken marinated in lemongrass, calamansi and annatto oil.',
    price: 320,
    image: img('1598515214211-89d3c73ae83b'),
    tags: ['bestseller', 'gluten-free'],
    featured: true,
    soldOut: false,
    variations: [
      { id: 'paa', name: 'Paa (leg)', price: 0 },
      { id: 'pecho', name: 'Pecho (breast)', price: 40 },
    ],
    addOns: commonAddOns,
  },
  {
    id: 'lechon-kawali',
    name: 'Crispy Pork Belly',
    categoryId: 'mains',
    description: 'Twice-cooked lechon kawali with glass-crackling skin, served with liver sauce.',
    price: 380,
    image: img('1432139555190-58524dae6a55'),
    tags: ['bestseller'],
    featured: true,
    soldOut: false,
    addOns: commonAddOns,
  },
  {
    id: 'kare-kare',
    name: 'Kare-Kare',
    categoryId: 'mains',
    description: 'Oxtail and vegetables in rich peanut stew, with a side of fermented shrimp paste.',
    price: 450,
    image: img('1455619452474-d2be8b1e70cd'),
    tags: ['contains-nuts'],
    featured: true,
    soldOut: false,
  },
  {
    id: 'sinigang',
    name: 'Sinigang na Baboy',
    categoryId: 'mains',
    description: 'Pork belly in a bright tamarind broth with kangkong, radish and taro.',
    price: 360,
    image: img('1547592180-85f173990554'),
    tags: ['gluten-free'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'adobo',
    name: 'Chicken Adobo',
    categoryId: 'mains',
    description: 'The national dish — braised in soy, vinegar, garlic and bay leaf until glossy.',
    price: 290,
    image: img('1512058564366-18510be2db19'),
    tags: ['bestseller'],
    featured: false,
    soldOut: false,
    addOns: commonAddOns,
  },
  {
    id: 'bangus',
    name: 'Grilled Bangus',
    categoryId: 'mains',
    description: 'Milkfish stuffed with tomato and onion, grilled in banana leaf.',
    price: 340,
    image: img('1519708227418-c8fd9a32b7a2'),
    tags: ['gluten-free', 'pescatarian'],
    featured: false,
    soldOut: false,
  },

  // Rice
  {
    id: 'garlic-rice',
    name: 'Garlic Rice',
    categoryId: 'rice',
    description: 'Fragrant sinangag, toasted garlic through every grain.',
    price: 60,
    image: img('1516684732162-798a0062be99'),
    tags: ['vegetarian'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'bagoong-rice',
    name: 'Bagoong Rice',
    categoryId: 'rice',
    description: 'Shrimp-paste fried rice with mango and pork, a meal on its own.',
    price: 140,
    image: img('1596797038530-2c107229654b'),
    tags: [],
    featured: false,
    soldOut: false,
  },
  {
    id: 'java-rice',
    name: 'Java Rice',
    categoryId: 'rice',
    description: 'Golden turmeric-annatto rice, the classic partner to inasal.',
    price: 80,
    image: img('1603133872878-684f208fb84b'),
    tags: ['vegetarian', 'gluten-free'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'plain-rice',
    name: 'Steamed Rice',
    categoryId: 'rice',
    description: 'A hot cup of kanin. The quiet backbone of the table.',
    price: 40,
    image: img('1586201375761-83865001e31c'),
    tags: ['vegan', 'gluten-free'],
    featured: false,
    soldOut: false,
  },

  // Noodles
  {
    id: 'pancit-bihon',
    name: 'Pancit Bihon',
    categoryId: 'noodles',
    description: 'Rice vermicelli tossed with vegetables, pork and shrimp. Long life in a plate.',
    price: 250,
    image: img('1585032226651-759b368d7246'),
    tags: ['bestseller'],
    featured: true,
    soldOut: false,
    variations: [
      { id: 'solo', name: 'Solo', price: 0 },
      { id: 'family', name: 'Family (good for 4)', price: 220 },
    ],
  },
  {
    id: 'pancit-canton',
    name: 'Pancit Canton',
    categoryId: 'noodles',
    description: 'Stir-fried egg noodles with a soy-oyster glaze and crisp vegetables.',
    price: 260,
    image: img('1569718212165-3a8278d5f624'),
    tags: [],
    featured: false,
    soldOut: false,
  },
  {
    id: 'palabok',
    name: 'Pancit Palabok',
    categoryId: 'noodles',
    description: 'Rice noodles under a golden shrimp sauce, chicharon, egg and smoked fish.',
    price: 240,
    image: img('1626700051175-6818013e1d4f'),
    tags: [],
    featured: false,
    soldOut: false,
  },
  {
    id: 'lomi',
    name: 'Batangas Lomi',
    categoryId: 'noodles',
    description: 'Thick egg noodles in a hearty, starchy broth with pork and liver.',
    price: 210,
    image: img('1552611052-33e04de081de'),
    tags: [],
    featured: false,
    soldOut: false,
  },

  // Desserts
  {
    id: 'halo-halo',
    name: 'Halo-Halo',
    categoryId: 'desserts',
    description: 'Shaved ice with beans, jellies, leche flan, ube halaya and a scoop of ube ice cream.',
    price: 180,
    image: img('1590080876351-51e2ae12aa1c'),
    tags: ['vegetarian', 'bestseller'],
    featured: true,
    soldOut: false,
    addOns: [
      { id: 'extra-flan', name: 'Extra leche flan', price: 40 },
      { id: 'extra-ube', name: 'Extra ube ice cream', price: 45 },
    ],
  },
  {
    id: 'leche-flan',
    name: 'Leche Flan',
    categoryId: 'desserts',
    description: 'Silky caramel custard, dense with egg yolk. A fiesta staple.',
    price: 120,
    image: img('1488477181946-6428a0291777'),
    tags: ['vegetarian', 'gluten-free'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'bibingka',
    name: 'Bibingka',
    categoryId: 'desserts',
    description: 'Rice cake baked in banana leaf, topped with salted egg and cheese.',
    price: 140,
    image: img('1607478900766-efe13248b125'),
    tags: ['vegetarian'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'turon',
    name: 'Turon',
    categoryId: 'desserts',
    description: 'Caramelized banana and jackfruit spring rolls, crackly and warm.',
    price: 90,
    image: img('1621939514649-280e2ee25f60'),
    tags: ['vegan'],
    featured: false,
    soldOut: false,
  },

  // Drinks
  {
    id: 'calamansi',
    name: 'Calamansi Juice',
    categoryId: 'drinks',
    description: 'Freshly squeezed calamansi, sweet-tart and served over ice.',
    price: 90,
    image: img('1621263764928-df1444c5e859'),
    tags: ['vegan', 'gluten-free'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'barako',
    name: 'Kapeng Barako',
    categoryId: 'drinks',
    description: 'Bold Batangas brew with a smoky, full body. Hot or iced.',
    price: 110,
    image: img('1509042239860-f550ce710b93'),
    tags: ['vegan'],
    featured: false,
    soldOut: false,
    variations: [
      { id: 'hot', name: 'Hot', price: 0 },
      { id: 'iced', name: 'Iced', price: 20 },
    ],
  },
  {
    id: 'sago-gulaman',
    name: "Sago't Gulaman",
    categoryId: 'drinks',
    description: 'Chilled brown-sugar drink with tapioca pearls and jelly.',
    price: 80,
    image: img('1558857563-b371033873b8'),
    tags: ['vegan'],
    featured: false,
    soldOut: false,
  },
  {
    id: 'buko',
    name: 'Fresh Buko Juice',
    categoryId: 'drinks',
    description: 'Young coconut water served in the shell with tender strips.',
    price: 120,
    image: img('1520950237264-4e1e8fae39be'),
    tags: ['vegan', 'gluten-free'],
    featured: false,
    soldOut: false,
  },
]

export const getItem = (id: string) => menuItems.find((m) => m.id === id)
export const featuredItems = () => menuItems.filter((m) => m.featured && !m.soldOut)

export type Testimonial = { id: string; name: string; location: string; rating: number; quote: string }
export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Andrea Salcedo', location: 'Makati', rating: 5, quote: 'The inasal took me straight back to my lola’s table in Bacolod. Best in the metro, hands down.' },
  { id: 't2', name: 'Miguel Tan', location: 'Quezon City', rating: 5, quote: 'Booked a table for 8 and every single dish landed. The kare-kare is unreal.' },
  { id: 't3', name: 'Patricia Reyes', location: 'BGC', rating: 4, quote: 'Warm, unpretentious and genuinely delicious. The halo-halo is a full experience.' },
]

export type Promotion = {
  id: string
  title: string
  description: string
  discountType: 'percent' | 'fixed'
  discountValue: number
  code: string
  active: boolean
  endDate: string
}
export const activePromotion: Promotion = {
  id: 'p1',
  title: 'Merienda Hours',
  description: 'Get 15% off all noodles and desserts every weekday, 2–5 PM. Perfect for a Filipino afternoon.',
  discountType: 'percent',
  discountValue: 15,
  code: 'MERIENDA15',
  active: true,
  endDate: '2026-12-31',
}
