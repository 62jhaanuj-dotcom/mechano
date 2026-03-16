// src/context/AuthContext.jsx

import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  signup: () => {},
  login: () => {},
  logout: () => {},
  googleLogin: () => {}
});