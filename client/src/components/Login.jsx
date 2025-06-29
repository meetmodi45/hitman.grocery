import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowUserLogin } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Disable scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-5 transition-transform animate-fadeIn"
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
