import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
import { dummyProducts } from "../assets/assets";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(dummyProducts);
  }, []);
  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    navigate,
    products,
    setProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
