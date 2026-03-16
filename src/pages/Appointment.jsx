import React, { useContext, useMemo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AppointmentContext } from "../context/AppointmentContext ";
import { AuthContext } from "../context/AuthContext";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mechanics, bookingDetails } = useContext(AppContext) || {};
  const { bookAppointment, loading: contextLoading } =
    useContext(AppointmentContext) || {};
  const { user } = useContext(AuthContext) || {};

  // user must explicitly choose a date
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
  ];

  // accept either _id or id for mechanics
  const mechInfo = useMemo(() => {
    if (!Array.isArray(mechanics)) return null;
    return mechanics.find(
      (m) => String(m._id) === String(docId) || String(m.id) === String(docId),
    );
  }, [docId, mechanics]);

  useEffect(() => {
    if (!mechInfo && Array.isArray(mechanics) && mechanics.length > 0) {
      // mechanic not found -> go back to listing
      navigate("/mechanics");
    }
  }, [mechInfo, mechanics, navigate]);

  const handleBooking = async () => {
    // validations
    if (selectedDateIndex === null) {
      alert("Please select a date.");
      return;
    }
    if (!selectedTime) {
      alert("Please select a time slot.");
      return;
    }
    if (!bookingDetails?.vehicleModel || !bookingDetails?.vehicleNumber) {
      alert("Vehicle details missing.");
      return;
    }
    if (!user?.uid) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }
    if (!mechInfo) {
      alert("Mechanic information missing.");
      return;
    }

    setLocalLoading(true);
    try {
      // compute appointment date (today + selectedDateIndex)
      const appointmentDate = new Date();
      appointmentDate.setDate(
        appointmentDate.getDate() + Number(selectedDateIndex),
      );

      const isoDate = appointmentDate.toISOString();
      const displayDate = appointmentDate.toLocaleDateString();

      const appointmentData = {
        userId: user.uid,

        userName: user.name || user.displayName || "User",
        userPhone: user.phone || user.phoneNumber || "N/A",

        mechanicId: mechInfo._id ?? mechInfo.id,
        mechanicName: mechInfo.name ?? "Unknown",

        vehicleModel: bookingDetails.vehicleModel,
        vehicleNumber: bookingDetails.vehicleNumber,
        issue: bookingDetails.issue || "",

        date: isoDate,
        displayDate,
        timeSlot: selectedTime,

        fee: mechInfo.fees ?? 0,

        status: "active",
      };

      console.log("Attempting booking with payload:", appointmentData);

      console.log("Attempting booking with payload:", appointmentData);

      const result = await bookAppointment(appointmentData);
      console.log("bookAppointment result:", result);

      if (result?.success) {
        alert("Booking confirmed!");
        navigate("/my-appointments");
      } else {
        const err = result?.error || "Booking failed — try again.";
        alert(err);
      }
    } catch (err) {
      console.error("Booking exception:", err);
      alert("Booking failed — check console for details.");
    } finally {
      setLocalLoading(false);
    }
  };

  if (!mechInfo) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading mechanic...
      </div>
    );
  }

  const isBusy = localLoading || contextLoading;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={() => navigate("/mechanics")}
          className="flex items-center gap-2 text-gray-700 hover:text-black font-bold text-sm"
        >
          ← Back to Mechanics
        </button>

        <div className="text-right">
          <h1 className="text-4xl font-black text-slate-900">
            Finalize Appointment
          </h1>

          <p className="text-gray-700 font-bold">
            Secure selection for
            <span className="text-red-600 font-extrabold ml-1">
              {mechInfo.name}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 border shadow-sm flex flex-col md:flex-row gap-10">
            <div className="w-56 h-64 rounded-[2rem] overflow-hidden">
              <img
                src={mechInfo.image}
                alt={mechInfo.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <span className="inline-block px-4 py-1 rounded-full bg-slate-900 text-gray-200 text-[10px] font-black uppercase mb-4">
                {(mechInfo.speciality || "").replace("_", " ")}
              </span>

              <h2 className="text-4xl font-black text-black-200 mb-3">
                {mechInfo.name}
              </h2>

              <p className="text-black-200 text-sm mb-8">
                {mechInfo.about ||
                  "Automotive specialist dedicated to precision service."}
              </p>

              <div className="flex gap-10 border-t pt-6">
                <div>
                  <p className="text-xs text-black-200 uppercase">Experience</p>
                  <p className="text-xl font-black">
                    {mechInfo.experience ?? "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-black-200 uppercase">
                    Consultation
                  </p>
                  <p className="text-3xl font-black text-red-600">
                    ₹{mechInfo.fees ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SLOT PICKER */}
          <div className="bg-white rounded-[3rem] p-10 border shadow-sm">
            <h3 className="text-xl font-black mb-8 uppercase">
              Available Slots
            </h3>

            <div className="flex gap-4 overflow-x-auto pb-6">
              {[...Array(7)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDateIndex(i)}
                    className={`flex flex-col items-center min-w-[75px] py-5 rounded-[2rem] border-2 ${
                      selectedDateIndex === i
                        ? "bg-black text-white border-black"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase">
                      {days[date.getDay()]}
                    </span>
                    <span className="text-xl font-black">{date.getDate()}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-8 py-3 rounded-2xl text-xs font-black uppercase border-2 ${
                    selectedTime === slot
                      ? "bg-black text-white border-black"
                      : "bg-slate-50 text-gray-400"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-4">
          <div className="bg-black text-gray-200 rounded-[3rem] px-10 py-12 border-t-8 border-red-600">
            <h3 className="text-2xl font-black mb-10 text-white uppercase">
              Order Summary
            </h3>

            <div className="space-y-8">
              <div>
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Vehicle Details
                </p>
                <p className="text-lg font-black text-white">
                  {bookingDetails?.vehicleModel || "---"}
                  <span className="text-red-600 ml-2">
                    #{bookingDetails?.vehicleNumber || "N/A"}
                  </span>
                </p>
              </div>

              <div className="border-t pt-8">
                <div className="flex justify-between mb-10">
                  <p className="text-gray-500 uppercase text-xs">Total Fee</p>
                  <p className="text-4xl font-black text-red-600">
                    ₹{mechInfo.fees ?? 0}
                  </p>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={
                    isBusy || !selectedTime || selectedDateIndex === null
                  }
                  className="w-full py-5 bg-white text-black hover:bg-gray-200 rounded-2xl font-black text-lg disabled:opacity-50"
                >
                  {isBusy ? "Processing..." : "Confirm & Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
