import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Mail, Phone, User, Trash2, MessageSquare, AlertCircle } from "lucide-react";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH MESSAGES
  const getMessages = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "contactMessages"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE MESSAGE
  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "contactMessages", id));
        getMessages();
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] text-black pb-20">
      {/* HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <h1 className="text-xl font-black uppercase tracking-tighter">
            Dashboard <span className="text-black-300 font-light">/ Contact Messages</span>
          </h1>
          <div className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {messages.length} Messages
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-6 h-6 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Syncing Inbox</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-20 text-center">
            <AlertCircle className="mx-auto mb-4 text-slate-200" size={48} />
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">No messages found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {messages.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-black hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
              >
                <div className="p-10">
                  {/* --- TOP GRID (Sender Info) --- */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    {/* SENDER INFO */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <User size={14} strokeWidth={3} />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5">
                          Sender Details
                        </h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-black leading-none text-black uppercase tracking-tighter">
                          {item.name || "Anonymous"}
                        </p>
                        <div className="flex items-center gap-2 pt-3">
                          <Mail size={12} className="text-slate-400" />
                          <p className="text-sm font-bold text-black">{item.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={12} className="text-slate-400" />
                          <p className="text-sm font-bold text-black">{item.phone || "No Phone"}</p>
                        </div>
                      </div>
                    </div>

                    {/* SUBJECT INFO */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={14} strokeWidth={3} />
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-0.5">
                          Message Content
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-lg font-black text-black leading-tight uppercase tracking-tight">
                          Re: {item.subject || "No Subject"}
                        </p>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                          <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                            "{item.message}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* --- ACTION FOOTER --- */}
                  <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[10px] font-black text-black-300 uppercase tracking-widest">
                      ID: {item.id.slice(0, 8)}...
                    </p>
                    <button
                      onClick={() => deleteMessage(item.id)}
                      className="flex items-center gap-2 bg-white text-red-600 border border-red-100 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 shadow-sm"
                    >
                      <Trash2 size={14} />
                      Delete Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminContact;