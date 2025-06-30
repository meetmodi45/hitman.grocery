import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    user,
    setShowUserLogin,
    navigate,
    selectedAddress,
    savedAddresses,
    setSelectedAddress,
    setShowAddressModal, // use this to trigger modal component
  } = useAppContext();

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const removeItem = (_id) => {
    removeFromCart(_id);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = Math.round(totalPrice * 0.05);
  const finalAmount = totalPrice + gst;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto pt-24">
      {/* Left - Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Shopping Cart{" "}
          <span className="text-sm text-green-600 font-medium">
            {cartItems.length} Items
          </span>
        </h1>

        {cartItems.length > 0 ? (
          <>
            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-semibold pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium text-gray-700 pt-3 border-b border-gray-200 pb-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 flex items-center justify-center border border-gray-300 rounded-md overflow-hidden">
                    <img
                      className="max-w-full h-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <p className="font-semibold mb-4">{item.name}</p>
                    <div className="flex items-center gap-1">
                      <p>Qty:</p>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id, Number(e.target.value))
                        }
                        className="outline-none border border-gray-300 px-2 py-0.5 rounded text-sm"
                      >
                        {[...Array(9)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-center font-semibold text-primary">
                  ₹{Number(item.quantity) * Number(item.price)}
                </p>

                <button
                  className="cursor-pointer mx-auto"
                  onClick={() => removeItem(item._id)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#EF4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        <button
          className="group flex items-center mt-8 gap-2 text-primary-dull font-medium hover:underline transition"
          onClick={() => navigate("/products")}
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#4CAF50"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      {/* Right - Summary */}
      <div className="max-w-[360px] w-full h-full bg-white p-5 border border-gray-200 rounded-md shadow-md max-md:mt-12">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-gray-600">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500 text-sm w-[70%]">
              {selectedAddress || "No address found"}
            </p>
            <button
              onClick={() => setShowAddressDropdown(!showAddressDropdown)}
              className="text-green-600 hover:underline text-sm"
            >
              {selectedAddress ? "Change" : "Add"}
            </button>

            {showAddressDropdown && (
              <div className="absolute top-12 left-0 py-1 bg-white border border-gray-300 text-sm w-full shadow-md z-50">
                {savedAddresses.map((addr, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSelectedAddress(addr);
                      setShowAddressDropdown(false);
                    }}
                    className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {addr}
                  </p>
                ))}
                <p
                  onClick={() => {
                    setShowAddressModal(true);
                    setShowAddressDropdown(false);
                  }}
                  className="text-green-600 text-center p-2 hover:bg-green-100 cursor-pointer"
                >
                  + Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-gray-600">
            Payment Method
          </p>
          <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 text-sm rounded-md outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-600 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>GST Charges</span>
            <span>₹{gst}</span>
          </p>
          <p className="flex justify-between text-base font-semibold mt-3 text-gray-800">
            <span>Total Amount:</span>
            <span>₹{finalAmount}</span>
          </p>
        </div>

        {user ? (
          <button className="w-full py-3 mt-6 bg-primary-dull hover:bg-primary hover:shadow-lg transform hover:scale-105 text-white font-semibold rounded-md transition">
            Place Order
          </button>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className="w-full py-3 mt-6 bg-primary-dull hover:bg-primary hover:shadow-lg transform hover:scale-105 text-white font-semibold rounded-md transition"
          >
            Login to Place Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
