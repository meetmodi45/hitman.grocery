import React from "react";
import MainBanner from "../components/mainbanner";
import Categories from "../components/categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/Bottombanner";
import Subscribe from "../components/Subscribe";

const Home = () => {
  return (
    <div className="mt-12">
      <MainBanner />
      <Categories />
      <BestSellers />
      <BottomBanner />
      <Subscribe />
    </div>
  );
};

export default Home;
