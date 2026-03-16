import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import emailjs from '@emailjs/browser';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { 
  User, 
  Car, 
  Wrench, 
  ArrowLeft, 
  Check, 
  X, 
  Clock, 
  AlertCircle,
  Search,
  RefreshCcw,
  MailCheck,
  Filter,
  ShieldCheck
} from "lucide-react";

// --- CONFIGURATION ---
const SERVICE_ID = "service_tel9wvl";
const TEMPLATE_ID = "template_yrtv47v";
const PUBLIC_KEY = "WZO2deqICuAdQjOD4";

// --- 1. PREMIUM LOADER ---
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-48 bg-white">
    <div className="relative w-20 h-1 bg-slate-100 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-red-600 animate-[loading_1.5s_infinite_ease-in-out]"></div>
    </div>
    <p className="mt-4 text-[10px] font-black text-black uppercase tracking-[0.4em] animate-pulse">
      Synchronizing Fleet Operations
    </p>
  </div>
);

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Add-on: Filtered state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Add-on: Search bar
  const [activeFilter, setActiveFilter] = useState("all");

  // --- 2. FETCH DATA LOGIC ---
  const getAppointments = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "appointments"));
      const data = await Promise.all(
        snapshot.docs.map(async (docItem) => {
          const appointmentData = docItem.data();
          let userData = {};
          if (appointmentData.userId) {
            const userRef = doc(db, "users", appointmentData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) userData = userSnap.data();
          }
          return { id: docItem.id, ...appointmentData, user: userData };
        })
      );
      setAppointments(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  // --- 3. EMAIL AUTOMATION LOGIC ---
  const sendCompletionEmail = async (item, user) => {
    const templateParams = {
      to_email: user.email,
      user_name: user.name || "Customer",
      car_model: item.vehicleModel,
      car_number: item.vehicleNumber,
      mechanic_name: item.mechanicName || "Mechano Expert",
      issue: item.issue,
      payment_amount: item.price || "To be discussed"
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error("Email Error:", error);
      return false;
    }
  };

  // --- 4. ENHANCED STATUS UPDATE ---
  const handleStatusChange = async (id, newStatus, item, user) => {
    try {
      const ref = doc(db, "appointments", id);
      let updatePayload = { status: newStatus };

      // Agar complete ho rha hai to Email bhejenge aur log save karenge
      if (newStatus === "completed") {
        const emailSent = await sendCompletionEmail(item, user);
        updatePayload = {
          ...updatePayload,
          completedAt: serverTimestamp(),
          emailLog: {
            sentTo: user.email,
            status: emailSent ? "Delivered" : "Failed",
            timestamp: new Date().toISOString()
          }
        };
      }

      await updateDoc(ref, updatePayload);
      getAppointments(); // Refresh UI
    } catch (error) {
      alert("System Update Error. Check Console.");
    }
  };

  // --- 5. SEARCH & FILTER ADD-ON LOGIC ---
  useEffect(() => {
    let result = appointments;
    
    if (activeFilter !== "all") {
      result = result.filter(a => a.status === activeFilter);
    }
    
    if (searchTerm) {
      result = result.filter(a => 
        a.vehicleModel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredData(result);
  }, [searchTerm, activeFilter, appointments]);

  useEffect(() => { getAppointments(); }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case "active": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "completed": return "text-blue-600 bg-blue-50 border-blue-100";
      case "rejected": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-orange-600 bg-orange-50 border-orange-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-black font-sans pb-32">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-black-100 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-red-600 shadow-xl">
              <ShieldCheck size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">
                Appointment <span className="text-red-600">Terminal</span>
              </h1>
              
            </div>
          </div>

          <div className="flex items-center gap-6 bg-slate-50 p-2 rounded-2xl border border-slate-100">
             <div className="px-4 text-center">
               <p className="text-[9px] font-black text-slate-400 uppercase">Total</p>
               <p className="text-lg font-black">{appointments.length}</p>
             </div>
             <div className="w-px h-8 bg-gray-200"></div>
             <button onClick={getAppointments} className="p-2 hover:text-red-600 transition-colors">
               <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 mt-12">
        
        {/* --- ADD-ON: SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-black-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by Customer, Vehicle, or Plate #..."
              className="w-full bg-white border border-black-100 pl-14 pr-6 py-5 rounded-[1.8rem] text-sm font-bold shadow-sm focus:border-black outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 bg-white p-2 border border-black-100 rounded-[1.8rem] shadow-sm">
            {['all', 'pending', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === f ? 'bg-black text-white' : 'hover:bg-black-50 text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 gap-8">
            {filteredData.map((item) => {
              const user = item.user || {};
              const status = item.status || "pending";

              return (
                <div key={item.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-black hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.08)]">
                  <div className="p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      
                      {/* Customer Section */}
                      <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-red-600" />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1">Customer Profile</h4>
                        </div>
                        <div className="space-y-1">
                          <p className="text-3xl font-black tracking-tighter leading-none">{user.name || "N/A"}</p>
                          <p className="text-sm font-bold text-black pt-3 flex items-center gap-2"><MailCheck size={14}/> {user.email}</p>
                          <p className="text-sm font-bold opacity-60 italic">{user.phone}</p>
                          <p className="text-[10px] font-black text-black-400 uppercase pt-4 leading-relaxed max-w-[200px]">{user.address}</p>
                        </div>
                      </div>

                      {/* Vehicle Section */}
                      <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-2">
                          <Car size={16} className="text-red-600" />
                          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1">Unit Specification</h4>
                        </div>
                        <div>
                          <p className="text-3xl font-black tracking-tighter uppercase">{item.vehicleModel}</p>
                          <span className="inline-block mt-3 bg-black text-white font-mono text-xs px-3 py-1.5 rounded-lg tracking-wider">
                            {item.vehicleNumber}
                          </span>
                          <div className="mt-6 p-5 bg-red-50 border-l-4 border-red-600 rounded-xl">
                            <p className="text-[9px] font-black text-red-600 uppercase mb-1">Diagnostic Report</p>
                            <p className="text-sm font-bold text-black italic">"{item.issue}"</p>
                          </div>
                        </div>
                      </div>

                      {/* Status Section */}
                      <div className="lg:col-span-4 lg:text-right flex flex-col items-start lg:items-end justify-between">
                        <div>
                          <div className="flex items-center lg:justify-end gap-2 mb-4">
                            <Clock size={16} className="text-red-600" />
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1">Tracking</h4>
                          </div>
                          <div className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] ${getStatusConfig(status)}`}>
                            {status}
                          </div>
                          <div className="mt-8">
                            <p className="text-[10px] font-black text-blue-900 uppercase">Assigned Technician</p>
                            <p className="text-lg font-black uppercase">{item.mechanicName || "Not Allocated"}</p>
                          </div>
                        </div>
                        
                        {status === "completed" && item.emailLog && (
                          <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase mt-4">
                             <Check size={14} /> Report Dispatched to Client
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-12 pt-10 border-t border-slate-50 flex flex-wrap gap-4">
                      {status === "pending" && (
                        <button onClick={() => handleStatusChange(item.id, "active", item, user)} className="bg-black text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 flex items-center gap-2">
                          <Wrench size={16}/> Deploy Mechanic
                        </button>
                      )}

                      {status === "active" && (
                        <button onClick={() => handleStatusChange(item.id, "completed", item, user)} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-emerald-100">
                          <Check size={16}/> Finalize & Send Report
                        </button>
                      )}

                      {(status === "pending" || status === "active") && (
                        <button onClick={() => handleStatusChange(item.id, "rejected", item, user)} className="bg-white text-red-600 border border-red-100 px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95">
                          <X size={16}/> Decline Task
                        </button>
                      )}

                      {status !== "pending" && (
                        <button 
                          onClick={() => {
                            const prev = status === "completed" ? "active" : "pending";
                            handleStatusChange(item.id, prev, item, user);
                          }}
                          className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors px-6 text-[10px] font-black uppercase tracking-widest"
                        >
                          <ArrowLeft size={14} /> Revert Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* SYSTEM FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-white py-6 px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational</span>
           </div>
           <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest hidden sm:block">
             System Key: <span className="text-white">{PUBLIC_KEY}</span>
           </p>
        </div>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">
          Mechano Infrastructure v5.0.1
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      ` }} />
    </div>
  );
};

export default AdminAppointments;