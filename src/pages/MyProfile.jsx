import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // NEW: For redirection
import Cart from "../components/Cart";
import {
  User,
  Edit3,
  LogOut,
  Save,
  X,
  Phone,
  MapPin,
  Calendar,
  Shield,
} from "lucide-react";

const MyProfile = () => {


  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // NEW: Hook initialize kiya

  const [isEdit, setIsEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({
            name: user.displayName || user.email?.split("@")[0] || "User",
            email: user.email,
            phone: "",
            address: "",
            gender: "",
            dob: "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      setIsEdit(false);
    } catch (error) {
      console.error(error);
      alert("Profile update failed");
    }
  };
  // NEW: Logout function with Redirect
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Logout ke baad seedha login page par
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER */}

      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-black tracking-wider flex items-center gap-2">
            <Shield className="text-red-500" size={22} />
            My Account
          </h1>
          <div className="flex gap-3">
            <TabButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </TabButton>

            <TabButton
              active={activeTab === "cart"}
              onClick={() => setActiveTab("cart")}
            >
              Cart
            </TabButton>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === "profile" ? (
          <div className="grid lg:grid-cols-12 gap-10">
            {/* LEFT PROFILE CARD */}

            <div className="lg:col-span-4">
              <div className="bg-black text-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-red-500 flex items-center justify-center text-3xl font-bold">
                    {userData.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-sm text-gray-300">{userData.email}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <InfoRow
                    icon={<Phone size={16} />}
                    text={userData.phone || "No phone"}
                  />

                  <InfoRow
                    icon={<Calendar size={16} />}
                    text={userData.dob || "No birth date"}
                  />

                  <InfoRow
                    icon={<User size={16} />}
                    text={userData.gender || "No gender"}
                  />
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setIsEdit(!isEdit)}
                    className="flex-1 bg-red-500 hover:bg-red-600 transition py-2 rounded-lg flex items-center justify-center gap-2 font-semibold"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={handleLogout} // Updated: Now calls the redirect function
                    className="px-4 bg-white text-black rounded-lg hover:bg-gray-200"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-black-200 rounded-xl p-4 mt-6">
                <h3 className="text-sm font-bold text-black-200 mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-red-500" /> Shipping
                </h3>

                <p className="text-sm text-gray-600">
                  {userData.address || "No address added"}
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}

            <div className="lg:col-span-8">
              <div className="bg-white border border-black/10 rounded-3xl p-8 md:p-12 shadow-xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                  <div>
                    <h3 className="text-3xl font-bold text-black">
                      Account Information
                    </h3>

                    <p className="text-sm text-black/60 mt-1">
                      Manage your personal details and contact preferences
                    </p>
                  </div>

                  {isEdit && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEdit(false)}
                        className="px-5 py-2.5 rounded-xl border border-black/20 text-black font-semibold hover:bg-black/5 transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-xl bg-black text-white font-semibold hover:bg-black/90 transition"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {/* Form */}
                <form className="grid md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Full Name
                    </label>

                    <input
                      type="text"
                      disabled={!isEdit}
                      value={userData.name || ""}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="w-full border border-black/20 rounded-xl p-3 text-sm text-black focus:border-black outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Email Address
                    </label>

                    <input
                      value={userData.email}
                      disabled
                      className="w-full border border-black/20 rounded-xl p-3 text-sm text-black/60 bg-black/5 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Phone Number
                    </label>

                    <input
                      value={userData.phone}
                      disabled={!isEdit}
                      onChange={(e) =>
                        setUserData({ ...userData, phone: e.target.value })
                      }
                      className="w-full border border-black/20 rounded-xl p-3 text-sm text-black focus:border-black outline-none"
                    />
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Gender
                    </label>

                    <select
                      disabled={!isEdit}
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                      className="w-full border border-black/20 rounded-xl p-3 text-sm text-black focus:border-black outline-none"
                    >
                      <option value="">Choose</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* DOB */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Birth Date
                    </label>

                    <input
                      type="date"
                      disabled={!isEdit}
                      value={userData.dob}
                      onChange={(e) =>
                        setUserData({ ...userData, dob: e.target.value })
                      }
                      className="w-full border border-black/20 rounded-xl p-3 text-sm text-black focus:border-black outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-lg font-semibold text-black">
                      Permanent Address
                    </label>

                    <textarea
                      rows="3"
                      disabled={!isEdit}
                      value={userData.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      className="w-full border border-black/20 rounded-xl p-4 text-sm text-black focus:border-black outline-none resize-none"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <Cart />
        )}
      </main>
    </div>
  );
};

const TabButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 rounded-full text-sm font-semibold transition ${
      active ? "bg-red-500 text-white" : "text-gray-600"
    }`}
  >
    {children}
  </button>
);

const InfoRow = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-200">
    {icon}
    {text}
  </div>
);
const Input = ({ label, children, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <label className="text-sm font-semibold text-gray-500 mb-1 block">
      {label}
    </label>
    {children}
  </div>
);

export default MyProfile;
