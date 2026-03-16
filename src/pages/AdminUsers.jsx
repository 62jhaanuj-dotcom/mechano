import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Fingerprint, 
  ShieldCheck, 
  Users,
  Search,
  RefreshCcw // Fixed: Added this import
} from "lucide-react";

/* ---------------- 1. PREMIUM RED & BLACK LOADER ---------------- */
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-48 bg-white">
    <div className="relative w-16 h-1 bg-slate-100 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-red-600 animate-[loading_1.5s_infinite_ease-in-out]"></div>
    </div>
    <p className="mt-4 text-[10px] font-black text-black uppercase tracking-[0.3em] animate-pulse">
      Indexing User Database
    </p>
  </div>
);

/* ---------------- 2. MINIMALIST USER CARD ---------------- */
const UserCard = ({ user }) => (
  <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-black hover:-translate-y-1">
    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-3xl bg-black flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-slate-200">
          <User size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-none">
            {user.name || "Anonymous"}
          </h3>
          <span className="inline-block mt-2 px-3 py-1 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-red-100">
            {user.role || "Standard User"}
          </span>
        </div>
      </div>
      <ShieldCheck size={18} className="text-slate-200 group-hover:text-black transition-colors" />
    </div>

    <div className="space-y-6">
      <div>
        <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black pb-1 w-fit">
          Contact Details
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 group/item">
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover/item:bg-red-50 transition-colors">
              <Mail size={14} className="text-slate-400 group-hover/item:text-red-600" />
            </div>
            <span className="text-sm font-bold text-black truncate">{user.email}</span>
          </div>
          <div className="flex items-center gap-3 group/item">
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover/item:bg-red-50 transition-colors">
              <Phone size={14} className="text-slate-400 group-hover/item:text-red-600" />
            </div>
            <span className="text-sm font-bold text-black">{user.phone || "No Phone"}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-4 border-b-2 border-black pb-1 w-fit">
          Location
        </h4>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center mt-1">
            <MapPin size={14} className="text-slate-400" />
          </div>
          <p className="text-sm font-bold text-black leading-relaxed italic">
            {user.address || "No address provided."}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
      <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
        <Fingerprint size={12} className="text-black" />
        <span className="font-mono text-[9px] font-bold text-black">
          UID: {user.uid?.slice(0, 12)}...
        </span>
      </div>
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
  </div>
);

/* ---------------- 3. MAIN COMPONENT ---------------- */
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] pb-24 font-sans selection:bg-red-600 selection:text-white">
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-100">
              <Users size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-black tracking-tighter uppercase leading-none">
                Users <span className="text-red-600">Master</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Access Control & Profiles
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 uppercase">Total Accounts</p>
              <p className="text-2xl font-black text-black leading-none">{users.length}</p>
            </div>
            <button 
              onClick={getUsers}
              className="p-3 bg-black text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-10 mt-16">
        {loading ? (
          <Loader />
        ) : (
          <>
            {users.length === 0 ? (
              <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[3rem]">
                <Search size={40} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No users found in database</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit bg-black text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Directory</span>
        </div>
        <div className="w-px h-4 bg-white/20"></div>
        
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
      ` }} />
    </div>
  );
};

export default AdminUsers;