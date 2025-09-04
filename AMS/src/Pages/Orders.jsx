import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const Orders = () => {
  console.log("Orders component rendering");
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    setLoading(false);
  }, []);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  // Reorder function
  const reorderItems = (order) => {
    const reorderCart = order.items.map(item => ({
      id: item.name,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      seller: item.seller
    }));
    
    localStorage.setItem('cart', JSON.stringify(reorderCart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Navigate to cart
    window.location.href = '/cart';
  };



  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading orders...</p>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">My Orders</h1>
            <p className="text-xl md:text-2xl opacity-90">Track your order history</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {orders.length === 0 ? (
            /* Empty Orders */
            <div className="text-center py-16">
              <div className="text-gray-400 text-8xl mb-8">📦</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">No orders yet</h2>
              <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start shopping to see your orders here.</p>
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
          ) : (
            /* Orders List */
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-600">Placed on {formatDate(order.date)}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
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
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-gray-600 text-sm">by {item.seller}</p>
                            <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          <p>Payment Method: {order.paymentMethod}</p>
                          <p>Shipping: {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Subtotal: ₹{order.subtotal.toFixed(2)}</p>
                          <p className="text-lg font-bold text-gray-900">Total: ₹{order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                      {order.status === 'delivered' && (
                        <button 
                          onClick={() => reorderItems(order)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          Reorder
                        </button>
                      )}
                    </div>

                    {/* Order Details (Expandable) */}
                    {selectedOrder === order.id && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">Order Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><span className="font-medium">Order ID:</span> {order.id}</p>
                            <p><span className="font-medium">Order Date:</span> {formatDate(order.date)}</p>
                            <p><span className="font-medium">Status:</span> 
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                            <p><span className="font-medium">Total Items:</span> {order.items.length}</p>
                            <p><span className="font-medium">Total Amount:</span> ₹{order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
