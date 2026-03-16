import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../utils/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Loader2, ArrowRight, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUserDB = async (firebaseUser, name) => {
    try {
      await setDoc(
        doc(db, "users", firebaseUser.uid),
        {
          uid: firebaseUser.uid,
          name: name || "User",
          email: firebaseUser.email,
          role: "customer",
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );
    } catch (err) {
      console.error("Firestore error:", err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signup(formData.email, formData.password);
      await saveUserDB(res.user, formData.name);
      navigate("/");
    } catch (err) {
      setError(
        err.message.includes("email-already-in-use")
          ? "Email already exists!"
          : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-50 p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[900px] h-auto md:h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-gray-100"
      >
        {/* LEFT SIDE - DESIGN PANEL */}
        <div className="w-full md:w-1/2 bg-black relative flex flex-col justify-between p-10 overflow-hidden">
          {/* Top Curve Shape */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-bl-full opacity-20 transform translate-x-10 -translate-y-10"></div>

          <div className="relative z-10">
            <h1 className="text-white text-5xl font-black leading-tight tracking-tighter">
              CREATE <br /> <span className="text-red-600">ACCOUNT</span>
            </h1>
            <p className="text-gray-400 mt-4 text-sm max-w-[250px]">
              Join our community.
            </p>
          </div>

          <div className="relative z-10 flex justify-center">
            {/* Modern Illustration with Red Accent (Dot) */}
            <div className="relative">
              <img
                src="https://illustrations.popsy.co/white/creative-work.svg"
                alt="Art"
                className="w-64 h-64 object-contain"
              />
              <div className="absolute top-10 right-10 w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_#dc2626]"></div>
            </div>
          </div>

          {/* Bottom Black Circle decoration */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full"></div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Input Wrapper */}
            <div className="space-y-4">
              <div className="relative group">
                <User
                  className="absolute left-0 top-3 text-black-200 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full pl-8 py-3 border-b-2 border-black-200 focus:border-red-600 outline-none transition-all placeholder:text-black-300 font-medium"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative group">
                <Mail
                  className="absolute left-0 top-3 text-black-200 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-8 py-3 border-b-2 border-black-200 focus:border-red-600 outline-none transition-all placeholder:text-black-300 font-medium"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-0 top-3 text-black-400 group-focus-within:text-red-600 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-8 py-3 border-b-2 border-black-200 focus:border-red-600 outline-none transition-all placeholder:text-black-300 font-medium"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-xs font-bold uppercase tracking-widest">
                {error}
              </p>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl hover:shadow-red-200 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Sign Up <ArrowRight size={20} />
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-black-500 text-sm">
                  Already a member?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-red-600 font-bold hover:underline underline-offset-4"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </form>

          {/* Important Notice */}
          <p className="mt-8 text-[10px] text-black-400 uppercase tracking-tighter">
            * By joining, you accept our{" "}
            <span className="text-black font-bold">Privacy Policy</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
