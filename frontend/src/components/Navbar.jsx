import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import clsx from 'clsx';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">🍕 FoodHub</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary-600 flex items-center gap-1 font-medium">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-primary-600 flex items-center gap-1 font-medium">
                  <ShoppingCart size={20} />
                  Cart
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600 flex items-center gap-1 font-medium">
                  Orders
                </Link>
              </>
            )}
            {isAuthenticated && role === 'ADMIN' && (
              <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium">
                Admin
              </Link>
            )}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <User size={20} className="text-gray-600" />
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary text-sm px-4"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-primary text-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-secondary text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-primary-600 py-2" onClick={() => setMobileOpen(false)}>Home</Link>
            {isAuthenticated && (
              <>
                <Link to="/cart" className="block text-gray-700 hover:text-primary-600 py-2" onClick={() => setMobileOpen(false)}>Cart</Link>
                <Link to="/orders" className="block text-gray-700 hover:text-primary-600 py-2" onClick={() => setMobileOpen(false)}>Orders</Link>
              </>
            )}
            {isAuthenticated && role === 'ADMIN' && (
              <Link to="/admin" className="block text-gray-700 hover:text-primary-600 py-2" onClick={() => setMobileOpen(false)}>Admin</Link>
            )}
            <div className="pt-2">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full text-left btn btn-secondary text-sm">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="block w-full text-left btn btn-primary text-sm mb-2" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="block w-full text-left btn btn-secondary text-sm" onClick={() => setMobileOpen(false)}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

