import React, { useState, useCallback } from "react";
import { db } from "../utils/firebase";
import {AppointmentContext} from "../context/AppointmentContext ";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const AppointmentContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Convert Firestore document into usable object
  const processDoc = (d) => {
    const raw = d.data();

    return {
      id: d.id,
      ...raw,

      createdAt: raw?.createdAt?.toDate
        ? raw.createdAt.toDate().toISOString()
        : (raw?.createdAt ?? null),
    };
  };

  // GET USER APPOINTMENTS
  const getUserAppointments = useCallback(async (userId) => {
    if (!userId) return { success: false, error: "No userId provided" };

    setLoading(true);

    try {
      const q = query(
        collection(db, "appointments"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc"),
      );

      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(processDoc);

      setAppointments(items);

      return { success: true, data: items };
    } catch (error) {
      console.warn("Index missing, using fallback query");

      try {
        const qFallback = query(
          collection(db, "appointments"),
          where("userId", "==", userId),
        );

        const snapshot = await getDocs(qFallback);

        const items = snapshot.docs.map(processDoc);

        items.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

        setAppointments(items);

        return { success: true, data: items };
      } catch (fallbackError) {
        return {
          success: false,
          error: fallbackError.message,
        };
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // BOOK APPOINTMENT
  const bookAppointment = async (appointmentData) => {
    if (!appointmentData?.userId)
      return { success: false, error: "Missing userId" };

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "appointments"), {
        ...appointmentData, // ← save full payload exactly

        createdAt: serverTimestamp(),

        status: appointmentData.status || "pending",
      });

      const newAppointment = {
        id: docRef.id,
        ...appointmentData,
        createdAt: new Date().toISOString(),
      };

      setAppointments((prev) => [newAppointment, ...prev]);

      return { success: true, id: docRef.id };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    } finally {
      setLoading(false);
    }
  };

  // CANCEL APPOINTMENT
  const cancelAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));

      setAppointments((prev) => prev.filter((item) => item.id !== id));

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        bookAppointment,
        getUserAppointments,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;
