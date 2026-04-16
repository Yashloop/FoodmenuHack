import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit3, Trash2, UtensilsCrossed, Menu as MenuIcon } from 'lucide-react';
import { adminAPI, userAPI } from '../services/api';
import clsx from 'clsx';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurantForm, setRestaurantForm] = useState({ name: '', description: '' });
const [menuForm, setMenuForm] = useState({ restaurantId: '', name: '', price: '', isAvailable: true });
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', isAvailable: true });

  // Queries
  const { data: restaurants } = useQuery({
    queryKey: ['adminRestaurants'],
    queryFn: userAPI.restaurants,
  });

  const { data: menuItems } = useQuery({
    queryKey: ['adminMenu', selectedRestaurantId],
    queryFn: () => adminAPI.getMenuItems(selectedRestaurantId),
    enabled: !!selectedRestaurantId,
  });

  // Mutations
  const createRestaurantMutation = useMutation({
    mutationFn: adminAPI.createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRestaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      setRestaurantForm({ name: '', description: '' });
    },
  });

  const deleteRestaurantMutation = useMutation({
    mutationFn: adminAPI.deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRestaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });

  const createMenuMutation = useMutation({
    mutationFn: adminAPI.createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu'] });
      setMenuForm({ restaurantId: '', name: '', price: '', isAvailable: true });
    },
  });

  const updateMenuMutation = useMutation({
    mutationFn: ({ id, data }) => adminAPI.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMenu', selectedRestaurantId] });
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu', selectedRestaurantId] });
      setEditingMenuItem(null);
      setEditForm({ name: '', price: '', isAvailable: true });
    },
  });

  const deleteMenuMutation = useMutation({
    mutationFn: (id) => adminAPI.deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminMenu', selectedRestaurantId] });
    },
  });

  const handleCreateRestaurant = (e) => {
    e.preventDefault();
    createRestaurantMutation.mutate({ name: restaurantForm.name, description: restaurantForm.description });
  };

  const handleDeleteRestaurant = (id) => {
    if (confirm('Delete this restaurant?')) {
      deleteRestaurantMutation.mutate(id);
    }
  };

const handleCreateMenu = (e) => {
    e.preventDefault();
    createMenuMutation.mutate({ 
      restaurantId: parseInt(menuForm.restaurantId), 
      name: menuForm.name, 
      price: parseFloat(menuForm.price),
      isAvailable: menuForm.isAvailable 
    });
  };

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurantId(selectedRestaurantId === id ? null : id);
  };

  const handleEditMenuItem = (item) => {
    setEditingMenuItem(item);
    setEditForm({
      name: item.name,
      price: item.price,
      isAvailable: item.isAvailable,
    });
  };

  const handleUpdateMenuItem = (e) => {
    e.preventDefault();
    updateMenuMutation.mutate({
      id: editingMenuItem.id,
      data: {
        restaurantId: selectedRestaurantId,
        name: editForm.name,
        price: parseFloat(editForm.price),
        isAvailable: editForm.isAvailable,
      },
    });
  };

  const handleDeleteMenuItem = (id) => {
    if (confirm('Delete this menu item?')) {
      deleteMenuMutation.mutate(id);
    }
  }; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage restaurants and menu items</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/50 backdrop-blur-md rounded-3xl p-1 shadow-xl mb-12 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={clsx(
              'flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-md',
              activeTab === 'restaurants'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25'
                : 'text-gray-600 hover:text-gray-900 hover:shadow-lg'
            )}
          >
            <UtensilsCrossed className="inline-block mr-2" size={24} />
            Restaurants
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={clsx(
              'flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-md',
              activeTab === 'menu'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25'
                : 'text-gray-600 hover:text-gray-900 hover:shadow-lg'
            )}
          >
            <MenuIcon className="inline-block mr-2" size={24} />
            Menu Items
          </button>
        </div>

        {activeTab === 'restaurants' && (
          <div>
            {/* Create Restaurant Form */}
            <div className="card mb-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Plus size={28} className="text-green-500" />
                Add New Restaurant
              </h2>
              <form onSubmit={handleCreateRestaurant} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Restaurant Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Pizza Palace"
                    value={restaurantForm.name}
                    onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Description</label>
                  <textarea
                    rows="3"
                    className="form-input resize-none"
                    placeholder="Describe your restaurant..."
                    value={restaurantForm.description}
                    onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={createRestaurantMutation.isPending}
                  className="md:col-span-2 btn btn-primary text-lg py-4 shadow-xl md:col-span-2"
                >
                  {createRestaurantMutation.isPending ? 'Creating...' : 'Create Restaurant'}
                </button>
              </form>
            </div>

            {/* Restaurants List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(restaurants) ? restaurants.map((restaurant) => (
                <div key={restaurant.id} className="card group hover:shadow-2xl hover:-translate-y-2">
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-6 flex items-center justify-center">
                    <UtensilsCrossed size={48} className="text-white drop-shadow-lg" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 line-clamp-3">{restaurant.description}</p>
                    
                    {selectedRestaurantId === restaurant.id && (
                      <div>
                        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <MenuIcon size={20} />
                          Menu Items
                        </h4>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          {Array.isArray(menuItems) && menuItems.length > 0 ? menuItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-sm text-gray-600">${item.price} - {item.isAvailable ? 'Available' : 'Unavailable'}</div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditMenuItem(item)}
                                  className="btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          )) : (
                            <p className="text-gray-500 text-center py-4">No menu items yet. Add some from the Menu tab.</p>
                          )}
                        </div>

                        {editingMenuItem && editingMenuItem.restaurantId === restaurant.id && (
                          <div className="p-4 bg-blue-50 rounded-xl border">
                            <h5 className="font-bold mb-3">Edit Menu Item</h5>
                            <form onSubmit={handleUpdateMenuItem} className="grid grid-cols-1 gap-3">
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="form-input"
                                placeholder="Item name"
                              />
                              <input
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                className="form-input"
                                placeholder="Price"
                                step="0.01"
                                min="0"
                              />
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={editForm.isAvailable}
                                  onChange={(e) => setEditForm({ ...editForm, isAvailable: e.target.checked })}
                                  className="w-4 h-4"
                                />
                                Available
                              </label>
                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  disabled={updateMenuMutation.isPending}
                                  className="flex-1 btn bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                  {updateMenuMutation.isPending ? 'Updating...' : 'Update'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingMenuItem(null);
                                    setEditForm({ name: '', price: '', isAvailable: true });
                                  }}
                                  className="px-4 btn bg-gray-500 hover:bg-gray-600 text-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => handleSelectRestaurant(restaurant.id)}
                        className="flex-1 btn bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Edit3 size={20} className="mr-2" />
                        {selectedRestaurantId === restaurant.id ? 'Hide Menu' : 'View/Edit Menu'}
                      </button>
                      <button
                        onClick={() => handleDeleteRestaurant(restaurant.id)}
                        className="px-6 btn btn-danger"
                        disabled={deleteRestaurantMutation.isPending}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Plus size={28} className="text-green-500" />
                Add Menu Item
              </h2>
              <form onSubmit={handleCreateMenu} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Restaurant</label>
                  <select
                    required
                    className="form-input"
                    value={menuForm.restaurantId}
                    onChange={(e) => setMenuForm({ ...menuForm, restaurantId: e.target.value })}
                  >
                    <option value="">Select restaurant</option>
                    {Array.isArray(restaurants) && restaurants.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Item Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Margherita Pizza"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                    placeholder="12.99"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      checked={menuForm.isAvailable}
                      onChange={(e) => setMenuForm({ ...menuForm, isAvailable: e.target.checked })}
                    />
                    Available
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={createMenuMutation.isPending}
                  className="md:col-span-2 btn btn-primary text-lg py-4 shadow-xl"
                >
                  {createMenuMutation.isPending ? 'Creating...' : 'Add Menu Item'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

