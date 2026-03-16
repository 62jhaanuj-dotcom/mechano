import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-10 my-20 font-sans">
      <div className="border-t-4 border-black rounded-3xl px-12 py-14 bg-white text-white shadow-2xl">
        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* LEFT */}
          <div>
            <img 
              src={assets.logo} 
              alt="logo" 
              className="w-75 mb-15  " 
            />
            <p className="text-gray-900 text-xl leading-relaxed font-semibold">
              Mechano helps you connect with <span className="text-red-500 font-bold">trusted mechanics</span> for fast, reliable and affordable vehicle service near you.
            </p>
          </div>

          {/* CENTER */}
          <div className="md:ml-15">
            <h3 className="text-4xl font-semibold mb-5 text-black hover:text-red-500 transition-colors ">Quick Links</h3>
            <ul className="space-y-3 text-gray-900 font-semibold text-lg">
              <li>
                <NavLink onClick={() => window.scrollTo(0, 0)} to="/" className="hover:text-red-500 transition-colors">
                  Home
                </NavLink>
              </li>
              <li><NavLink to="/mechanics" className="hover:text-red-500 font-semibold transition-colors">Mechanics</NavLink></li>
              <li><NavLink to="/about" className="hover:text-red-500 font-semibold transition-colors">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-red-500 font-semibold transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-4xl font-semibold mb-5 text-black hover:text-red-500 transition-colors ">Contact</h3>
            <div className="space-y-3 text-gray-900 font-semibold text-lg">
              <p>Bhopal, Madhya Pradesh</p>
              <p>+91 98765 43210</p>
              <p className="text-red-500 font-medium">support@mechano.in</p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-900 font-semibold text-xl mt-12 border-t border-gray-800 pt-6">
          &copy; 2026 <span className="text-red-600">Mechano</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;