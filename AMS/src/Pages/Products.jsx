import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [cart, setCart] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try the MongoDB API first
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/v1/products`);
        const data = await response.json();
        
        if (data.success && data.product) {
          setProducts(data.product || []);
          setFilteredProducts(data.product || []);
        } else {
          // Fallback to static data if API fails
          console.log("API failed, using fallback data");
          const fallbackProducts = [
            {
              name: "Tomato",
              price: "40",
              description: "Fresh red tomatoes rich in vitamins and antioxidants.",
              rating: "4.5",
              images: [{ image: "tomato.png" }],
              category: "Vegetable",
              seller: "Fresh Farms",
              stock: "120",
              numofreviews: "25",
              createat: "2025-08-22T08:00:00Z"
            },
            {
              name: "Potato",
              price: "25",
              description: "Organic farm-fresh potatoes perfect for all dishes.",
              rating: "4.6",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg" }],
              category: "Vegetable",
              seller: "Green Harvest",
              stock: "200",
              numofreviews: "18",
              createat: "2025-08-21T10:00:00Z"
            },
            {
              name: "Carrot",
              price: "50",
              description: "Crunchy carrots packed with beta-carotene and vitamins.",
              rating: "4.8",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Carrots.jpg" }],
              category: "Vegetable",
              seller: "Nature's Basket",
              stock: "90",
              numofreviews: "30",
              createat: "2025-08-20T09:30:00Z"
            },
            {
              name: "Onion",
              price: "30",
              description: "Pungent and flavorful onions perfect for seasoning.",
              rating: "4.4",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Onions.jpg" }],
              category: "Vegetable",
              seller: "Farm Fresh",
              stock: "150",
              numofreviews: "22",
              createat: "2025-08-19T14:20:00Z"
            },
            {
              name: "Spinach",
              price: "35",
              description: "Leafy green spinach rich in iron and vitamins.",
              rating: "4.7",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Spinach_leaves.jpg" }],
              category: "Leafy Vegetable",
              seller: "Organic Valley",
              stock: "75",
              numofreviews: "15",
              createat: "2025-08-18T07:15:00Z"
            },
            {
              name: "Cabbage",
              price: "28",
              description: "Fresh and crunchy cabbage, perfect for salads.",
              rating: "4.5",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Cabbage.jpg" }],
              category: "Vegetable",
              seller: "Green Fields",
              stock: "100",
              numofreviews: "12",
              createat: "2025-08-17T11:10:00Z"
            },
            {
              name: "Cauliflower",
              price: "45",
              description: "Healthy cauliflower, high in fiber and vitamins.",
              rating: "4.6",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Cauliflower.jpg" }],
              category: "Vegetable",
              seller: "Nature's Choice",
              stock: "85",
              numofreviews: "17",
              createat: "2025-08-16T16:45:00Z"
            },
            {
              name: "Green Peas",
              price: "60",
              description: "Sweet green peas, great for curries and snacks.",
              rating: "4.9",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Green_peas.jpg" }],
              category: "Vegetable",
              seller: "Fresh Harvest",
              stock: "65",
              numofreviews: "10",
              createat: "2025-08-15T08:50:00Z"
            },
            {
              name: "Brinjal",
              price: "35",
              description: "Fresh purple brinjals, tender and tasty.",
              rating: "4.3",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Brinjal.jpg" }],
              category: "Vegetable",
              seller: "Green Mart",
              stock: "80",
              numofreviews: "14",
              createat: "2025-08-14T12:35:00Z"
            },
            {
              name: "Lady Finger",
              price: "38",
              description: "Fresh lady fingers, soft and perfect for curries.",
              rating: "4.5",
              images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lady_finger.jpg" }],
              category: "Vegetable",
              seller: "Healthy Harvest",
              stock: "95",
              numofreviews: "20",
              createat: "2025-08-13T09:05:00Z"
            }
          ];
          setProducts(fallbackProducts);
          setFilteredProducts(fallbackProducts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Use fallback data on error
        const fallbackProducts = [
          {
            name: "Tomato",
            price: "40",
            description: "Fresh red tomatoes rich in vitamins and antioxidants.",
            rating: "4.5",
            images: [{ image: "tomato.png" }],
            category: "Vegetable",
            seller: "Fresh Farms",
            stock: "120",
            numofreviews: "25",
            createat: "2025-08-22T08:00:00Z"
          },
          {
            name: "Potato",
            price: "25",
            description: "Organic farm-fresh potatoes perfect for all dishes.",
            rating: "4.6",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg" }],
            category: "Vegetable",
            seller: "Green Harvest",
            stock: "200",
            numofreviews: "18",
            createat: "2025-08-21T10:00:00Z"
          },
          {
            name: "Carrot",
            price: "50",
            description: "Crunchy carrots packed with beta-carotene and vitamins.",
            rating: "4.8",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Carrots.jpg" }],
            category: "Vegetable",
            seller: "Nature's Basket",
            stock: "90",
            numofreviews: "30",
            createat: "2025-08-20T09:30:00Z"
          },
          {
            name: "Onion",
            price: "30",
            description: "Pungent and flavorful onions perfect for seasoning.",
            rating: "4.4",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Onions.jpg" }],
            category: "Vegetable",
            seller: "Farm Fresh",
            stock: "150",
            numofreviews: "22",
            createat: "2025-08-19T14:20:00Z"
          },
          {
            name: "Spinach",
            price: "35",
            description: "Leafy green spinach rich in iron and vitamins.",
            rating: "4.7",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Spinach_leaves.jpg" }],
            category: "Leafy Vegetable",
            seller: "Organic Valley",
            stock: "75",
            numofreviews: "15",
            createat: "2025-08-18T07:15:00Z"
          },
          {
            name: "Cabbage",
            price: "28",
            description: "Fresh and crunchy cabbage, perfect for salads.",
            rating: "4.5",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Cabbage.jpg" }],
            category: "Vegetable",
            seller: "Green Fields",
            stock: "100",
            numofreviews: "12",
            createat: "2025-08-17T11:10:00Z"
          },
          {
            name: "Cauliflower",
            price: "45",
            description: "Healthy cauliflower, high in fiber and vitamins.",
            rating: "4.6",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Cauliflower.jpg" }],
            category: "Vegetable",
            seller: "Nature's Choice",
            stock: "85",
            numofreviews: "17",
            createat: "2025-08-16T16:45:00Z"
          },
          {
            name: "Green Peas",
            price: "60",
            description: "Sweet green peas, great for curries and snacks.",
            rating: "4.9",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Green_peas.jpg" }],
            category: "Vegetable",
            seller: "Fresh Harvest",
            stock: "65",
            numofreviews: "10",
            createat: "2025-08-15T08:50:00Z"
          },
          {
            name: "Brinjal",
            price: "35",
            description: "Fresh purple brinjals, tender and tasty.",
            rating: "4.3",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Brinjal.jpg" }],
            category: "Vegetable",
            seller: "Green Mart",
            stock: "80",
            numofreviews: "14",
            createat: "2025-08-14T12:35:00Z"
          },
          {
            name: "Lady Finger",
            price: "38",
            description: "Fresh lady fingers, soft and perfect for curries.",
            rating: "4.5",
            images: [{ image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lady_finger.jpg" }],
            category: "Vegetable",
            seller: "Healthy Harvest",
            stock: "95",
            numofreviews: "20",
            createat: "2025-08-13T09:05:00Z"
          }
        ];
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart([]);
      }
    }
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "rating":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = ["All", ...new Set(products.map(product => product.category))];

  // Add to cart function
  const addToCart = (product) => {
    console.log('Adding to cart:', product.name);
    console.log('Current cart:', cart);
    
    // Set adding animation
    setAddingToCart(product.name);
    
    const existingItem = cart.find(item => item.id === product.name);
    
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      console.log('Updated existing item, new cart:', updatedCart);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        id: product.name,
        name: product.name,
        price: parseFloat(product.price),
        image: product.images[0]?.image || 'tomato.png',
        quantity: 1,
        seller: product.seller
      };
      const updatedCart = [...cart, newItem];
      console.log('Added new item, new cart:', updatedCart);
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    
    // Dispatch cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Remove animation after 2 seconds
    setTimeout(() => {
      setAddingToCart(null);
    }, 2000);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Products</h1>
            <p className="text-xl md:text-2xl opacity-90">Fresh, Organic, and Delicious</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.images[0]?.image || 'tomato.png'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'tomato.png';
                    }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(parseFloat(product.rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.numofreviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">by {product.seller}</span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={addingToCart === product.name}
                      className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center ${
                        addingToCart === product.name
                          ? 'bg-green-500 text-white scale-95'
                          : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
                      }`}
                    >
                      {addingToCart === product.name ? (
                        <>
                          <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
