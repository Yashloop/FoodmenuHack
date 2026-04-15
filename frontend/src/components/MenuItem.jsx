import React from "react";
import { useCart } from "../context/CartContext";

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item.id, 1, item.price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        {!item.image ? (
          <span className="text-4xl">🍽️</span>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {item.description || "Delicious food item"}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-600">
            ${item.price}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
        {item.is_available === false && (
          <div className="mt-2 bg-gray-100 text-gray-600 text-sm py-1 px-2 rounded">
            Currently unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
