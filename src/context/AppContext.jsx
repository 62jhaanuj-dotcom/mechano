import { createContext } from "react";


export const AppContext = createContext({
    mechanics: [],
    bookingDetails: {
        userName: "",
        vehicleModel: "",
        vehicleNumber: "",
        issue: ""
    },
    setBookingDetails: () => {} // empty function for error handling
});