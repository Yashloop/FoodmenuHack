import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { useCart } from '../hooks/useCart.jsx'; // Will create later

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className="group card hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
        <span className="text-4xl">🍲</span> {/* Replace with real image later */}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{item.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.description || 'Delicious food item'}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-food-gold">${item.price}</span>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary flex items-center gap-2 group-hover:bg-primary-700 shadow-lg"
            disabled={!item.is_available}
          >
            <Plus size={20} />
            <span>Add {item.quantity > 0 && `(${item.quantity})`}</span>
          </button>
        </div>
        {!item.is_available && (
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
            Currently unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;

