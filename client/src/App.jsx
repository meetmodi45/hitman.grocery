import react from "react";
import Navbar from "./components/navbar";
import MainBanner from "./components/mainbanner";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetails";

const App = () => {
  const { showUserLogin } = useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <div
        className={`${
          isSellerPath
            ? ""
            : "px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 2xl:px-32"
        }`}
      >
        {showUserLogin ? <Login /> : null}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:categoryName" element={<ProductCategory />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Footer />
    </div>
  );
};
export default App;
