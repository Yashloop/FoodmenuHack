import React, { useState, useEffect } from "react";
import { adminAPI } from "../services/api";
import {
  Plus,
  Trash2,
  Edit,
  Home,
  Menu as MenuIcon,
  Users,
} from "lucide-react";
import { Tab } from "@headlessui/react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { name: "Restaurants", icon: Home },
    { name: "Menu Items", icon: MenuIcon },
    { name: "Users", icon: Users },
  ];

  const handleAddRestaurant = async () => {
    try {
      await adminAPI.createRestaurant(newRestaurant);
      setNewRestaurant({ name: "", description: "" });
      // Refresh list
      const response = await adminAPI.getRestaurants(); // Assume this endpoint exists
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error adding restaurant");
    }
  };

  useEffect(() => {
    // Fetch restaurants
    const fetchData = async () => {
      try {
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <Users className="h-7 w-7 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your food ordering platform</p>
        </div>
      </div>

      <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `w-full py-3 px-4 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 ${
                  selected
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {({ selected }) => (
                <>
                  <tab.icon
                    className={`h-5 w-5 ${selected ? "text-white" : "text-gray-400"}`}
                  />
                  <span>{tab.name}</span>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {/* Restaurants Tab */}
          <Tab.Panel className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <Home className="h-8 w-8" />
                  <span>Restaurants</span>
                </h2>
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
                  <Plus className="h-5 w-5" />
                  <span>Add Restaurant</span>
                </button>
              </div>

              <div className="grid gap-4">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-xl group hover:bg-white hover:shadow-md transition-all"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <p className="text-gray-600">{restaurant.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-orange-100 rounded-lg">
                        <Edit className="h-5 w-5 text-orange-600" />
                      </button>
                      <button className="p-2 hover:bg-red-100 rounded-lg">
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Restaurant Form */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Add New Restaurant</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={newRestaurant.name}
                    onChange={(e) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    value={newRestaurant.description}
                    onChange={(e) =>
                      setNewRestaurant({
                        ...newRestaurant,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description of the restaurant"
                  />
                </div>
              </div>
              <button
                onClick={handleAddRestaurant}
                className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold transition w-full md:w-auto"
              >
                Create Restaurant
              </button>
            </div>
          </Tab.Panel>

          {/* Menu Items Tab */}
          <Tab.Panel className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Menu Items Management
              </h2>
              {/* Table or cards for menu items */}
              <p className="text-gray-500">
                Menu items CRUD interface goes here
              </p>
            </div>
          </Tab.Panel>

          {/* Users Tab */}
          <Tab.Panel className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Users Management
              </h2>
              {/* Users table */}
              <p className="text-gray-500">
                Users management interface goes here
              </p>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminDashboard;
