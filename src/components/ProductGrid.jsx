import React, { useMemo, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { 
  SearchX, 
  RefreshCcw, 
  LayoutGrid, 
  ArrowUpDown, 
  PackageSearch,
  Zap,
  Filter,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";

// Aapka data yahan se aa raha hai (Variable name matched with your snippet)
import { productsData } from "../assets/assets_frontend/assets";

const ProductGrid = ({
  searchQuery = "",
  selectedCategory = "",
  resetFilters,
}) => {
  // ---------- 1. STATES ----------
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // ---------- 2. DATA INITIALIZATION ----------
  useEffect(() => {
    // Assets se data load karne ka realistic simulation
    const initData = () => {
      setIsLoading(true);
      try {
        // Checking if data exists to prevent crashes
        if (productsData) {
          setProducts(productsData);
        }
      } catch (err) {
        console.error("Data Load Error:", err);
      } finally {
        // Halka sa delay premium feel ke liye
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    initData();
  }, []);

  // ---------- 3. ADVANCED FILTER & SORT LOGIC ----------
  const filteredProducts = useMemo(() => {
    const search = searchQuery.toLowerCase().trim();
    const category = selectedCategory.toLowerCase().trim();

    // Filtering Logic (Deep Search)
    let result = products.filter((product) => {
      const pName = product.name?.toLowerCase() || "";
      const pCat = product.category?.toLowerCase() || "";
      const pDesc = product.description?.toLowerCase() || "";
      const pBrand = product.brand?.toLowerCase() || "genuine";

      const matchesCategory = !category || pCat === category;
      
      // Search matches in Name, Category, or Brand
      const matchesSearch =
        !search ||
        pName.includes(search) ||
        pCat.includes(search) ||
        pBrand.includes(search) ||
        pDesc.includes(search);

      return matchesCategory && matchesSearch;
    });

    // Sorting Logic
    if (sortBy === "lowToHigh") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // ---------- 4. RENDER: SKELETON LOADING ----------
  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="flex flex-col gap-4">
            <div className="h-72 w-full bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
            <div className="h-6 w-3/4 bg-slate-100 animate-pulse rounded-full ml-4"></div>
            <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-full ml-4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-[700px] pb-24">
      
      {/* --- HEADER SECTION: Stats & Filters --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Premium Inventory</span>
          </div>
          <h2 className="text-slate-900 font-black uppercase tracking-tighter text-3xl md:text-4xl">
            Explore <span className="text-slate-400">Parts</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-full">
              <LayoutGrid size={12} />
              {filteredProducts.length} Items Found
            </span>
            {selectedCategory && (
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                Category: {selectedCategory}
              </span>
            )}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64 group">
            <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-red-600 transition-colors" size={14} />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-11 pr-8 py-4 bg-white border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest appearance-none focus:outline-none focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm hover:border-slate-300 cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="rating">Top Rated First</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product._id || product.id} 
              item={product} 
            />
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE (Advanced UI) --- */
        <div className="py-24 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[4rem] border-2 border-dashed border-slate-200 mx-4">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-red-100 rounded-full scale-[2] animate-pulse opacity-20"></div>
            <div className="relative bg-white p-10 rounded-full shadow-2xl border border-slate-100">
              <PackageSearch size={80} className="text-slate-200" strokeWidth={1} />
            </div>
          </div>

          <h3 className="text-slate-900 font-black uppercase tracking-tighter text-3xl mb-4">
            No Spare Parts Found
          </h3>
          
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-10 px-8 font-medium">
            We couldn't find any results for 
            <span className="text-red-600 font-black mx-1 underline underline-offset-4">
              "{searchQuery || selectedCategory}"
            </span>. 
            Try different keywords or reset filters.
          </p>

          <button
            onClick={resetFilters}
            className="group flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-red-200"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
            Reset All Filters
          </button>
        </div>
      )}

      {/* --- BOTTOM SECTION --- */}
      {filteredProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap size={14} className="fill-red-600 text-red-600 animate-bounce" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              End of Catalog
            </p>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-900 hover:text-red-600 transition-colors"
          >
            Back To Top <ArrowUpRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;