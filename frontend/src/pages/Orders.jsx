import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";
import { PackageCheck, Clock, XCircle, MapPin } from "lucide-react";

const mockOrders = [
  {
    id: 123,
    status: "PLACED",
    totalAmount: 32.97,
    createdAt: "2024-04-15T10:30:00Z",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { name: "Classic Burger", quantity: 1, price: 4.99 },
    ],
    restaurant: "Pizza Palace",
    deliveryAddress: "123 Food St, Hunger City",
  },
  {
    id: 124,
    status: "CANCELLED",
    totalAmount: 18.98,
    createdAt: "2024-04-14T15:45:00Z",
    items: [{ name: "California Roll", quantity: 2, price: 9.49 }],
    restaurant: "Sushi Spot",
    deliveryAddress: "456 Sushi Ave, Tokyo Town",
  },
];

const statusConfig = {
  PLACED: { label: "Order Placed", icon: Clock, color: "orange" },
  CONFIRMED: { label: "Confirmed", icon: PackageCheck, color: "green" },
  CANCELLED: { label: "Cancelled", icon: XCircle, color: "red" },
  DELIVERED: { label: "Delivered", icon: PackageCheck, color: "blue" },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userAPI.getMyOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <PackageCheck className="h-10 w-10 bg-green-100 text-green-600 p-2 rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600">Track your recent orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <PackageCheck className="mx-auto h-24 w-24 text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven't placed any orders yet. Start browsing restaurants to
            order your favorite food!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
          >
            Browse Restaurants
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => {
            const StatusIcon = statusConfig[order.status]?.icon || PackageCheck;
            const color = statusConfig[order.status]?.color || "gray";
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-${color}-50 border-2 border-${color}-200`}
                      >
                        <StatusIcon className={`h-6 w-6 text-${color}-600`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-xl text-gray-900">
                            Order #{order.id}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
                          >
                            {statusConfig[order.status]?.label || order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4">
                        {order.restaurant}
                      </h3>
                      <div className="space-y-2 mb-6">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between py-1"
                          >
                            <span>{item.name}</span>
                            <span className="font-medium">
                              x{item.quantity} - ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{order.deliveryAddress}</span>
                      </div>
                    </div>
                    <div className="space-y-4 pt-4 md:pt-0 md:border-l md:pl-8 border-gray-100">
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-medium transition">
                        Track Order
                      </button>
                      {order.status === "PLACED" && (
                        <button className="w-full border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100 text-red-800 py-3 px-4 rounded-xl font-medium transition">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
