import { createContext } from "react";

export const CartContext = createContext({
  
  cartItems: [],
  loading: false,

  addToCart: async (item, userId) => {},

  getCartItems: async (userId) => {},

  removeFromCart: async (cartId) => {},

  updateQuantity: async (cartId, quantity) => {},

  clearCart: async (userId) => {},

  getCartCount: () => 0,

  getCartTotal: () => 0

});