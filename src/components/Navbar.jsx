import React, { useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Calendar, ChevronDown, Menu, X, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ADDED isAdmin
  const { user, logout, isAdmin } = useContext(AuthContext);

  const avatarLetter = user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "STORE", path: "/store" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-100 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LOGO */}
        <div onClick={() => navigate("/")} className="cursor-pointer hover:opacity-80 transition-opacity">
          <img className="w-32 md:w-36" src={assets.logo} alt="logo" />
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 font-bold text-[16px] tracking-widest text-black-200">
          {navItems.map((item) => (
            <li key={item.name} className="relative group">
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <span className={`transition-colors duration-300 ${isActive ? "text-black" : "group-hover:text-black"}`}>
                    {item.name}
                  </span>
                )}
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </li>
          ))}

          {/* -------------------- ADMIN LINK ADDED -------------------- */}
          {isAdmin && (
            <li className="relative group">
              <NavLink to="/admin">
                {({ isActive }) => (
                  <span className={`transition-colors duration-300 ${isActive ? "text-black" : "group-hover:text-black"}`}>
                    ADMIN
                  </span>
                )}
              </NavLink>
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </li>
          )}
          {/* ---------------------------------------------------------- */}

        </ul>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="relative">
              {/* MY ACCOUNT BUTTON */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="group flex items-center gap-3 bg-[#1a1a1a] hover:bg-black text-white rounded-full pl-1.5 pr-4 py-1.5 transition-all duration-300 shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm ring-2 ring-white/10 group-hover:scale-110 transition-transform">
                  {avatarLetter}
                </div>
                <span className="hidden sm:block text-[13px] font-bold tracking-wide">
                  MY ACCOUNT
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""} group-hover:translate-y-0.5`}
                />
              </button>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden py-2 z-[60]"
                  >
                    <DropdownItem 
                      icon={<User size={18} />} 
                      label="Profile" 
                      onClick={() => { navigate("/my-profile"); setShowDropdown(false); }} 
                    />

                    <DropdownItem 
                      icon={<Calendar size={18} />} 
                      label="Appointments" 
                      onClick={() => { navigate("/my-appointments"); setShowDropdown(false); }} 
                    />

                    <DropdownItem 
                      icon={<ShoppingBag size={18} />} 
                      label="My Cart" 
                      onClick={() => { navigate("/cart"); setShowDropdown(false); }} 
                    />

                    {/* -------- ADMIN PANEL DROPDOWN LINK -------- */}
                    {isAdmin && (
                      <DropdownItem 
                        icon={<User size={18} />} 
                        label="Admin Dashboard" 
                        onClick={() => { navigate("/admin"); setShowDropdown(false); }} 
                      />
                    )}
                    {/* ------------------------------------------ */}

                    <div className="my-2 border-t border-gray-50" />

                    <DropdownItem 
                      icon={<LogOut size={18} />} 
                      label="Logout" 
                      onClick={logout} 
                      isDanger 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white text-xs font-bold tracking-widest px-7 py-3.5
               rounded-full hover:bg-red-600 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              CREATE ACCOUNT
            </button>
          )}

          {/* MOBILE TOGGLE */}
          <button onClick={() => setShowMenu(true)} className="p-2 md:hidden text-black hover:bg-gray-100 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (same structure, no change required) */}

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] bg-white p-8 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <img className="w-28" src={assets.logo} alt="logo" />
                <button onClick={() => setShowMenu(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) => `text-3xl font-black tracking-tighter transition-colors ${isActive ? "text-red-600" : "text-black hover:text-red-600"}`}
                  >
                    {item.name}
                  </NavLink>
                ))}

                {/* MOBILE ADMIN LINK */}
                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setShowMenu(false)}
                    className="text-3xl font-black tracking-tighter text-black hover:text-red-600"
                  >
                    ADMIN
                  </NavLink>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DropdownItem = ({ icon, label, onClick, isDanger }) => (
  <button
    onClick={onClick}
    className={`group flex items-center gap-3 w-full px-5 py-3.5 text-sm font-bold transition-all duration-200
      ${isDanger ? "text-red-600 hover:bg-red-50" : "text-gray-600 hover:bg-gray-50 hover:text-black"}`}
  >
    <span className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
      {icon}
    </span>
    {label}
  </button>
);

export default Navbar;