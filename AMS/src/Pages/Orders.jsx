import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

export const Orders = () => {
  console.log("Orders component rendering");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Cancel order
  const cancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await fetch(`http://localhost:3001/api/v1/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "cancelled" }),
        });

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    }
  };

  // Reorder
  const reorderItems = (order) => {
    const reorderCart = (order.cartItems || []).map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price || 0,
      image: item.image,
      quantity: item.quantity || 1,
      seller: item.seller,
    }));

    localStorage.setItem("cart", JSON.stringify(reorderCart));
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "/cart";
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
        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">My Orders</h1>
          <p className="text-xl md:text-2xl opacity-90">Track your order history</p>
        </div>

        <div className="container mx-auto px-4 py-8">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-8xl mb-8">📦</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">No orders yet</h2>
              <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderAmount = order.amount || 0;

                return (
                  <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Order #{order._id}</h3>
                        <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.status === "pending" && (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-6">
                      {(order.cartItems || []).map((item, idx) => {
                        const itemPrice = item.price || 0;
                        const itemQty = item.quantity || 1;

                        return (
                          <div key={idx} className="flex items-center space-x-4 mb-4">
                            <img
                              src={item.image || "tomato.png"}
                              alt={item.name}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {itemQty}</p>
                            </div>
                            <p className="font-semibold">₹{(itemPrice * itemQty).toFixed(2)}</p>
                          </div>
                        );
                      })}

                      {/* Footer */}
                      <div className="mt-6 flex justify-between items-center border-t pt-4">
                        <p className="text-sm text-gray-600">Total: ₹{orderAmount.toFixed(2)}</p>
                        {order.status === "delivered" && (
                          <button
                            onClick={() => reorderItems(order)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                          >
                            Reorder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
