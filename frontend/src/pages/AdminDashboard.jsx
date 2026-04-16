import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit3, Trash2, UtensilsCrossed, Menu as MenuIcon, X, Check } from 'lucide-react';
import { adminAPI, userAPI } from '../services/api';
import clsx from 'clsx';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurantForm, setRestaurantForm] = useState({ name: '', description: '' });
  const [menuForm, setMenuForm] = useState({ restaurantId: '', name: '', price: '', isAvailable: true });
  
  // Edit states
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editRestaurantForm, setEditRestaurantForm] = useState({ name: '', description: '' });
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [editMenuItemForm, setEditMenuItemForm] = useState({ name: '', price: '', isAvailable: true });
  const [selectedRestaurantForMenu, setSelectedRestaurantForMenu] = useState(null);

  // Queries
  const { data: restaurants } = useQuery({
    queryKey: ['adminRestaurants'],
    queryFn: userAPI.restaurants,
  });

  const { data: menuItems } = useQuery({
    queryKey: ['restaurantMenu', selectedRestaurantForMenu],
    queryFn: () => userAPI.restaurantMenu(selectedRestaurantForMenu),
    enabled: !!selectedRestaurantForMenu,
  });

  // Mutations
  const createRestaurantMutation = useMutation({
    mutationFn: adminAPI.createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRestaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      setRestaurantForm({ name: '', description: '' });
      toast.success('Restaurant created successfully');
    },
    onError: () => toast.error('Failed to create restaurant'),
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: ({ id, data }) => adminAPI.updateRestaurant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRestaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      setEditingRestaurant(null);
      toast.success('Restaurant updated successfully');
    },
    onError: () => toast.error('Failed to update restaurant'),
  });

  const deleteRestaurantMutation = useMutation({
    mutationFn: adminAPI.deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRestaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant deleted successfully');
    },
    onError: () => toast.error('Failed to delete restaurant'),
  });

  const createMenuMutation = useMutation({
    mutationFn: adminAPI.createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu', selectedRestaurantForMenu] });
      setMenuForm({ restaurantId: '', name: '', price: '', isAvailable: true });
      toast.success('Menu item created successfully');
    },
    onError: () => toast.error('Failed to create menu item'),
  });

  const updateMenuMutation = useMutation({
    mutationFn: ({ id, data }) => adminAPI.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu', selectedRestaurantForMenu] });
      setEditingMenuItem(null);
      toast.success('Menu item updated successfully');
    },
    onError: () => toast.error('Failed to update menu item'),
  });

  const deleteMenuMutation = useMutation({
    mutationFn: adminAPI.deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurantMenu', selectedRestaurantForMenu] });
      toast.success('Menu item deleted successfully');
    },
    onError: () => toast.error('Failed to delete menu item'),
  });

  // Restaurant Handlers
  const handleCreateRestaurant = (e) => {
    e.preventDefault();
    createRestaurantMutation.mutate({ name: restaurantForm.name, description: restaurantForm.description });
  };

  const handleEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant.id);
    setEditRestaurantForm({ name: restaurant.name, description: restaurant.description });
  };

  const handleSaveRestaurant = () => {
    if (editingRestaurant) {
      updateRestaurantMutation.mutate({
        id: editingRestaurant,
        data: { name: editRestaurantForm.name, description: editRestaurantForm.description },
      });
    }
  };

  const handleDeleteRestaurant = (id) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      deleteRestaurantMutation.mutate(id);
    }
  };

  // Menu Handlers
  const handleCreateMenu = (e) => {
    e.preventDefault();
    createMenuMutation.mutate({ 
      restaurantId: parseInt(menuForm.restaurantId), 
      name: menuForm.name, 
      price: parseFloat(menuForm.price),
      isAvailable: menuForm.isAvailable 
    });
  };

  const handleEditMenuItem = (item) => {
    setEditingMenuItem(item.id);
    setEditMenuItemForm({ name: item.name, price: item.price, isAvailable: item.isAvailable });
  };

  const handleSaveMenuItem = () => {
    if (editingMenuItem) {
      updateMenuMutation.mutate({
        id: editingMenuItem,
        data: { restaurantId: selectedRestaurantForMenu, name: editMenuItemForm.name, price: parseFloat(editMenuItemForm.price), isAvailable: editMenuItemForm.isAvailable },
      });
    }
  };

  const handleDeleteMenuItem = (id) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
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
                  {editingRestaurant === restaurant.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-900">Edit Restaurant</h3>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Restaurant name"
                        value={editRestaurantForm.name}
                        onChange={(e) => setEditRestaurantForm({ ...editRestaurantForm, name: e.target.value })}
                      />
                      <textarea
                        className="form-input resize-none"
                        rows="3"
                        placeholder="Description"
                        value={editRestaurantForm.description}
                        onChange={(e) => setEditRestaurantForm({ ...editRestaurantForm, description: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveRestaurant}
                          disabled={updateRestaurantMutation.isPending}
                          className="flex-1 btn bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                        >
                          <Check size={20} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingRestaurant(null)}
                          className="flex-1 btn bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center gap-2"
                        >
                          <X size={20} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="aspect-[4/3] bg-gradient-to-br from-orange-400 to-red-500 rounded-xl mb-6 flex items-center justify-center">
                        <UtensilsCrossed size={48} className="text-white drop-shadow-lg" />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                        <p className="text-gray-600 line-clamp-3">{restaurant.description}</p>
                        
                        <div className="flex gap-3 pt-4">
                          <button
                            onClick={() => handleEditRestaurant(restaurant)}
                            className="flex-1 btn bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <Edit3 size={20} className="mr-2" />
                            Edit
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
                    </>
                  )}
                </div>
              )) : null}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="max-w-4xl mx-auto">
            <div className="card mb-12">
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

            {/* Select Restaurant to View Menu Items */}
            <div className="card mb-12">
              <h2 className="text-2xl font-bold mb-6">View & Edit Menu Items</h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Select Restaurant</label>
                <select
                  className="form-input"
                  value={selectedRestaurantForMenu || ''}
                  onChange={(e) => setSelectedRestaurantForMenu(e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">Choose a restaurant</option>
                  {Array.isArray(restaurants) && restaurants.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Menu Items List */}
            {selectedRestaurantForMenu && menuItems && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-6">Menu Items</h3>
                {menuItems.length > 0 ? (
                  menuItems.map((item) => (
                    <div key={item.id} className="card">
                      {editingMenuItem === item.id ? (
                        // Edit Mode
                        <div className="space-y-4">
                          <h4 className="text-lg font-bold text-gray-900">Edit Menu Item</h4>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Item name"
                            value={editMenuItemForm.name}
                            onChange={(e) => setEditMenuItemForm({ ...editMenuItemForm, name: e.target.value })}
                          />
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              className="form-input"
                              placeholder="Price"
                              value={editMenuItemForm.price}
                              onChange={(e) => setEditMenuItemForm({ ...editMenuItemForm, price: e.target.value })}
                            />
                          </div>
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                              checked={editMenuItemForm.isAvailable}
                              onChange={(e) => setEditMenuItemForm({ ...editMenuItemForm, isAvailable: e.target.checked })}
                            />
                            Available
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveMenuItem}
                              disabled={updateMenuMutation.isPending}
                              className="flex-1 btn bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                            >
                              <Check size={20} />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingMenuItem(null)}
                              className="flex-1 btn bg-gray-500 hover:bg-gray-600 text-white flex items-center justify-center gap-2"
                            >
                              <X size={20} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                            <p className="text-lg font-semibold text-green-600 mt-2">${parseFloat(item.price).toFixed(2)}</p>
                            <p className={clsx('text-sm font-medium mt-2', item.isAvailable ? 'text-green-600' : 'text-red-600')}>
                              {item.isAvailable ? '✓ Available' : '✗ Not Available'}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditMenuItem(item)}
                              className="btn bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                            >
                              <Edit3 size={20} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="btn btn-danger flex items-center gap-2"
                              disabled={deleteMenuMutation.isPending}
                            >
                              <Trash2 size={20} />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-8">No menu items for this restaurant</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

