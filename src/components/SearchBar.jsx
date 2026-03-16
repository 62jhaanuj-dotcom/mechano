import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-96">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="SEARCH CAR PARTS..."
        className="block w-full pl-14 pr-6 py-4 border-2 border-slate-200 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest focus:outline-none focus:border-black focus:shadow-lg transition-all shadow-sm placeholder:text-gray-300"
      />
    </div>
  );
};

export default SearchBar;