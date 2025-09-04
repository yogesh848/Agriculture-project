const mongoose = require('mongoose');
const ProductModel = require('./Models/productModel');

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/farmersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    name: "Tomato",
    price: "40",
    description: "Fresh red tomatoes rich in vitamins and antioxidants.",
    rating: "4.5",
    images: [
      { image: "tomato.png" }
    ],
    category: "Vegetable",
    seller: "Fresh Farms",
    stock: "120",
    numofreviews: "25",
    createat: new Date("2025-08-22T08:00:00Z")
  },
  {
    name: "Potato",
    price: "25",
    description: "Organic farm-fresh potatoes perfect for all dishes.",
    rating: "4.6",
    images: [
      { image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Green Harvest",
    stock: "200",
    numofreviews: "18",
    createat: new Date("2025-08-21T10:00:00Z")
  },
  {
    name: "Carrot",
    price: "50",
    description: "Crunchy carrots packed with beta-carotene and vitamins.",
    rating: "4.8",
    images: [
      { image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Nature's Basket",
    stock: "90",
    numofreviews: "30",
    createat: new Date("2025-08-20T09:30:00Z")
  },
  {
    name: "Onion",
    price: "30",
    description: "Pungent and flavorful onions perfect for seasoning.",
    rating: "4.4",
    images: [
      { image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Farm Fresh",
    stock: "150",
    numofreviews: "22",
    createat: new Date("2025-08-19T14:20:00Z")
  },
  {
    name: "Spinach",
    price: "35",
    description: "Leafy green spinach rich in iron and vitamins.",
    rating: "4.7",
    images: [
      { image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop" }
    ],
    category: "Leafy Vegetable",
    seller: "Organic Valley",
    stock: "75",
    numofreviews: "15",
    createat: new Date("2025-08-18T07:15:00Z")
  },
  {
    name: "Cabbage",
    price: "28",
    description: "Fresh and crunchy cabbage, perfect for salads.",
    rating: "4.5",
    images: [
      { image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Green Fields",
    stock: "100",
    numofreviews: "12",
    createat: new Date("2025-08-17T11:10:00Z")
  },
  {
    name: "Cauliflower",
    price: "45",
    description: "Healthy cauliflower, high in fiber and vitamins.",
    rating: "4.6",
    images: [
      { image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Nature's Choice",
    stock: "85",
    numofreviews: "17",
    createat: new Date("2025-08-16T16:45:00Z")
  },
  {
    name: "Green Peas",
    price: "60",
    description: "Sweet green peas, great for curries and snacks.",
    rating: "4.9",
    images: [
      { image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Fresh Harvest",
    stock: "65",
    numofreviews: "10",
    createat: new Date("2025-08-15T08:50:00Z")
  },
  {
    name: "Brinjal",
    price: "35",
    description: "Fresh purple brinjals, tender and tasty.",
    rating: "4.3",
    images: [
      { image: "https://images.unsplash.com/photo-1615485500704-7d0a5b4b2b2b?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Green Mart",
    stock: "80",
    numofreviews: "14",
    createat: new Date("2025-08-14T12:35:00Z")
  },
  {
    name: "Lady Finger",
    price: "38",
    description: "Fresh lady fingers, soft and perfect for curries.",
    rating: "4.5",
    images: [
      { image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop" }
    ],
    category: "Vegetable",
    seller: "Healthy Harvest",
    stock: "95",
    numofreviews: "20",
    createat: new Date("2025-08-13T09:05:00Z")
  }
];

async function seedProducts() {
  try {
    // Clear existing products
    await ProductModel.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await ProductModel.insertMany(products);
    console.log('Successfully seeded products database');
    
    // Verify the data
    const count = await ProductModel.countDocuments();
    console.log(`Total products in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
