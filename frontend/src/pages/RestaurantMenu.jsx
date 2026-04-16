import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { userAPI } from '../services/api';
import MenuItem from '../components/MenuItem';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: userAPI.restaurants,
  });

  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['restaurantMenu', id],
    queryFn: () => userAPI.restaurantMenu(id),
    enabled: !!id,
  });

  const filteredMenuItems = useMemo(() => {
    if (!Array.isArray(menuItems)) return [];
    if (!searchTerm.trim()) return menuItems;
    
    const term = searchTerm.toLowerCase();
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(term)
    );
  }, [menuItems, searchTerm]);

  const restaurant = Array.isArray(restaurants)
    ? restaurants.find((r) => String(r.id) === String(id))
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load menu
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-600 font-medium mb-6">
          <ArrowLeft size={18} />
          Back to Restaurants
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {restaurant?.name || 'Restaurant Menu'}
        </h1>
        {restaurant?.description && (
          <p className="text-gray-600 mb-8">{restaurant.description}</p>
        )}

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2">
              Found <span className="font-bold">{filteredMenuItems.length}</span> item(s)
            </p>
          )}
        </div>

        {Array.isArray(filteredMenuItems) && filteredMenuItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-600">
            {searchTerm ? `No menu items found for "${searchTerm}"` : 'No menu items available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
