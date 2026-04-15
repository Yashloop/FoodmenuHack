import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';
import { userAPI } from '../services/api';
import clsx from 'clsx';

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    
    setLoading(true);
    try {
      const orderItems = items.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));
      
      const response = await userAPI.createOrder({ items: orderItems });
      clearCart();
      alert(`Order #${response.data.orderId} placed successfully! Total: $${response.data.totalAmount}`);
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={80} className="mx-auto text-gray-400 mb-8" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-xl text-gray-600 mb-8">Add some delicious items to get started</p>
          <a href="/" className="btn btn-primary text-lg px-8 py-4">Browse Restaurants</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items */}
          <div className="lg:flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <div className="aspect-square w-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍲</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-4">${item.price}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-100 rounded-xl p-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-mono font-bold text-lg min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 -m-2 rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end flex-shrink-0">
                    <span className="text-2xl font-bold text-food-gold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Total items:</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-food-gold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={loading || items.length === 0}
                className={clsx(
                  'w-full flex items-center gap-3 justify-center text-lg py-5 rounded-2xl font-bold shadow-2xl transition-all',
                  loading || items.length === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white hover:shadow-3xl transform hover:-translate-y-1'
                )}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <CreditCard size={24} />
                    Place Order - ${total.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

