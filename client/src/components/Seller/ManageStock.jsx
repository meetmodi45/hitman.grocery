import React, { useState, useRef, useEffect } from "react";
import { dummyProducts } from "../../assets/assets";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

const ManageStock = () => {
  return (
    <div className="flex-1 pb-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary-dull">
          Manage Stock
        </h2>

        {/* Scrollable on small screens */}
        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-900 bg-gray-100 text-sm">
              <tr>
                <th className="px-4 py-3 font-medium whitespace-nowrap">
                  Product
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap hidden sm:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap hidden md:table-cell">
                  Offer Price
                </th>
                <th className="px-4 py-3 font-medium whitespace-nowrap">
                  In Stock
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700 bg-white">
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
  const [inStock, setInStock] = useState(product.inStock);
  const [lastPrice, setLastPrice] = useState(product.offerPrice);

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
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handlePriceChange = (e) => {
    const newVal = e.target.value;
    if (!isNaN(newVal) && parseFloat(newVal) >= 0) {
      setPrice(newVal);
    }
  };

  const handleEditClick = () => {
    if (!isEditing && lastPrice !== price) {
      toast.success(`Offer price updated for "${product.name}" ✅`);
      setLastPrice(price);
    }
    setIsEditing(true);
  };

  return (
    <tr
      ref={rowRef}
      className="border-t border-gray-200 hover:bg-gray-50 transition"
    >
      {/* Product cell with mobile price editor */}
      <td className="px-4 py-3 min-w-[220px]">
        <div className="flex items-center gap-3">
          <img
            src={product.image?.[0]}
            alt={product.name}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain border rounded"
          />
          <div>
            <p className="font-medium text-sm sm:text-base">{product.name}</p>

            {/* Mobile-only editable price */}
            <div className="flex items-center gap-2 mt-1 sm:hidden">
              <input
                type="number"
                ref={inputRef}
                value={price}
                readOnly={!isEditing}
                onBlur={() => setIsEditing(false)}
                onChange={handlePriceChange}
                className={`w-24 px-2 py-1 rounded border font-medium text-gray-800 text-sm transition-all ${
                  isEditing
                    ? "border-blue-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                    : "border-gray-300 bg-gray-100 cursor-default"
                }`}
              />
              <button
                type="button"
                onClick={handleEditClick}
                className="text-gray-500 hover:text-blue-600"
              >
                <FiEdit size={14} />
              </button>
            </div>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3 hidden sm:table-cell whitespace-nowrap text-sm">
        {product.category}
      </td>

      {/* Price input on medium+ */}
      <td className="px-4 py-3 hidden md:table-cell whitespace-nowrap">
        <div className="flex items-center gap-2">
          <input
            type="number"
            ref={inputRef}
            value={price}
            readOnly={!isEditing}
            onBlur={() => setIsEditing(false)}
            onChange={handlePriceChange}
            className={`w-20 px-2 py-1 rounded border font-medium text-gray-800 transition-all ${
              isEditing
                ? "border-blue-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                : "border-gray-300 bg-gray-100 cursor-default"
            }`}
          />
          <button
            type="button"
            onClick={handleEditClick}
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
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          <div className="w-12 h-7 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200" />
          <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
        </label>
      </td>
    </tr>
  );
};

export default ManageStock;
