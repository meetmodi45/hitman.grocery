import React from "react";
import MainBanner from "../components/mainbanner";
import Categories from "../components/categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/Bottombanner";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSellers />
      <BottomBanner />
    </div>
  );
};

export default Home;
