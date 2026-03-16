import React, { useContext, useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// --- Premium Dark-Themed Form Component ---
const ServiceForm = () => {
  const { setBookingDetails } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    name: "",
    vehicleModel: "",
    vehicleNumber: "",
    issue: ""
  });

  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingDetails(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); 
  };

  return (
    /* Background: Black, Text: Gray-200, Border: Red Accent */
    <div className="bg-black text-gray-200 p-8 rounded-[2.5rem] shadow-2xl h-fit sticky top-8 border-t-8 border-red-600">
      <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Service Request</h3>
      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">Enter your vehicle details</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">Your Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full px-5 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white focus:border-red-600 outline-none text-sm transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">Model</label>
            <input 
              type="text" 
              placeholder="e.g. Swift"
              className="w-full px-5 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white focus:border-red-600 outline-none text-sm transition-all"
              onChange={(e) => setFormData({...formData, vehicleModel: e.target.value})}
              required
            />
          </div>
          <div className="flex-1">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">Plate #</label>
            <input 
              type="text" 
              placeholder="MH 01..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white focus:border-red-600 outline-none text-sm transition-all"
              onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase ml-2 tracking-widest">Issue Description</label>
          <textarea 
            rows="3"
            placeholder="Describe the problem..."
            className="w-full px-5 py-4 rounded-2xl bg-gray-900 border border-gray-800 text-white focus:border-red-600 outline-none text-sm resize-none transition-all"
            onChange={(e) => setFormData({...formData, issue: e.target.value})}
            required
          ></textarea>
        </div>

        <button 
          type="submit"
          className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl ${
            isSaved 
            ? "bg-red-600 text-white" 
            : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {isSaved ? "✓ Data Locked" : "Confirm Details"}
        </button>
      </form>
    </div>
  );
};

const Services = () => {
  const { speciality } = useParams();
  const { mechanics } = useContext(AppContext);
  const navigate = useNavigate();

  const filteredMechanics = useMemo(() => {
    if (!speciality) return mechanics;
    return mechanics.filter(
      (m) => m.speciality.toLowerCase() === speciality.toLowerCase()
    );
  }, [speciality, mechanics]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      
      {/* Dynamic Header */}
      <div className="mb-12">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
          {speciality ? speciality.replace("_", " ") : "Expert Mechanics"}
        </h2>
        <p className="text-gray-700 mt-2 font-medium">Select a professional after describing your vehicle issue.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Dark Form */}
        <div className="w-full lg:w-[400px] shrink-0">
          <ServiceForm />
        </div>

        {/* Right Side: Mechanic Grid */}
        <div className="flex-1">
          {filteredMechanics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredMechanics.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="bg-slate-50 relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Available</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-8">
                    <p className="text-gray-950 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                      {item.speciality.replace("_", " ")}
                    </p>
                    {/* Name: Black 200 (Slate 900) */}
                    <h3 className="text-2xl font-black text-slate-650 group-hover:text-black-600 transition-colors uppercase tracking-tighter">
                      {item.name}
                    </h3>
                    
                    <div className="flex justify-between items-center border-t pt-6 mt-6 border-slate-50">
                      <div>
                        <p className="text-[10px] text-gray-950 font-bold uppercase tracking-widest">Experience</p>
                        <p className="text-sm font-black text-slate-900">{item.experience}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-950 font-bold uppercase tracking-widest">Consult Fee</p>
                        {/* Fee: Red */}
                        <p className="text-2xl font-black text-red-600">${item.fees}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase tracking-widest">No specialists found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Services;