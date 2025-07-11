import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; // Make sure this points to your API base
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // // login using saved cookies
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/userAuth/profile`,
          {
            withCredentials: true,
          }
        );
        setUser(true);
      } catch (err) {
        setUser(false);
        // console.log("User not logged in:", err.message);
      }
    };

    checkLogin();
  }, []);

  // Cart
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Addresses
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const data = localStorage.getItem("savedAddresses");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // 🟢 Fetch Products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setProducts(res.data.products || []);
        setProductError(null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProductError("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Cart Logic
  const getCartQuantityById = (_id) => {
    const item = cartItems.find((item) => item._id === _id);
    return item ? item.quantity : 0;
  };

  const addToCart = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === productId);
      if (existing) {
        return prev.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            _id: product._id,
            name: product.name,
            price: product.offerPrice,
            image: product.image[0],
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const updateQuantity = (_id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item._id === _id ? { ...item, quantity: qty } : item))
    );
  };

  // Value to share in context
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
    loadingProducts,
    productError,
    searchQuery,
    setSearchQuery,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartQuantityById,
    selectedAddress,
    setSelectedAddress,
    savedAddresses,
    setSavedAddresses,
    showAddressModal,
    setShowAddressModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
