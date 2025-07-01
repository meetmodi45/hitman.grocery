import React from "react";
import { categories } from "../../assets/assets";

const AddItems = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10 bg-white min-h-full">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary-dull">
        Add New Product
      </h2>

      <form className="space-y-6 max-w-3xl w-full">
        {/* Product Image Upload */}
        <div>
          <p className="text-base font-medium text-gray-800">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    className="w-20 sm:w-24 cursor-pointer border border-dashed border-gray-300 rounded"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    alt="uploadArea"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="product-name"
            className="text-base font-medium text-gray-800"
          >
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="outline-none py-2 px-3 rounded border border-gray-300 w-full"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="product-description"
            className="text-base font-medium text-gray-800"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Write a short description..."
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none w-full"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-base font-medium text-gray-800"
          >
            Category
          </label>
          <select
            id="category"
            className="outline-none py-2 px-3 rounded border border-gray-300 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.text}>
                {category.text}
              </option>
            ))}
          </select>
        </div>

        {/* Prices (Grid layout for responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="product-price"
              className="text-base font-medium text-gray-800"
            >
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300 w-full"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="offer-price"
              className="text-base font-medium text-gray-800"
            >
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300 w-full"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-fit px-8 py-2.5 bg-primary hover:bg-primary-dull text-white font-medium rounded transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;
