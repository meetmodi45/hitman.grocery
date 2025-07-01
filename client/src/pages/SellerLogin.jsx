import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "admin@hitman.com",
    password: "hitman123",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy validation
    if (form.id === "admin@hitman.com" && form.password === "hitman123") {
      toast.success("Logged in as Seller ✅");
      navigate("/seller");
    } else {
      toast.error("Invalid ID or Password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 space-y-6 border border-gray-200">
        <div className="text-center">
          <img
            src="/hitman.grocery.logo.png"
            alt="Hitman Grocery"
            className="w-32 mx-auto mb-2"
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-primary-dull">
            Seller Login
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Seller ID
            </label>
            <input
              type="email"
              name="id"
              value={form.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dull transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
