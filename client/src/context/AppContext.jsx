import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();
import { dummyProducts } from "../assets/assets";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const data = localStorage.getItem("savedAddresses");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedAddresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

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
