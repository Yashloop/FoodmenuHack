import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { userAPI } from '../services/api';
import { useState, useMemo } from 'react';
import MenuItem from '../components/MenuItem';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: restaurants, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: userAPI.restaurants,
  });

  const filteredRestaurants = useMemo(() => {
    if (!Array.isArray(restaurants)) return [];
    if (!searchTerm.trim()) return restaurants;
    
    const term = searchTerm.toLowerCase();
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(term)
    );
  }, [restaurants, searchTerm]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading restaurants...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-600">
      Error loading restaurants
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            Order Delicious Food
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Discover amazing restaurants near you and enjoy fresh meals delivered to your door
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {searchTerm && (
          <div className="mb-6 text-gray-600">
            Found <span className="font-bold text-gray-900">{filteredRestaurants.length}</span> restaurant(s) for "{searchTerm}"
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="group card hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden h-full">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl mb-6 p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-5xl">🍕</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">{restaurant.description}</p>
                
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  className="block w-full btn btn-primary mt-6"
                >
                  View Menu
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">{searchTerm ? `No restaurants found for "${searchTerm}"` : 'No restaurants available'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

