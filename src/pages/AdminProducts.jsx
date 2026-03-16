import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { 
  Package, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Box, 
  IndianRupee, 
  Layers,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

/* ---------------- 1. PREMIUM LOADER ---------------- */
const Loader = () => (
  <div className="flex flex-col items-center justify-center py-48 bg-white">
    <div className="relative w-20 h-1 bg-slate-100 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-red-600 animate-[loading_1.5s_infinite_ease-in-out]"></div>
    </div>
    <p className="mt-4 text-[10px] font-black text-black uppercase tracking-[0.4em] animate-pulse">
      Syncing Inventory Data
    </p>
  </div>
);

/* ---------------- 2. MAIN COMPONENT ---------------- */
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const addProduct = async () => {
    if (!name || !price || !quantity) return;
    try {
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        quantity: Number(quantity),
        createdAt: new Date()
      });
      setName(""); setPrice(""); setQuantity("");
      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Delete this product from inventory?")) {
      await deleteDoc(doc(db, "products", id));
      getProducts();
    }
  };

  const toggleStock = async (product) => {
    const newQuantity = product.quantity === 0 ? 10 : 0;
    await updateDoc(doc(db, "products", product.id), {
      quantity: newQuantity
    });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFC] pb-24 font-sans selection:bg-red-600 selection:text-white">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
              <Package size={24} strokeWidth={2.5} className="text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-black tracking-tighter uppercase leading-none">
                Inventory <span className="text-red-600">Master</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Stock & Pricing Control
              </p>
            </div>
          </div>

          <button 
            onClick={getProducts}
            className="p-3 bg-slate-50 text-black border border-slate-100 rounded-xl hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-10 mt-12">
        
        {/* ADD PRODUCT FORM - NEO MINIMALIST */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 mb-12 shadow-sm">
          <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-6 border-b-2 border-black pb-1 w-fit">
            Register New Product
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:border-black transition-all outline-none"
              />
            </div>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:border-black transition-all outline-none"
              />
            </div>
            <div className="relative">
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input
                placeholder="Initial Qty"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl text-sm font-bold focus:border-black transition-all outline-none"
              />
            </div>
            <button
              onClick={addProduct}
              className="bg-black hover:bg-red-600 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:border-black hover:-translate-y-1"
              >
                {/* CARD HEADER */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest">
                      ID: {product.id.toUpperCase().slice(0, 8)}
                    </p>
                  </div>
                  <div className={`p-2 rounded-xl ${product.quantity > 0 ? "bg-green-50" : "bg-red-50"}`}>
                    {product.quantity > 0 ? 
                      <CheckCircle2 size={20} className="text-green-500" /> : 
                      <AlertCircle size={20} className="text-red-500" />
                    }
                  </div>
                </div>

                {/* INFO UNDERLINED */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-3 border-b-2 border-black pb-1 w-fit">
                      Market Pricing
                    </h4>
                    <p className="text-3xl font-black text-black tracking-tighter">
                      ₹{Number(product.price).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-3 border-b-2 border-black pb-1 w-fit">
                      Stock Status
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${product.quantity > 0 ? "bg-green-500 animate-pulse" : "bg-red-600"}`}></div>
                      <span className={`text-sm font-black uppercase tracking-widest ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                        {product.quantity > 0 ? `In Stock (${product.quantity} Units)` : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3 pt-6 border-t border-slate-50">
                  <button
                    onClick={() => toggleStock(product)}
                    className="flex-1 bg-slate-50 hover:bg-black hover:text-white text-black py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-100"
                  >
                    Toggle Stock
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FLOATING SYSTEM FOOTER */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit bg-black text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Warehouse Node Active</span>
        </div>
        <div className="w-px h-4 bg-white/20"></div>
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest italic">
          Total Items: {products.length}
        </p>
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

export default AdminProducts;