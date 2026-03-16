import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Navigate added

import Home from "./pages/Home";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Services from "./pages/Services";
import Signup from "./pages/Signup";
import Cart from "./components/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAppointments from "./pages/AdminAppointments";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminMechanics from "./pages/AdminMechanics";
import AdminContact from "./pages/AdminContact";
import { AuthContext } from "./context/AuthContext"; // AuthContext import

const App = () => {
  // get isAdmin from context
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow w-full px-8">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/mechanics" element={<Services />} />
          <Route path="/mechanics/:speciality" element={<Services />} />

          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/appointment/:docId" element={<Appointment />} />

          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />

          <Route path="/cart" element={<Cart />} />

          {/* -------- ADMIN PROTECTED ROUTES -------- */}

          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/appointments"
            element={isAdmin ? <AdminAppointments /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/users"
            element={isAdmin ? <AdminUsers /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/products"
            element={isAdmin ? <AdminProducts /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/mechanics"
            element={isAdmin ? <AdminMechanics /> : <Navigate to="/" />}
          />

          <Route
            path="/admin/contact"
            element={isAdmin ? <AdminContact /> : <Navigate to="/" />}
          />

          {/* ---------------------------------------- */}
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
