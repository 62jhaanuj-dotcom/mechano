import React, { useState, useCallback } from "react";
import ProductGrid from "../components/ProductGrid";
import { Search, SlidersHorizontal, PackageCheck, ChevronDown } from "lucide-react";

// Categories list for filtering
const categories = [
  "Engine Oil",
  "Brake Pads",
  "Filters",
  "Accessories",
  "Tires",
  "Batteries",
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to clear all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <PackageCheck size={14} />
            Official Inventory
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
            Mechano <span className="text-red-600">Store</span>
          </h1>

          <p className="text-slate-500 text-xs md:text-sm uppercase tracking-[0.4em] font-medium">
            High-Performance Automotive Engineering
          </p>
        </div>

        {/* --- SEARCH & FILTER BAR (Sticky) --- */}
        <div className="sticky top-20 z-40 mb-12 space-y-8 bg-[#fafafa]/80 backdrop-blur-md py-4">
          
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by part name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-5 bg-white border border-slate-200 rounded-2xl md:rounded-4xl outline-none shadow-sm focus:ring-4 focus:ring-black/5 focus:border-black transition-all text-base md:text-lg font-medium"
            />
          </div>

          {/* Filter Logic */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-slate-700 text-[10px] font-black uppercase tracking-widest">
              <SlidersHorizontal size={14} />
              Filter by Category
            </div>

            {/* MOBILE VIEW: Custom Styled Select Dropdown */}
            <div className="relative w-full max-w-xs md:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest outline-none focus:border-black shadow-sm transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>

            {/* DESKTOP VIEW: Premium Filter Buttons */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all duration-300 ${
                  selectedCategory === ""
                    ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-105"
                    : "bg-white text-slate-600 border-slate-100 hover:border-black"
                }`}
              >
                All Parts
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-105"
                      : "bg-white text-slate-600 border-slate-100 hover:border-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- PRODUCTS DISPLAY --- */}
        <div className="relative min-h-[400px]">
          {/* Background Decorative Blur */}
          <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
          
          <ProductGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            resetFilters={resetFilters}
          />
        </div>

      </div>
    </div>
  );
};

export default Store;