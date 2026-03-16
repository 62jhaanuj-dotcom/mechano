import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
    clearCart,
    addToCart,
    getCartItems,
    updateQuantity,
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user?.uid) {
      getCartItems(user.uid);
    }
  }, [user?.uid]);

  // Total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-screen">

      {/* TITLE */}
      <div className="flex items-center gap-4 mb-10">
        <ShoppingBag size={32} className="text-slate-900" />
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
          Your Cart
        </h1>
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50">
          <p className="text-slate-400 font-black uppercase tracking-widest text-xl mb-2">
            Cart is feeling light
          </p>
          <p className="text-slate-500 text-sm">
            Add some genuine parts to get started.
          </p>
        </div>
      ) : (

        <div className="grid lg:grid-cols-3 gap-10">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="group flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-xl transition-all duration-300"
              >

                <div className="flex items-center gap-6 w-full">

                  {/* PRODUCT IMAGE */}
                  <div className="w-24 h-24 bg-slate-50 rounded-3xl p-4 flex-shrink-0 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="flex-1">

                    <h3 className="text-lg font-black text-slate-900 uppercase truncate">
                      {item.name}
                    </h3>

                    <p className="text-red-600 font-bold">₹{item.price}</p>

                    {/* Quantity Selector Update */}
<div className="flex items-center gap-4 mt-4 bg-slate-50 w-fit px-4 py-2 rounded-2xl border border-slate-100">
  
  {/* MINUS BUTTON: Ab ye sirf quantity ghatayega */}
  <button
    onClick={() => {
      if (item.quantity > 1) {
        updateQuantity(item.id, item.quantity - 1);
      } else {
        removeFromCart(item.id); // 1 bache toh hi remove karega
      }
    }}
    className="hover:text-red-600 transition-colors"
  >
    <Minus size={16} strokeWidth={3} />
  </button>

  <span className="font-black text-slate-900 min-w-[20px] text-center">
    {item.quantity}
  </span>

  {/* PLUS BUTTON: Ab ye bina error ke kaam karega */}
  <button
    onClick={() => addToCart(item, user?.uid)}
    className="hover:text-green-600 transition-colors"
  >
    <Plus size={16} strokeWidth={3} />
  </button>
</div>

                  </div>

                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 sm:mt-0 p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            ))}

          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">

            <div className="bg-black text-white p-8 rounded-[2.5rem] sticky top-24 shadow-2xl">

              <h2 className="text-2xl font-black uppercase tracking-tight mb-8 border-b border-white/10 pb-4">
                Summary
              </h2>

              <div className="space-y-4 mb-8 text-sm uppercase font-bold tracking-widest text-slate-400">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white text-lg">₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>

              </div>

              <div className="pt-6 border-t border-white/20 mb-10">

                <p className="text-xs text-slate-400 uppercase font-black mb-1">
                  Total Amount
                </p>

                <h2 className="text-4xl font-black">₹{totalPrice}</h2>

              </div>

              <div className="space-y-4">

                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/20">
                  Checkout Now
                </button>

                <button
                  onClick={() => clearCart(user?.uid)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all"
                >
                  Clear Entire Cart
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;