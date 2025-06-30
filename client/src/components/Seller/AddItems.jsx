import React from "react";

const AddItems = () => {
  return (
    <div className="p-6 md:p-10 bg-white min-h-full">
      <h2 className="text-2xl font-semibold mb-6 text-primary-dull">
        Add New Product
      </h2>
      <form className="space-y-6 max-w-2xl">
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
                    className="max-w-24 cursor-pointer border border-dashed border-gray-300 rounded"
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
            className="text-base font-medium text-gray-800"
            htmlFor="product-name"
          >
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium text-gray-800"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Write a short description..."
            className="outline-none py-2 px-3 rounded border border-gray-300 resize-none"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label
            className="text-base font-medium text-gray-800"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            className="outline-none py-2 px-3 rounded border border-gray-300"
            required
          >
            <option value="">Select Category</option>
            {["Electronics", "Clothing", "Accessories"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Prices */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium text-gray-800"
              htmlFor="product-price"
            >
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label
              className="text-base font-medium text-gray-800"
              htmlFor="offer-price"
            >
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none py-2 px-3 rounded border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-primary hover:bg-primary-dull text-white font-medium rounded transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;
