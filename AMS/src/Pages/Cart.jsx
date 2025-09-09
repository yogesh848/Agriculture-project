import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      console.log('Cart page - loading cart from localStorage:', savedCart);
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          console.log('Cart page - parsed cart:', parsedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error('Cart page - Error parsing cart from localStorage:', error);
          setCart([]);
        }
      }
    };

    loadCart();

    
    window.addEventListener('cartUpdated', loadCart);
    
    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event('cartUpdated'));
    }
  }, [cart]);

  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  
  const clearCart = () => {
    setCart([]);
  };

  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 50; 
  const total = subtotal + shipping;

  
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    
    navigate('/payment');
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Shopping Cart</h1>
              <p className="text-xl md:text-2xl opacity-90">Your cart is empty</p>
            </div>
          </div>

          
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="text-gray-400 text-8xl mb-8">🛒</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-xl md:text-2xl opacity-90">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'tomato.png';
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">by {item.seller}</p>
                        <p className="text-green-600 font-bold">₹{item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      Add ₹{(200 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 mt-6 font-semibold flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Proceed to Payment
                </button>

                <Link
                  to="/products"
                  className="block text-center text-green-600 hover:text-green-800 mt-4 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
