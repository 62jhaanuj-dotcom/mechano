import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { RefreshCcw, Wrench } from "lucide-react";

/* ---------------- LOADER ---------------- */

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-48">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    <p className="text-sm text-gray-500 mt-4">Loading mechanics...</p>
  </div>
);

/* ---------------- NAVBAR ---------------- */

const DashboardNav = ({ loading, onRefresh }) => (
  <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b">
    <div className="max-w-[1400px] mx-auto px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-3">
        <div className="bg-black text-white p-3 rounded-lg">
          <Wrench size={20}/>
        </div>

        <div>
          <h1 className="font-bold text-lg">
            MECHANO <span className="text-red-500">OPS</span>
          </h1>
          <p className="text-xs text-gray-400">Fleet Monitoring</p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition"
      >
        <RefreshCcw size={16} className={loading ? "animate-spin" : ""}/>
        Refresh
      </button>

    </div>
  </nav>
);

/* ---------------- MECHANIC CARD ---------------- */

const MechanicCard = ({ item, activeJob }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-500">

    {/* IMAGE */}
    <div className="relative h-52 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover hover:scale-110 transition duration-700"
      />

      <div className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            activeJob ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {activeJob ? "Busy" : "Available"}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-md">
        ID: {item._id.slice(-6)}
      </div>
    </div>

    {/* BODY */}
    <div className="p-6">

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-sm text-red-500 font-medium">
            {item.speciality} Specialist
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Experience</p>
          <p className="font-bold text-lg">
            {item.experience.split(" ")[0]} yrs
          </p>
        </div>
      </div>

      {/* JOB INFO */}

      {activeJob ? (
        <div className="bg-slate-900 text-white rounded-xl p-4 mb-5">

          <div className="flex justify-between text-xs mb-2">
            <span className="text-gray-400">Vehicle</span>
            <span className="font-semibold">{activeJob.vehicleNumber}</span>
          </div>

          <div className="flex justify-between text-xs mb-2">
            <span>{activeJob.userName}</span>
            <span>{activeJob.vehicleModel}</span>
          </div>

          <p className="text-[11px] text-gray-400">
            Date: {activeJob.displayDate}
          </p>

        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-400 mb-5">
          Waiting for Assignment
        </div>
      )}

      {/* FOOTER */}

      <div className="flex justify-between items-center">
        <span className="text-sm text-black-500">Service Charge</span>

        <span className="text-2xl font-bold text-gray-900">
          ₹{item.fees}
        </span>
      </div>

    </div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

const AdminMechanics = () => {

  const { mechanics } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {

      setLoading(true);

      const snapshot = await getDocs(collection(db, "appointments"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(data);

    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const activeJobs = appointments.filter(a => a.status === "active");

  const busyCount = activeJobs.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">

      <DashboardNav loading={loading} onRefresh={fetchAppointments} />

      <main className="max-w-[1400px] mx-auto px-8 py-16">

        {loading ? (
          <Loader />
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {mechanics.map((item) => (

              <MechanicCard
                key={item._id}
                item={item}
                activeJob={activeJobs.find(a => a.mechanicId === item._id)}
              />

            ))}

          </div>

        )}

      </main>

      {/* FLOATING STATS */}

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl border px-8 py-4 flex gap-12 z-50">

        <div>
          <p className="text-xs text-gray-400">Available Mechanics</p>

          <p className="text-xl font-bold text-green-600">
            {mechanics.length - busyCount}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Active Jobs</p>

          <p className="text-xl font-bold text-red-600">
            {busyCount}
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminMechanics;