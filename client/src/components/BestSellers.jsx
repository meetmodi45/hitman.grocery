import React from "react";
import { bestSellers } from "../assets/assets";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const BestSellers = () => {
  const {
    getCartQuantityById,
    addToCart,
    updateQuantity,
    removeFromCart,
    navigate,
  } = useAppContext();

  const handleAdd = (productId) => {
    addToCart(productId);
    toast.success("Added to Cart");
  };

  const handleChange = (productId, delta) => {
    const currentQuantity = getCartQuantityById(productId);
    const newQuantity = currentQuantity + delta;

    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast("Removed from Cart", { icon: "❌" });
    } else {
      updateQuantity(productId, newQuantity);
      toast(`${delta > 0 ? "Added" : "Removed"} to Cart`);
    }
  };

  return (
    <div className="mt-16 mb-16">
      <p className="text-2xl md:text-3xl font-medium mb-6">Best Sellers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellers.map((product, index) => {
          const count = getCartQuantityById(product._id);

          return (
            <div
              key={product._id}
              className="bg-gradient-to-br from-blue-50 via-white to-green-50 border border-gray-200 rounded-xl p-4 w-full max-w-[220px] sm:max-w-[240px] lg:max-w-[260px] shadow-sm hover:shadow-md transition"
            >
              <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                  className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    // setSearchQuery("");
                    navigate(`/product/${product._id}`);
                    window.scrollTo(0, 0);
                  }}
                />
              </div>
              <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                  {product.name}
                </p>
                <div className="flex items-center gap-0.5">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < product.rating
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        alt="star"
                        className="w-4 h-4"
                      />
                    ))}
                  <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium text-primary">
                    ₹{product.offerPrice}{" "}
                    <span className="text-primary-dull md:text-sm text-xs line-through">
                      ₹{product.price}
                    </span>
                  </p>
                  <div className="text-primary">
                    {count === 0 ? (
                      <button
                        onClick={() => handleAdd(product._id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-green-400 text-green-500 bg-green-50 rounded-md shadow-sm hover:bg-green-200 transition duration-200"
                      >
                        <img
                          src={assets.cart_icon}
                          alt="cart"
                          className="w-4 h-4"
                        />
                        <span className="font-medium">Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-3 px-4 py-2 h-[40px] border border-green-400 text-green-500 bg-green-100 rounded-md shadow-sm transition duration-200">
                        <button
                          onClick={() => handleChange(product._id, -1)}
                          className="text-base font-medium hover:text-green-600"
                        >
                          −
                        </button>
                        <span className="text-base font-medium">{count}</span>
                        <button
                          onClick={() => handleChange(product._id, 1)}
                          className="text-base font-medium hover:text-green-600"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSellers;
