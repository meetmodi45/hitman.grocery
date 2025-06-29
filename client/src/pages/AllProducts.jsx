import React from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { products } = useAppContext();
  const [counts, setCounts] = React.useState({});

  const handleAdd = (index) => {
    setCounts((prev) => ({ ...prev, [index]: 1 }));
    toast.success("Added to Cart");
  };

  const handleChange = (index, delta) => {
    setCounts((prev) => {
      const newCount = Math.max((prev[index] || 0) + delta, 0);
      const action = delta > 0 ? "Added" : "Removed";
      if (newCount === 0 && delta < 0) {
        toast("Removed from Cart", {
          icon: "❌",
        });
      } else if (delta !== 0) {
        toast(`${action} to Cart`);
      }
      return { ...prev, [index]: newCount };
    });
  };

  return (
    <div className="mt-16 mb-16 px-4">
      <p className="text-2xl md:text-3xl font-medium mb-6">All Products</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product, index) => {
          const count = counts[index] || 0;

          return (
            <div
              key={product._id}
              className="bg-gradient-to-br from-blue-50 via-white to-green-50 border border-gray-200 rounded-xl p-4 w-full max-w-[220px] sm:max-w-[240px] lg:max-w-[260px] shadow-sm hover:shadow-md transition"
            >
              <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                  className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                  {product.name}
                </p>
                {/* Rating Stars (optional logic) */}
                <div className="flex items-center gap-0.5">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <img
                        key={i}
                        src={
                          i < (product.rating || 0)
                            ? assets.star_icon
                            : assets.star_dull_icon
                        }
                        alt="star"
                        className="w-4 h-4"
                      />
                    ))}
                  <p>({product.rating || 0})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium text-primary">
                    ₹{product.offerPrice}{" "}
                    <span className="text-primary-dull md:text-sm text-xs line-through">
                      ₹{product.price}
                    </span>
                  </p>

                  {/* Add or Counter */}
                  <div className="text-primary">
                    {count === 0 ? (
                      <button
                        onClick={() => handleAdd(index)}
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
                          onClick={() => handleChange(index, -1)}
                          className="text-base font-medium hover:text-green-600"
                        >
                          −
                        </button>
                        <span className="text-base font-medium">{count}</span>
                        <button
                          onClick={() => handleChange(index, 1)}
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

export default AllProducts;
