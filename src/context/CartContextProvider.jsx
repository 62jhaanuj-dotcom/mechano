import React, { useState } from "react";
import { db } from "../utils/firebase";
import { CartContext } from "./CartContext";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
// export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------- FETCH CART ----------
  const getCartItems = async (userId) => {
    if (!userId) return;

    setLoading(true);

    try {
      const q = query(collection(db, "cart"), where("userId", "==", userId));

      const snapshot = await getDocs(q);

      const items = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setCartItems(items);
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------- ADD TO CART ----------
  // purane addToCart function ko isse replace karein
  const addToCart = async (product, userId) => {
    if (!userId) return alert("Please login first");

    // FIX: Normalize ID (Store se aaye toh _id, Cart se aaye toh productId)
    const pId = product._id || product.productId;

    try {
      // Check if item already exists using normalized pId
      const existing = cartItems.find((item) => item.productId === pId);

      if (existing) {
        // Agar item mil gaya toh sirf quantity badhao
        await updateQuantity(existing.id, existing.quantity + 1);
        return;
      }

      // Agar naya item hai toh add karo
      const docRef = await addDoc(collection(db, "cart"), {
        userId: userId,
        productId: pId,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        quantity: 1,
        addedAt: Date.now(),
      });

      setCartItems((prev) => [
        ...prev,
        {
          id: docRef.id,
          userId: userId,
          productId: pId,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          quantity: 1,
        },
      ]);
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // ---------- UPDATE QUANTITY ----------
  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;

    try {
      await updateDoc(doc(db, "cart", cartId), { quantity });

      setCartItems((prev) =>
        prev.map((item) => (item.id === cartId ? { ...item, quantity } : item)),
      );
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  };

  // ---------- REMOVE ITEM ----------
  const removeFromCart = async (cartId) => {
    try {
      await deleteDoc(doc(db, "cart", cartId));

      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  // ---------- CLEAR CART ----------
  const clearCart = async (userId) => {
    if (!userId) return;

    try {
      const q = query(collection(db, "cart"), where("userId", "==", userId));

      const snapshot = await getDocs(q);

      const promises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "cart", docSnap.id)),
      );

      await Promise.all(promises);

      setCartItems([]);
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  // ---------- CART COUNT ----------
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // ---------- CART TOTAL ----------
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    getCartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return (<CartContext.Provider value={value}>
    {children}
    </CartContext.Provider>);
  
};

export default CartContextProvider;
