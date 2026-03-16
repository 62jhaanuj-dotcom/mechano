import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import AppContextProvider from "./context/AppContextProvider.jsx";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import AppointmentContextProvider from "./context/AppointmentContextProvider.jsx";
import CartContextProvider from "./context/CartContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <AuthContextProvider>

        <AppointmentContextProvider>

          <CartContextProvider>

            <AppContextProvider>

              <App />

            </AppContextProvider>

          </CartContextProvider>

        </AppointmentContextProvider>

      </AuthContextProvider>

    </BrowserRouter>
  </StrictMode>
);