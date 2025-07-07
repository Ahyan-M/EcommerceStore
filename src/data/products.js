export const products = [
  // 1. Printer
  {
    id: 1,
    name: "HP LaserJet Pro MFP M283fdw",
    description: "Wireless all-in-one color laser printer for home and small offices.",
    detailedDescription: "Fast and efficient color laser printer with print, scan, copy, and fax. Supports wireless, duplex printing, and has a 2.7\" color touchscreen.",
    price: 429.99,
    image: "/images/hp-laserjet-m283fdw.jpg",
    stock: 12,
    category: "Electronics",
    sku: "HP-LJM283FDW-001",
    materials: ["Plastic", "Metal", "Electronic components"],
    dimensions: "16.5\" x 16.6\" x 13.2\"",
    features: [
      "All-in-one functionality",
      "22 ppm print speed",
      "Automatic two-sided printing",
      "Wireless and mobile printing",
      "2.7\" color touchscreen"
    ],
    rating: 4.6,
    reviews: [
      {
        reviewer: "Alex Thompson",
        rating: 5,
        date: "2024-05-10",
        comment: "Reliable and easy to use. Great quality prints."
      }
    ]
  },

  // 2. Keyboard
  {
    id: 2,
    name: "Logitech MX Keys",
    description: "Premium wireless keyboard with smart illumination.",
    detailedDescription: "Logitech MX Keys offers a fluid, quiet typing experience with backlit keys and multi-device pairing. Ideal for productivity and comfort.",
    price: 119.99,
    image: "/images/logitech-mx-keys.png",
    stock: 30,
    category: "Electronics",
    sku: "LOGI-MXKEYS-002",
    materials: ["Plastic", "Aluminum"],
    dimensions: "17.0\" x 5.1\" x 0.8\"",
    features: [
      "Backlit keys",
      "USB-C rechargeable",
      "Multi-device support",
      "Ergonomic layout",
      "Bluetooth and Unifying receiver"
    ],
    rating: 4.8,
    reviews: [
      {
        reviewer: "Jamie Lee",
        rating: 5,
        date: "2024-04-02",
        comment: "Perfect keyboard for work. Super smooth and quiet."
      }
    ]
  },

  // 3. Mouse
  {
    id: 3,
    name: "Logitech MX Master 3S",
    description: "Ergonomic wireless mouse for high precision work.",
    detailedDescription: "With ultra-fast scrolling, customizable buttons, and advanced tracking, the MX Master 3S is built for designers and developers.",
    price: 99.99,
    image: "/images/logitech-mx-master-3s.png",
    stock: 18,
    category: "Electronics",
    sku: "LOGI-MXM3S-003",
    materials: ["Plastic", "Rubber", "Metal"],
    dimensions: "4.9\" x 3.3\" x 2.0\"",
    features: [
      "MagSpeed scroll wheel",
      "8K DPI sensor",
      "Silent clicks",
      "USB-C rechargeable",
      "Multi-device & OS compatibility"
    ],
    rating: 4.7,
    reviews: [
      {
        reviewer: "Chris Nolan",
        rating: 5,
        date: "2024-06-15",
        comment: "Most comfortable mouse I've used. Great for long sessions."
      }
    ]
  },

  // 4. Desk Lamp
  {
    id: 4,
    name: "BenQ e-Reading LED Desk Lamp",
    description: "Wide LED desk lamp with auto-dimming and adjustable arms.",
    detailedDescription: "Designed for screen users, this lamp reduces glare, covers wide desks, and automatically adjusts brightness for eye comfort.",
    price: 179.99,
    image: "/images/benq-desk-lamp.jpg",
    stock: 20,
    category: "Home & Office",
    sku: "BENQ-LAMP-004",
    materials: ["Aluminum", "Plastic", "LED"],
    dimensions: "23.2\" x 9.4\" x 21.4\"",
    features: [
      "Auto-dimming technology",
      "Adjustable brightness and color temperature",
      "Wide lighting coverage",
      "Flicker-free lighting",
      "USB-powered"
    ],
    rating: 5,
    reviews: [
      {
        reviewer: "Maya Singh",
        rating: 5,
        date: "2024-02-28",
        comment: "Excellent for studying. Bright and customizable."
      }
    ]
  },

  // 5. Desk
  {
    id: 5,
    name: "FlexiSpot Adjustable Standing Desk",
    description: "Electric height-adjustable desk for ergonomic workspace.",
    detailedDescription: "Spacious and sturdy electric desk with memory presets. Switch from sitting to standing with the push of a button.",
    price: 329.99,
    image: "/images/flexispot-desk.jpg",
    stock: 10,
    category: "Furniture",
    sku: "FLEXI-DESK-005",
    materials: ["Steel", "Wood"],
    dimensions: "55\" x 28\" x 28\"–48\" (adjustable)",
    features: [
      "Electric height adjustment",
      "Dual motor system",
      "4 memory presets",
      "Cable management tray",
      "Quiet operation"
    ],
    rating: 4.4,
    reviews: [
      {
        reviewer: "Omar Patel",
        rating: 4,
        date: "2024-03-17",
        comment: "Solid build, works great. Would love a wider tabletop option."
      }
    ]
  },

  // 6. Office Chair
  {
    id: 6,
    name: "Herman Miller Aeron Chair",
    description: "High-performance ergonomic office chair.",
    detailedDescription: "A modern icon, the Aeron Chair provides unmatched support, breathability, and comfort with adjustable settings for long work sessions.",
    price: 1395.00,
    image: "/images/aeron-chair.jpeg",
    stock: 7,
    category: "Furniture",
    sku: "HM-AERON-006",
    materials: ["Recycled materials", "Mesh", "Aluminum"],
    dimensions: "27\" x 27\" x 41\"",
    features: [
      "PostureFit SL support",
      "Adjustable armrests",
      "Breathable mesh seat and back",
      "Tilt limiter and forward tilt",
      "Eco-conscious design"
    ],
    rating: 4.9,
    reviews: [
      {
        reviewer: "David Kim",
        rating: 5,
        date: "2024-01-09",
        comment: "Expensive but worth every penny. My back thanks me."
      }
    ]
  },

  // 7. Laptop
  {
    id: 7,
    name: "Dell XPS 13 Plus (2024)",
    description: "Sleek ultrabook with powerful performance.",
    detailedDescription: "The Dell XPS 13 Plus features a near-borderless display, Intel Core Ultra processor, and a seamless glass touchpad for a futuristic feel.",
    price: 1699.99,
    image: "/images/dell-xps-13-plus.jpg",
    stock: 15,
    category: "Electronics",
    sku: "DELL-XPS13-007",
    materials: ["Aluminum", "Glass", "Carbon fiber"],
    dimensions: "11.6\" x 7.8\" x 0.6\"",
    features: [
      "13.4\" 3.5K OLED display",
      "Intel Core Ultra 7 CPU",
      "16GB RAM, 1TB SSD",
      "Fingerprint reader",
      "Windows 11 Pro"
    ],
    rating: 4.8,
    reviews: [
      {
        reviewer: "Lina Ahmed",
        rating: 5,
        date: "2024-04-05",
        comment: "Blazing fast and looks amazing. Great for travel and work."
      }
    ]
  }
];

// Categories for filtering
export const categories = [
  "All",
  "Electronics",
  "Furniture", 
  "Home & Office"
];

// Helper function to get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

// Helper function to search products
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Helper function to get featured products (top rated)
export const getFeaturedProducts = (limit = 4) => {
  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Helper function to get products by price range
export const getProductsByPriceRange = (minPrice, maxPrice) => {
  return products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
}; 