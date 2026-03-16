import React, { useContext, useState } from "react";
import {
  ShoppingCart,
  Star,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Local States
  const [adding, setAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Safety check
  if (!item) return null;

  const handleAddToCart = async () => {
    if (!user?.uid) {
      alert("Please login to add items to your cart!");
      return;
    }

    try {
      setAdding(true);
      await addToCart(item, user.uid);

      // Success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Cart Error:", error);
      alert("Failed to add item. Check your connection.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="group relative border border-slate-100 rounded-[2.5rem] p-5 bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      
      {/* --- BADGES --- */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
        {item.isNew && (
          <span className="bg-black text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1 w-fit">
            <Zap size={10} className="fill-yellow-400 text-yellow-400" />
            New Arrival
          </span>
        )}
        {item.discount && (
          <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg w-fit">
            {item.discount}% OFF
          </span>
        )}
      </div>

      {/* --- IMAGE SECTION --- */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 h-64 flex items-center justify-center border border-slate-100 p-8 mb-6 mt-2">
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <img
          src={item.image || "/placeholder.png"}
          alt={item.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300?text=No+Image";
          }}
        />

        {/* Quick View Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] font-bold bg-white/90 px-4 py-2 rounded-full shadow-xl uppercase tracking-tighter cursor-pointer">
            View Details
          </span>
        </div>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="flex flex-col flex-grow px-2">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-blue-500" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {item.brand || "Genuine Parts"}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-black text-slate-700">
              {item.rating || "4.5"}
            </span>
          </div>
        </div>

        <h3 className="font-black text-slate-900 text-xl leading-tight uppercase tracking-tighter mb-2 group-hover:text-red-600 transition-colors line-clamp-1">
          {item.name}
        </h3>

        <p className="text-slate-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">
          {item.description ||
            "High-quality performance part designed for maximum durability and efficiency."}
        </p>

        {/* --- PRICING & CTA --- */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">
              Best Price
            </p>
            <div className="flex items-center gap-2">
              <p className="text-slate-900 font-black text-2xl">
                ₹{Number(item.price || 0).toLocaleString('en-IN')}
              </p>
              {item.oldPrice && (
                <p className="text-slate-300 line-through text-xs font-bold">
                  ₹{Number(item.oldPrice).toLocaleString('en-IN')}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={adding || showSuccess}
            className={`relative flex items-center justify-center gap-2 h-12 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all overflow-hidden ${
              showSuccess
                ? "bg-green-500 text-white"
                : adding
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-red-600 active:scale-95 shadow-lg"
            }`}
          >
            {showSuccess ? (
              <div className="flex items-center gap-2 animate-in zoom-in duration-300">
                <CheckCircle2 size={16} />
                <span>Added!</span>
              </div>
            ) : adding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <ShoppingCart size={16} strokeWidth={2.5} />
                <span>Add To Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;