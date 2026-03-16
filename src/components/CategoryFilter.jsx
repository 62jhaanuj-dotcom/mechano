import React from "react";
import { Filter } from "lucide-react";

const CategoryFilter = ({ onCategoryChange }) => {
  const categories = ["All Categories", "Engine Oil", "Brake Pads", "Filters", "Batteries", "Tires", "Accessories"];

  return (
    <div className="relative w-full md:w-72">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
        <Filter className="h-4 w-4 text-gray-400" />
      </div>
      <select 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="block w-full pl-12 pr-10 py-4 border-2 border-black rounded-2xl bg-black text-gray-200 font-black text-xs uppercase tracking-widest appearance-none focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-slate-900 cursor-pointer transition-all shadow-xl"
      >
        {categories.map((category, index) => (
          <option key={index} value={category === "All Categories" ? "" : category}>{category}</option>
        ))}
      </select>
      
      {/* White Custom Dropdown Arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default CategoryFilter;