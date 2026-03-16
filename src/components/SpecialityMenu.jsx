import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react"; // Modern minimal icon

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-28 px-8 bg-white selection:bg-black selection:text-red-500">
      
      {/* --- Minimalist Header --- */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-red-600 font-black uppercase tracking-[0.4em] text-[10px]">
              Expertise Categories
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase leading-none">
              Explore <br /> 
              <span className="text-transparent-red" style={{ WebkitTextStroke: "1px #000" }}>Specialities</span>
            </h2>
          </div>
          
          <div className="max-w-xs">
            <p className="text-sm font-bold text-black-400 leading-relaxed uppercase tracking-tight">
              Direct access to our most <span className="text-red-600">qualified mechanical engineers</span> for every vehicle class.
            </p>
          </div>
        </div>
        <div className="w-full h-px bg-slate-100 mt-10"></div>
      </div>

      {/* --- Modern Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0.5 bg-slate-100 border border-slate-100 max-w-7xl mx-auto overflow-hidden rounded-[2rem]">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={`/mechanics/${item.speciality}`}
            key={index}
            className="group relative bg-white p-10 flex flex-col items-center justify-center transition-all duration-700 hover:z-10"
          >
            {/* Background Hover Slide */}
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]"></div>

            {/* Icon/Image Wrapper */}
            <div className="relative z-10 mb-8 w-40 h-24 transition-transform duration-500 group-hover:scale-110">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:brightness-125 transition-all duration-500"
              />
            </div>

            {/* Text Content */}
            <div className="relative z-10 text-center">
              <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] block mb-2 opacity-100 group-hover:text-white/50 transition-colors">
                {item.Post || "Department"}
              </span>
              <h3 className="text-lg font-black text-black uppercase tracking-tighter group-hover:text-white transition-colors duration-300">
                {item.speciality}
              </h3>
            </div>

            {/* Minimal Arrow Icon */}
            <div className="absolute top-6 right-6 text-slate-200 group-hover:text-red-600 transition-colors duration-300">
              <ArrowUpRight size={20} />
            </div>

            {/* Hover Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-700"></div>
          </Link>
        ))}
      </div>

    </section>
  );
};

export default SpecialityMenu;