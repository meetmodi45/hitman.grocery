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

  // OTP related
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  useEffect(() => {
    let interval;
    if (countdown > 0) {
      interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!email) return toast.error("Enter email first");
    try {
      setLoadingOtp(true);
      const res = await axios.post("/otp/send", { email });
      toast.success(res.data.message);
      setOtpSent(true);
      setCountdown(15);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP Error");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP first");
    try {
      setLoadingOtp(true);
      const res = await axios.post("/otp/verify", { email, otp });
      toast.success(res.data.message);
      setOtpVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified)
      return toast.error("Please verify your email via OTP first");
    try {
      const endpoint =
        state === "register" ? "/users/register" : "/users/login";
      const payload =
        state === "register" ? { name, email, password } : { email, password };
      const res = await axios.post(endpoint, payload);
      toast.success(res.data.message);
      setUser(true);
      setShowUserLogin(false);
      setName("");
      setEmail("");
      setPassword("");
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (otpSent || otpVerified) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setCountdown(0);
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
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-5 animate-fadeIn"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            {state === "login" ? "Login" : "Sign Up"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {state === "login"
              ? "Welcome back! Please sign in"
              : "Create your account to get started"}
          </p>
        </div>

        {state === "register" && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-md bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary"
              placeholder="Enter your name"
              required
            />
          </div>
        )}

        {/* Email and OTP */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="flex-1 px-4 py-2.5 rounded-md bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary"
              placeholder="Enter email"
              required
            />
            {!otpVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loadingOtp || countdown > 0 || !email}
                className={`min-w-[110px] px-4 py-2.5 text-sm font-medium rounded-md transition ${
                  loadingOtp || countdown > 0 || !email
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dull"
                }`}
              >
                {loadingOtp
                  ? "Sending..."
                  : countdown > 0
                  ? `Wait ${countdown}s`
                  : otpSent
                  ? "Resend OTP"
                  : "Send OTP"}
              </button>
            )}
          </div>

          {otpSent && !otpVerified && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="flex-1 px-4 py-2.5 rounded-md bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loadingOtp || !otp}
                className={`min-w-[110px] px-4 py-2.5 text-sm font-medium rounded-md transition ${
                  loadingOtp || !otp
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dull"
                }`}
              >
                {loadingOtp ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {otpVerified && (
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Email verified
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md bg-gray-50 border border-gray-300 focus:ring-primary focus:border-primary"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!otpVerified}
          className={`w-full py-2.5 rounded-md text-sm font-medium transition ${
            !otpVerified
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>

        {/* Toggle */}
        <p className="text-sm text-center text-gray-500 pt-2">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("login");
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                  setCountdown(0);
                }}
                className="text-primary font-medium hover:underline"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setState("register");
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                  setCountdown(0);
                }}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
