import { useState } from "react";
import { AppContext } from "./AppContext";
import { mechanics } from "../assets/assets_frontend/assets";

const AppContextProvider = ({ children }) => {

  const [mechanicsData] = useState(mechanics);

  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    vehicleModel: "",
    vehicleNumber: "",
    issue: ""
  });

  const value = {
    mechanics: mechanicsData,
    bookingDetails,
    setBookingDetails
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;