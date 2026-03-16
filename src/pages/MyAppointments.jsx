import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppointmentContext } from "../context/AppointmentContext ";

const MyAppointments = () => {
  const {
    appointments = [],
    loading,
    getUserAppointments,
    cancelAppointment,
  } = useContext(AppointmentContext);
  
  // Note: Aapke AuthContext mein 'loading' ya 'authLoading' state honi chahiye
  const { user, authLoading } = useContext(AuthContext); 

  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Sirf tab call karein jab user.uid mil jaye
    if (user?.uid) {
      getUserAppointments(user.uid).catch((e) => {
        console.error("getUserAppointments error:", e);
        setError("Failed to load appointments.");
      });
    }
  }, [user?.uid, getUserAppointments]);

  const handleCancel = async (id) => {
    const isConfirmed = window.confirm("Cancel this appointment?");
    if (!isConfirmed) return;

    try {
      setBusyId(id);
      setError(null);
      const result = await cancelAppointment(id);
      if (!result?.success) {
        const err = result?.error || "Cancel failed";
        setError(err);
        alert(err);
      } else {
        alert("Appointment cancelled.");
        if (user?.uid) getUserAppointments(user.uid).catch(() => {});
      }
    } catch (err) {
      console.error("Cancel exception:", err);
      setError("Cancel failed — try again.");
    } finally {
      setBusyId(null);
    }
  };

  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const activeAppointment = safeAppointments.find((a) => a.status === "active");
  const history = safeAppointments.filter((a) => a.status !== "active");

  const fmtDate = (item) => {
    const raw = item?.appointmentAt ?? item?.date ?? item?.displayDate ?? item?.dateString ?? item?.createdAt;
    if (!raw) return "—";
    try {
      const d = new Date(raw);
      return isNaN(d.getTime()) ? String(raw) : d.toLocaleDateString();
    } catch {
      return String(raw);
    }
  };

  // ✅ CRITICAL FIX: Jab tak Auth confirm na ho, ya data load ho raha ho, "No found" mat dikhao.
  if (authLoading || (loading && safeAppointments.length === 0)) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-500 text-lg font-bold uppercase tracking-widest">
          Loading Appointments...
        </div>
      </div>
    );
  }

  // Agar loading khatam ho gayi aur user nahi hai (logged out)
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-red-500">Please login to view your appointments.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-10">
        My Appointments
      </h1>

      {error && <div className="mb-6 p-4 bg-red-50 text-sm text-red-600 rounded-xl">{error}</div>}

      {activeAppointment ? (
        <div className="bg-black text-gray-200 rounded-[2.5rem] p-8 shadow-2xl border-l-8 border-red-600 flex flex-col md:flex-row gap-10 items-center transition-all hover:scale-[1.01]">
          <div>
            <h2 className="text-2xl font-black text-white uppercase">
              {activeAppointment.mechanicName || "—"}
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4 border-l border-gray-800 pl-8">
            <div>
              <p className="text-xs text-gray-500 uppercase">Vehicle</p>
              <p className="font-bold text-white">
                {activeAppointment.vehicleModel || "—"} 
                <span className="text-gray-500 text-sm ml-2">({activeAppointment.vehicleNumber || "—"})</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Issue</p>
              <p className="italic">{activeAppointment.issue || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Date</p>
              <p>{fmtDate(activeAppointment)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Time</p>
              <p>{activeAppointment.time || "—"}</p>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-3xl font-black text-red-600">
              ₹{activeAppointment.fee ?? "—"}
            </p>
            <button
              onClick={() => handleCancel(activeAppointment.id)}
              disabled={busyId === activeAppointment.id}
              className="bg-red-600 px-6 py-3 rounded-xl text-white text-xs font-bold uppercase hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {busyId === activeAppointment.id ? "Cancelling..." : "Cancel"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-100 rounded-2xl p-8 text-center text-gray-400 border-2 border-dashed border-slate-200">
          No active appointment found.
        </div>
      )}

      <div className="mt-16">
        <h3 className="text-xl font-black mb-6 border-b-4 border-red-600 pb-2 inline-block uppercase">
          Service History
        </h3>

        <div className="grid gap-4">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-black text-sm uppercase">
                    {item.mechanicName || "—"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.vehicleModel || "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold mb-1">{fmtDate(item)}</p>
                  <span className="text-[10px] px-3 py-1 bg-green-100 text-green-700 font-bold uppercase rounded-full">
                    {item.status || "Completed"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No service history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;