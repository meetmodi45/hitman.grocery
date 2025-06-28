import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-20 py-3 border-b border-gray-200 bg-white shadow-sm relative transition-all duration-300">
        <NavLink to="#" className="flex-shrink-0">
          <img
            className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
            src="/hitman.grocery.logo.png"
            alt="Hitman Grocery Logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 lg:gap-8">
          <NavLink
            to="/"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            All Products
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </NavLink>

          <div className="hidden lg:flex items-center text-sm gap-2 border-2 border-gray-200 hover:border-primary/50 focus-within:border-primary px-4 py-2 rounded-full bg-gray-50 hover:bg-white transition-all duration-200 shadow-sm">
            <input
              className="py-1 w-full bg-transparent outline-none placeholder-gray-400 text-gray-700 min-w-[180px]"
              type="text"
              placeholder="Search products..."
            />
            <img
              src={assets.search_icon}
              alt="searchIcon"
              className="w-4 h-4 opacity-60"
            />
          </div>

          <div className="relative cursor-pointer group">
            <NavLink to="/cart">
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <img
                  src={assets.nav_cart_icon}
                  alt="cartIcon"
                  className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                />
                <button className="absolute -top-1 -right-1 text-xs text-white bg-primary hover:bg-primary-dark w-5 h-5 rounded-full flex items-center justify-center font-semibold shadow-lg transition-all duration-200 hover:scale-110">
                  3
                </button>
              </div>
            </NavLink>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2.5 bg-primary hover:bg-primary-dark transition-all duration-200 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
                alt="User Profile"
              />

              <ul className="hidden group-hover:flex flex-col absolute top-10 right-0 bg-white shadow-xl border border-gray-100 py-2 min-w-[160px] rounded-lg text-sm z-50 pt-3">
                <li
                  onClick={goToOrders}
                  className="px-4 py-3 hover:bg-primary/5 text-gray-700 cursor-pointer transition-colors duration-150 font-medium"
                >
                  My Orders
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-3 hover:bg-primary/5 text-gray-700 cursor-pointer transition-colors duration-150 font-medium border-t border-gray-100"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <img src={assets.menu_icon} alt="menuIcon" className="w-6 h-6" />
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            open
              ? "flex opacity-100 translate-y-0"
              : "hidden opacity-0 -translate-y-2"
          } absolute top-[72px] left-0 w-full bg-white shadow-xl border-t border-gray-100 py-4 flex-col items-start gap-1 px-6 text-sm md:hidden transition-all duration-300 z-40`}
        >
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="w-full py-3 px-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setOpen(false)}
            className="w-full py-3 px-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
          >
            All Products
          </NavLink>
          {user && (
            <button
              onClick={() => {
                navigate("/orders");
                setOpen(false);
              }}
              className="w-full text-left py-3 px-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
            >
              My orders
            </button>
          )}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="w-full py-3 px-2 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
          >
            Contact
          </NavLink>
          <div className="w-full border-t border-gray-100 mt-2 pt-3">
            {!user ? (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block w-full"
              >
                <button className="w-full cursor-pointer px-6 py-3 bg-primary hover:bg-primary-dark transition-all duration-200 text-white font-medium rounded-lg shadow-md">
                  Login
                </button>
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-medium rounded-lg shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
