import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MenuItem from "../components/MenuItem";
import {
  Search,
  MapPin,
  ShoppingCart,
  Star,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { userAPI } from "../services/api";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Your location");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(false);

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true);
      try {
        const response = await userAPI.getRestaurants();
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const handleRestaurantClick = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    setMenu([]);
    setMenuLoading(true);
    try {
      const response = await userAPI.getMenu(restaurant.id);
      setMenu(response.data);
    } catch (error) {
      console.error("Failed to load menu:", error);
      setMenu([]);
    } finally {
      setMenuLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-orange-200 border-t-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="rounded-[32px] bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8 shadow-2xl border border-orange-100 overflow-hidden">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <ShoppingCart className="h-4 w-4" />
              Fast delivery, fresh menus
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
              Discover top restaurants and order your favorite dishes in
              seconds.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Browse curated restaurants, explore new menus, and enjoy a
              seamless ordering experience with real-time updates and secure
              checkout.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  Top ratings
                </p>
                <div className="mt-3 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <Star className="h-5 w-5 text-orange-500" />
                  4.9+ Reviews
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  Delivery speed
                </p>
                <div className="mt-3 flex items-center gap-2 text-xl font-bold text-slate-900">
                  <Clock className="h-5 w-5 text-orange-500" />
                  20-30 min
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <p className="text-sm font-semibold text-slate-500">
                  Trusted restaurants
                </p>
                <div className="mt-3 text-xl font-bold text-slate-900">
                  Local favorites
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Featured
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  Popular kitchens
                </h2>
              </div>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                {restaurants.length} restaurants
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {restaurants.slice(0, 3).map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="rounded-3xl border border-slate-200 p-4 hover:border-orange-200 transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-100 text-3xl">
                      {restaurant.image}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {restaurant.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {restaurant.deliveryTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Browse restaurants
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Search by name, cuisine, or restaurant to find exactly what you
              want.
            </p>
          </div>
          <div className="max-w-xl w-full relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-700 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition"
            />
          </div>
        </div>
      </section>

      {selectedRestaurant ? (
        <div className="space-y-8">
          <button
            type="button"
            onClick={() => setSelectedRestaurant(null)}
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to restaurants
          </button>

          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-[28px] bg-orange-100 text-5xl">
                    {selectedRestaurant.image}
                  </div>
                  <h2 className="mt-6 text-3xl font-semibold text-slate-900">
                    {selectedRestaurant.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-slate-600">
                    {selectedRestaurant.description}
                  </p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-6 text-slate-900">
                  <div className="text-sm uppercase tracking-[0.24em] text-orange-600">
                    Restaurant info
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Rating</span>
                      <span className="text-sm font-semibold">
                        {selectedRestaurant.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Delivery</span>
                      <span className="text-sm font-semibold">
                        {selectedRestaurant.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Location</span>
                      <span className="text-sm font-semibold">{location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] bg-white p-8 shadow-xl border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">
                  Why order here?
                </h3>
                <ul className="mt-6 space-y-4 text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-3xl bg-orange-100 text-orange-600 grid place-items-center">
                      <Star className="h-5 w-5" />
                    </span>
                    <span>High-rated dishes prepared fresh every day.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-3xl bg-orange-100 text-orange-600 grid place-items-center">
                      <Clock className="h-5 w-5" />
                    </span>
                    <span>Fast delivery with real-time tracking.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[32px] bg-orange-50 p-8 shadow-inner border border-orange-100">
                <h3 className="text-lg font-semibold text-orange-700">
                  Menu overview
                </h3>
                <p className="mt-3 text-sm text-orange-600">
                  Choose from a variety of meals designed to delight everyone.
                </p>
              </div>
            </aside>
          </div>

          {menuLoading ? (
            <div className="rounded-[32px] bg-white p-10 shadow-xl border border-slate-200 text-center text-slate-500">
              Loading menu items...
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {menu.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          )}

          {!menuLoading && menu.length === 0 && (
            <div className="rounded-[32px] bg-white p-10 shadow-xl border border-slate-200 text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900">
                No menu items available
              </h3>
              <p className="mt-2 text-slate-500">
                Check back later for delicious food.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900">
                Choose a restaurant
              </h2>
              <p className="mt-2 text-slate-500">
                Browse the best local restaurants and explore their menus.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              {filteredRestaurants.length} places available
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group overflow-hidden rounded-[32px] bg-white shadow-xl border border-slate-200 transition hover:-translate-y-1"
                onClick={() => handleRestaurantClick(restaurant)}
              >
                <div className="relative h-64 bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                  <span className="text-6xl">{restaurant.image}</span>
                  <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-orange-600">
                    {restaurant.deliveryTime}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {restaurant.name}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                        {restaurant.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                      <Star className="h-4 w-4" />
                      {restaurant.rating}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
                  >
                    View menu
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="rounded-[32px] bg-white p-10 shadow-xl border border-slate-200 text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900">
                No restaurants found
              </h3>
              <p className="mt-2 text-slate-500">
                Try another search term or refresh the page.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
