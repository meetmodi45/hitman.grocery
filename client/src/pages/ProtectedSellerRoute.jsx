import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useAppContext } from "../context/AppContext";

const ProtectedSellerRoute = ({ children }) => {
  const { isSeller, setIsSeller } = useAppContext();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySeller = async () => {
      try {
        const res = await axios.get("/seller/check-auth", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      } catch (error) {
        setIsSeller(false);
      } finally {
        setChecking(false);
      }
    };

    verifySeller();
  }, []);

  if (checking) return <div>Loading...</div>;

  return isSeller ? children : <Navigate to="/seller-login" replace />;
};

export default ProtectedSellerRoute;
