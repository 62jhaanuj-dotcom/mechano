import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      {/* 1. Page Header with Red Accent */}
      <div className="mb-16 text-center md:text-left">
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4 border-b-[6px] border-red-600 pb-3 inline-block">
          About Mechano
        </h1>
        <p className="text-gray-700 font-bold uppercase tracking-[0.2em] mt-2">
          Redefining Automotive Care
        </p>
      </div>

      {/* 2. Hero Section: Image & Mission */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
        {/* Left: Large Hero Image with grayscale effect */}
        <div className="w-full lg:w-1/2 h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-50">
          <img
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop"
            alt="Mechanic working on an engine"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Right: Mission Statement */}
        <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Our Mission is Simple: <br />
            <span className="text-red-600">Zero Compromise on Quality.</span>
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            At Mechano, we bridge the gap between vehicle owners and top-tier
            automotive experts. We believe that finding a trustworthy mechanic
            shouldn't be a hassle. Our platform guarantees transparent pricing,
            verified professionals, and seamless booking for all your automotive
            needs.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            <div>
              <p className="text-4xl font-black text-slate-900">10k+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Vehicles Repaired
              </p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900">150+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Verified Mechanics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Why Choose Us Section */}
      <div className="mb-24">
        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-10 text-center">
          Why Choose Us
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-red-600 transition-colors">
              1
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
              Verified Experts
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Every mechanic on our platform undergoes a rigorous background
              check and skill assessment to ensure top-quality service.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-red-600 transition-colors">
              2
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
              Transparent Pricing
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              No hidden fees or surprise charges. You see the consultation and
              service costs upfront before you confirm your booking.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 group-hover:bg-red-600 transition-colors">
              3
            </div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
              Instant Booking
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Describe your issue, choose a slot, and get your vehicle fixed
              without waiting in long garage queues.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Bottom Call-to-Action (Premium Dark Card) */}
      <div className="bg-black rounded-[3rem] p-12 text-center shadow-2xl border-t-8 border-red-600 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>

        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 relative z-10">
          Ready to get your vehicle fixed?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
          Join thousands of satisfied car owners who trust Mechano for their
          automotive needs.
        </p>
        <button
          onClick={() => navigate("/mechanics")}
          className="px-10 py-5 bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-95 relative z-10"
        >
          Explore Services
        </button>
      </div>
    </div>
  );
};

export default About;
