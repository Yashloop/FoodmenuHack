import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart, User, LogOut, Menu, Home, Package } from "lucide-react";

const Layout = ({ children }) => {
  const { user, role, logout } = useAuth();
  const { cartItems, getTotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between h-20 gap-4">
            <Link
              to="/"
              className="flex items-center space-x-3 text-xl font-bold text-orange-600"
            >
              <ShoppingCart size={28} />
              <span>FoodMenu</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-3">
              {!user ? (
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-orange-600 px-4 py-2 rounded-full text-sm font-medium border border-slate-200 bg-white shadow-sm"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${location.pathname === "/" ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:text-orange-600"}`}
                  >
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/cart"
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 relative ${location.pathname === "/cart" ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:text-orange-600"}`}
                  >
                    <ShoppingCart size={18} />
                    <span>Cart</span>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/orders"
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${location.pathname === "/orders" ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:text-orange-600"}`}
                  >
                    <Package size={18} />
                    <span>Orders</span>
                  </Link>
                  {role === "ADMIN" && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${isAdminRoute ? "bg-orange-50 text-orange-600" : "text-slate-700 hover:text-orange-600"}`}
                    >
                      <User size={18} />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:text-orange-600 flex items-center space-x-2 border border-slate-200 bg-white shadow-sm"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </nav>

            <div className="lg:hidden">
              <button className="p-2 rounded-full text-slate-700 bg-white shadow-sm">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
          © 2024 FoodMenu. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
