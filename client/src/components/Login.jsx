import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Disable scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  // 🧠 Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "register") {
        const res = await axios.post("/users/register", {
          name,
          email,
          password,
        });
        toast.success(res.data.message);
        setUser(true);
      } else {
        const res = await axios.post("/users/login", { email, password });
        toast.success(res.data.message);
        setUser(true);
      }
      setShowUserLogin(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/users/logout");
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-150 max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-5 transition-transform animate-fadeIn"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm text-gray-800"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        <div>
          <label className="text-sm text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm text-gray-800"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm text-gray-800"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <p className="text-sm text-center text-gray-500">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </>
          )}
        </p>

        <button
          type="submit"
          className="w-full py-2 rounded-full bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-200"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
