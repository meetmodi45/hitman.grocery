import React from "react";
import MainBanner from "../components/mainbanner";
import Categories from "../components/categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/Bottombanner";
import Subscribe from "../components/Subscribe";

const Home = () => {
  return (
    <div className="mt-6 sm:mt-12 pt-20">
      <MainBanner />
      <Categories />
      <BestSellers />
      <BottomBanner />
      <Subscribe />
    </div>
  );
};

export default Home;
