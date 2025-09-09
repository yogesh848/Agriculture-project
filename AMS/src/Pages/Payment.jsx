import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

export const Payment = () => {
  console.log("Payment component rendering");
  
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryAddress, setDeliveryAddress] = useState('123 Main Street, Tirunelveli, Tamil Nadu 627001');
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCart([]);
      }
    }
  }, []);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 50;
  const total = subtotal + shipping;

  // Process payment
  const processPayment = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Create order
      const orderData = {
        id: Date.now().toString(),
        items: cart,
        subtotal,
        shipping,
        total,
        status: 'pending',
        date: new Date().toISOString(),
        paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
        deliveryAddress,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      setCart([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      setLoading(false);

      // Navigate to orders page
      navigate('/orders');
    }, 3000);
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Payment</h1>
              <p className="text-xl md:text-2xl opacity-90">Your cart is empty</p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="text-gray-400 text-8xl mb-8">💳</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">No items to pay for</h2>
              <p className="text-gray-500 mb-8">Add some items to your cart first.</p>
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Go Shopping
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
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Payment</h1>
            <p className="text-xl md:text-2xl opacity-90">Complete your order</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

              {/* Delivery Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Cash on Delivery</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Online Payment</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={processPayment}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Complete Payment
                  </>
                )}
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
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
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
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
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
