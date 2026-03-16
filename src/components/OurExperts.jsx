import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { db } from "../utils/firebase"; // Firebase config import
import { collection, getDocs } from "firebase/firestore";

/**
 * @component OurExperts
 * @description Displays a grid of mechanics with real-time availability status 
 * synchronized with the Admin Appointment Panel.
 */
const OurExperts = () => {
  // 1. Context se mechanics data (local assets) nikalna
  const { mechanics } = useContext(AppContext);
  

  // 2. Appointments state status check karne ke liye
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Firestore se appointments fetch karne ka logic
  const fetchGlobalStatus = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "appointments"));
      const apptData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(apptData);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalStatus();
  }, []);

  return (
    <section className="flex flex-col items-center gap-8 my-16 text-gray-900 md:mx-10 animate-in fade-in duration-700">
      
      {/* --- TITLE SECTION --- */}
      <div className="text-center space-y-4 px-4">
        
        <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] tracking-tighter leading-none uppercase">
          Our Top <span className="text-red-600">Experts</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-lg text-black-500 leading-relaxed font-semibold">
          Connect with our team of <span className="text-slate-900 font-bold underline decoration-red-500 decoration-2 underline-offset-4">certified technicians</span>. 
          From rapid diagnostics to precision repairs, book your expert 
          session in just a few clicks.
        </p>
      </div>

      {/* --- EXPERTS GRID --- */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 pt-10 px-6 sm:px-0">
        
        {mechanics.slice(0, 10).map((item) => {
          
          // --- LOGIC: Check if this mechanic is currently busy ---
          // Hum appointments array mein dhund rahe hain ki kya koi 'active' status 
          // wali entry is mechanic ke ID ke saath match karti hai.
          const activeJob = appointments.find(
            (appt) => appt.mechanicId === item._id && appt.status === "active"
          );

          return (
            <Link
              to={`/appointment/${item._id}`}
              key={item._id}
              className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
            >
              {/* IMAGE CONTAINER */}
              <div className="bg-[#F8FAFC] relative overflow-hidden h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${
                    activeJob ? "grayscale-0" : "grayscale-0"
                  }`}
                />

                {/* --- DYNAMIC AVAILABILITY BADGE --- */}
                <div 
                  className={`absolute top-5 left-5 flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border transition-colors duration-500 ${
                    activeJob 
                      ? "bg-red-600/90 border-red-500 text-white" 
                      : "bg-white/90 border-slate-100 text-green-600"
                  }`}
                >
                  {/* Status Dot */}
                  <span className={`w-2 h-2 rounded-full ${
                    activeJob ? "bg-white animate-pulse" : "bg-green-500 animate-pulse"
                  }`}></span>

                  {/* Status Text */}
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                    {activeJob ? "Busy" : "Available"}
                  </span>
                </div>
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* EXPERT DETAILS */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                   <p className="text-balck-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {item.speciality.replace("_", " ")}
                  </p>
                  {activeJob && (
                    <span className="text-[9px] font-bold text-red-500 animate-bounce">● Live Job</span>
                  )}
                </div>

                <h3 className="text-[#1E293B] text-2xl font-black truncate group-hover:text-red-600 transition-colors tracking-tighter uppercase">
                  {item.name}
                </h3>

                <hr className="border-slate-50 my-6" />

                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-black-400 uppercase font-black tracking-widest">
                      Experience
                    </p>
                    <p className="text-sm font-black text-slate-800 italic">
                      {item.experience}
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest">
                      Session Fee
                    </p>
                    <p className="text-2xl font-black text-red-600 tracking-tighter">
                      ${item.fees}
                    </p>
                  </div>
                </div>
                
                {/* Action Trigger */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                   <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Book Now</span>
                   <div className="h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs">→</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* --- VIEW ALL SERVICES BUTTON --- */}
      <Link to="/mechanics" className="mt-12">
        <button className="group relative flex items-center gap-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em] px-12 py-5 rounded-2xl hover:bg-red-600 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-red-500/40 active:scale-95 overflow-hidden">
          <span className="relative z-10">Explore All Services</span>
          <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">→</span>
          
          {/* Animated Background Slide */}
          <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </Link>

      

    </section>
  );
};

export default OurExperts;