import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      }
    };

    updateCartCount();
    
    // Listen for storage changes (when cart is updated from other tabs)
    window.addEventListener('storage', updateCartCount);
    
    // Listen for custom cart update events
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      
      <div className="bg-green-950">
        <div className="flex relative ml-10 h-20 w-30">
          <Link to="/home">
            <img className="mt-5 cursor-pointer" src="logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="bg-green-900 absolute top-9 left-50 text-white font-bold flex items-center rounded-full h-2 p-6 w-[80%] mx-auto">
          <img src="mail.png" className="h-6 w-6 ml-4" alt="Mail" />
          <span className="ml-1">agri@gmail.com</span>

          <img src="location.png" className="h-6 w-6 ml-12" alt="Location" />
          <span className="ml-1">Tirunelveli</span>

          <div className="flex ml-150 space-x-6">
            <img src="fb.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Facebook" />
            <img src="insta.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Instagram" />
            <img src="x.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Twitter" />
            <img src="p.png" className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" alt="Pinterest" />
          </div>
        </div>
      </div>

      
      <div className="uppercase h-16 bg-green-950 sticky top-0 flex items-center justify-center space-x-20 font-semibold w-full z-50 shadow-md">
        <Link 
          to="/home" 
          className={`cursor-pointer transition-colors duration-200 ${
            isActive('/home') ? 'text-green-400' : 'text-white hover:text-green-500'
          }`}
        >
          HOME
        </Link>
        <Link 
          to="/products" 
          className={`cursor-pointer transition-colors duration-200 ${
            isActive('/products') ? 'text-green-400' : 'text-white hover:text-green-500'
          }`}
        >
          PRODUCTS
        </Link>
        <Link 
          to="/cart" 
          className={`cursor-pointer transition-colors duration-200 ${
            isActive('/cart') ? 'text-green-400' : 'text-white hover:text-green-500'
          }`}
        >
          CART
        </Link>
        <Link 
          to="/orders" 
          className={`cursor-pointer transition-colors duration-200 ${
            isActive('/orders') ? 'text-green-400' : 'text-white hover:text-green-500'
          }`}
        >
          ORDERS
        </Link>
        <p className="cursor-pointer text-white hover:text-green-500">ABOUT</p>
        <p className="cursor-pointer text-white hover:text-green-500">CONTACT</p>
        <div className="flex ml-20">
          <img className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" src="search.png" alt="Search" />
          <Link to="/cart" className="relative">
            <img className="w-8 h-8 ml-12 cursor-pointer hover:scale-110 transition-transform" src="cart2.png" alt="Cart" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};
