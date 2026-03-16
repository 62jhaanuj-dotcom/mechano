import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {

  const images = [
    assets.header_img,
    assets.header_imgg,
    assets.header_imggg
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-3xl px-6 md:px-12 lg:px-20 py-10 md:py-20 flex flex-col md:flex-row items-center gap-12 overflow-hidden">

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-8 md:w-1/2">

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1]">
          Find the Best <br />
          <span className="text-red-600">Mechanics</span> Near You
        </h1>

        <p className="text-black-200 text-lg md:text-xl font-semibold max-w-md leading-relaxed">
          Book trusted mechanics instantly. Get fast service, affordable pricing
          and reliable repairs for your vehicle.
        </p>

        <div className="flex gap-4">

          <a
            href="#speciality"
            className="bg-black text-white text-xs font-bold tracking-widest px-7 py-3.5
               rounded-full hover:bg-red-600 hover:shadow-lg transition-all duration-300 active:scale-95"
          >

            Explore All Services
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

        </div>
      </div>

      {/* RIGHT SLIDER */}
      <div className="md:w-1/2 w-full relative">

        <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-[40px] shadow-2xl">

          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="mechanic"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-out
              ${
                index === i
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-110 translate-x-10"
              }`}
            />
          ))}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* DOT NAVIGATION */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full">

          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i
                  ? "w-8 bg-white"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}

        </div>
      </div>

    </div>
  );
};

export default Header;