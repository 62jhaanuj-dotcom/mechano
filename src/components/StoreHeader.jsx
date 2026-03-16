import React, { useState } from "react";

const ProfessionalHeader = ({
  brandName = "MechanoPro",
  tagline = "Engineering Excellence",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-t-4 border-black border-b border-black-200 rounded-2xl sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar */}
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-black flex items-center justify-center rounded-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>

            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-none">
                {brandName}
              </span>

              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                {tagline}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
          <a className="block py-3 text-slate-700">Catalog</a>
          <a className="block py-3 text-slate-700">Solutions</a>
          <a className="block py-3 text-slate-700">Technical Support</a>

          <button className="w-full bg-black text-white py-3 rounded-md font-semibold mt-2">
            Request Quote
          </button>
        </div>
      )}
    </nav>
  );
};

export default ProfessionalHeader;
