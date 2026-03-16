import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, ArrowRight, KeyRound } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ ADDED STATE
  const [loginType, setLoginType] = useState("customer");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await login(email, password);

      const uid = userCredential.user.uid;

      const userDoc = await getDoc(doc(db, "users", uid));

      const userData = userDoc.data();

      // ✅ UPDATED ROLE LOGIC
      if (loginType === "admin") {

        if (userData?.role !== "admin") {
          setError("You are not authorized as admin");
          setLoading(false);
          return;
        }

        navigate("/admin");

      } else {

        navigate("/my-profile");

      }

    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f8f8] p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[900px] h-auto md:h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row-reverse border border-gray-100"
      >

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 bg-black relative flex flex-col justify-between p-10 overflow-hidden">

          <div className="absolute top-0 left-0 w-32 h-32 bg-red-600 rounded-br-full opacity-20 transform -translate-x-10 -translate-y-10"></div>

          <div className="relative z-10 text-right">
            <h1 className="text-white text-5xl font-black leading-tight tracking-tighter">
              WELCOME <br /> <span className="text-red-600">BACK</span>
            </h1>

            <p className="text-gray-400 mt-4 text-sm ml-auto max-w-[250px]">
              Login to Mechano to continue managing your car services.
            </p>
          </div>

          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="relative w-64 h-64">

              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="#1a1a1a" />

                <path
                  d="M130 80C130 96.5685 116.569 110 100 110C83.4315 110 70 96.5685 70 80C70 63.4315 83.4315 50 100 50C116.569 50 130 63.4315 130 80Z"
                  fill="#dc2626"
                />

                <rect x="95" y="110" width="10" height="50" rx="5" fill="white" opacity="0.8" />

                <rect x="95" y="130" width="25" height="8" rx="4" fill="white" opacity="0.8" />

                <rect x="95" y="145" width="15" height="8" rx="4" fill="white" opacity="0.8" />
              </svg>

              <div className="absolute bottom-12 left-12 w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_#dc2626]"></div>

            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full"></div>

        </div>

        {/* LEFT SIDE FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center">

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black flex items-center gap-2">
              Sign In <KeyRound size={24} className="text-red-600" />
            </h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* ✅ ADDED LOGIN TYPE SELECTOR */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => setLoginType("customer")}
                className={`px-4 py-2 rounded-lg border ${
                  loginType === "customer" ? "bg-black text-white" : "bg-white"
                }`}
              >
                Customer
              </button>

              <button
                type="button"
                onClick={() => setLoginType("admin")}
                className={`px-4 py-2 rounded-lg border ${
                  loginType === "admin" ? "bg-black text-white" : "bg-white"
                }`}
              >
                Admin
              </button>

            </div>

            <div className="space-y-4">

              <div className="relative group">
                <Mail className="absolute left-0 top-3 text-gray-400 group-focus-within:text-red-600 transition-colors" size={18} />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-8 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-all placeholder:text-gray-300 font-medium bg-transparent"
                  required
                />
              </div>

              <div className="relative group">

                <Lock className="absolute left-0 top-3 text-gray-400 group-focus-within:text-red-600 transition-colors" size={18} />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-8 py-3 border-b-2 border-gray-200 focus:border-red-600 outline-none transition-all placeholder:text-gray-300 font-medium bg-transparent"
                  required
                />

              </div>

            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 text-xs font-bold uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}

            <div className="flex flex-col gap-4 pt-4">

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-xl hover:shadow-red-100 active:scale-95 disabled:opacity-50"
              >

                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Login to Mechano <ArrowRight size={20} />
                  </>
                )}

              </button>

              <div className="text-center">

                <p className="text-gray-500 text-sm">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-red-600 font-bold hover:underline underline-offset-4"
                  >
                    Create Account
                  </button>
                </p>

              </div>

            </div>

          </form>

          <p className="mt-10 text-[10px] text-gray-400 uppercase tracking-tighter">
            Secure access powered by <span className="text-black font-bold">Mechano Auth</span>
          </p>

        </div>

      </motion.div>
    </div>
  );
};

export default Login;