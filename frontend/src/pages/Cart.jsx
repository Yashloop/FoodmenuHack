import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  CreditCard,
  Truck,
} from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
      }));
      const response = await userAPI.createOrder({ items: orderItems });
      clearCart();
      alert(
        `Order #${response.data.orderId} placed successfully! Total: $${getTotal()}`,
      );
      navigate("/orders");
    } catch (err) {
      setError("Failed to place order. Please try again.");
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Add some delicious items to get started!
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
        >
          Browse Restaurants
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
          <ShoppingCart className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-600">{cartItems.length} item(s)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            <div key={item.menuItemId} className="p-6 hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍔</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900">
                    Burger #{item.menuItemId}
                  </h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.menuItemId, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4 text-gray-500" />
                    </button>
                    <span className="font-semibold min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.menuItemId, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.menuItemId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 sticky bottom-0">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-2xl font-bold text-gray-900">Total</p>
            <p className="text-3xl font-bold text-orange-600">
              ${getTotal().toFixed(2)}
            </p>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={loading || !user}
          className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Placing order...</span>
            </>
          ) : (
            <>
              <CreditCard className="h-6 w-6" />
              <span>Place Order</span>
              <Truck className="h-6 w-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
