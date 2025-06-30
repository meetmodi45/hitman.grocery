import React, { useState, useRef, useEffect } from "react";
import { dummyProducts } from "../../assets/assets";
import { FiEdit } from "react-icons/fi";

const ManageStock = () => {
  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="text-2xl font-semibold mb-6 text-primary-dull">
          Manage Stock
        </h2>

        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate">Category</th>
                <th className="px-4 py-3 font-medium truncate hidden md:block">
                  Offer Price
                </th>
                <th className="px-4 py-3 font-medium truncate">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700 bg-white">
              {dummyProducts.map((product) => (
                <ProductRow key={product._id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductRow = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(product.offerPrice);
  const inputRef = useRef(null);
  const rowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (rowRef.current && !rowRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <tr
      ref={rowRef}
      className="border-t border-gray-200 hover:bg-gray-50 transition"
    >
      {/* Product Cell */}
      <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
        <div className="border border-gray-300 rounded p-1.5">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-14 h-14 object-contain"
          />
        </div>
        <span className="truncate max-sm:hidden w-full font-medium">
          {product.name}
        </span>
      </td>

      {/* Category */}
      <td className="px-4 py-3">{product.category}</td>

      {/* Offer Price */}
      <td className="px-4 py-3 max-sm:hidden">
        <div className="flex items-center gap-2">
          <input
            type="number"
            ref={inputRef}
            value={price}
            readOnly={!isEditing}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-20 px-2 py-1 rounded border font-medium text-gray-800 transition-all ${
              isEditing
                ? "border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                : "border-gray-300 bg-gray-100 cursor-default"
            }`}
          />
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="text-gray-500 hover:text-blue-600"
          >
            <FiEdit size={16} />
          </button>
        </div>
      </td>

      {/* In Stock Toggle */}
      <td className="px-4 py-3">
        <label className="relative inline-flex items-center cursor-pointer gap-3">
          <input
            type="checkbox"
            className="sr-only peer"
            defaultChecked={product.inStock}
          />
          <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200" />
          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
        </label>
      </td>
    </tr>
  );
};

export default ManageStock;
