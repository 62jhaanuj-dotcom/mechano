// context/AppointmentContext.js
import { createContext } from "react";

export const AppointmentContext = createContext({
  appointments: [],
  loading: false,
  bookAppointment: async () => ({ success: false }),
  getUserAppointments: async () => ({ success: false }),
  cancelAppointment: async () => ({ success: false }),
});