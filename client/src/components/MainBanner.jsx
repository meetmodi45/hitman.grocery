import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Images */}
      <div>
        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full hidden md:block"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="banner"
          className="w-full md:hidden"
        />
      </div>

      {/* Content Overlay - Adjusted padding to match navbar */}
      <div className="absolute inset-0 flex flex-col items-start justify-end md:justify-center pb-24 md:pb-0 pl-6 md:pl-12 lg:pl-16 xl:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-left max-w-xs md:max-w-md lg:max-w-2xl leading-tight lg:leading-[1.15]">
          Freshness You Can Trust, Savings You will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium space-x-4">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-6 md:px-8 py-3 bg-primary hover:bg-primary-dull transition-all duration-300 rounded text-white cursor-pointer"
          >
            Shop now
            <img
              className="md:hidden transition-all duration-300 group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-6 md:px-8 py-3 text-gray-800 hover:text-black transition-all duration-300 cursor-pointer"
          >
            Explore deals
            <img
              className="transition-all duration-300 group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
