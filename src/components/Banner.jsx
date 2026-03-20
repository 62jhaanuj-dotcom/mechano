import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AuthContext } from "../context/AuthContext";

const Banner = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="mx-10 my-20 bg-white text-black border-t-4 border-black rounded-3xl flex flex-col md:flex-row items-center justify-between px-10 py-12 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug"> 
          <span className="text-red-600">Book Appointment</span> IN Seconds <br />
          With Trusted Mechanics
        </h2>

        <p className="text-black-300 mt-3 text-lg font-semibold">
          Join Mechano today and connect with skilled mechanics for reliable and
          fast vehicle service.
        </p>

        <button
          onClick={() => navigate(user ? "/my-profile" : "/login")}
         className="bg-black text-white text-xs font-bold tracking-widest px-7 py-3.5
               rounded-full hover:bg-red-600 hover:shadow-lg transition-all duration-300 active:scale-95"
          >

          {user ? "My Profile →" : "Create Account →"}
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <img
        src={assets.Banner_img}
        alt="mechanic banner"
        className="mt-8 md:mt-0 md:h-72 object-contain drop-shadow-2xl"
      />
    </div>
  );
};

export default Banner;
