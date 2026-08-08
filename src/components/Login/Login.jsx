import React, { useState, useEffect } from "react";
import { FaGoogle, FaTimes } from "react-icons/fa";
import { playSound } from "../../sounds-src/SoundManager";

const Login = ({ setShowLogin, initialMode, onSuccess }) => {
  const [showSignup, setShowSignup] = useState(
    initialMode === "signup"
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const closeLogin = () => {
    if (isClosing) return;

    playSound("button");
    setIsClosing(true);

    setTimeout(() => {
      setShowLogin(false);
    }, 500);
  };

  const handleSuccess = () => {
    if (!email || !password) {
      return;
    }

    playSound("success");
    setIsClosing(true);

    setTimeout(() => {
      onSuccess(email);
    }, 500);
  };

  const handleSignupSwitch = () => {
    playSound("button");
    setShowSignup(true);
    setEmail("");
    setPassword("");
  };

  const handleLoginSwitch = () => {
    playSound("button");
    setShowSignup(false);
    setEmail("");
    setPassword("");
  };

  const handleGoogle = () => {
    playSound("button");

    // Placeholder for future Google authentication.
    // When the backend is ready, this will connect to Google OAuth.
  };

  const handleForgotPassword = () => {
    playSound("button");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
        isClosing
          ? "bg-black/0 backdrop-blur-0"
          : isVisible
            ? "bg-black/30 backdrop-blur-sm"
            : "bg-black/0 backdrop-blur-0"
      }`}
      onClick={closeLogin}
    >
      <div
        className={`relative w-105 max-w-[calc(100vw-2rem)] rounded-3xl bg-white p-8 shadow-2xl transition-all duration-500 ease-in-out dark:bg-zinc-950 ${
          isClosing
            ? "-translate-y-16 opacity-0"
            : isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-16 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeLogin}
          className="absolute right-6 top-6 text-gray-500 transition hover:scale-110 hover:text-black dark:hover:text-white"
          aria-label="Close authentication"
        >
          <FaTimes size={20} />
        </button>

        {showSignup ? (
          <>
            {/* SIGN UP */}

            <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
              Create Account
            </h1>

            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Join ARTA and start exploring amazing artwork.
            </p>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Create Account */}
            <button
              onClick={handleSuccess}
              disabled={!email || !password}
              className="mb-5 w-full rounded-xl bg-lime-700 py-3 font-semibold text-white transition-all duration-300 hover:bg-lime-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Account
            </button>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <button
                onClick={handleLoginSwitch}
                className="font-semibold text-lime-700 hover:underline dark:text-lime-500"
              >
                Log In
              </button>
            </p>
          </>
        ) : (
          <>
            {/* LOGIN */}

            <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
              Welcome Back
            </h1>

            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Sign in to continue exploring amazing artwork.
            </p>

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none transition-colors duration-300 placeholder:text-gray-500 focus:border-lime-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400"
              />
            </div>

            {/* Options */}
            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-black dark:text-white">
                <input type="checkbox" />
                Remember me
              </label>

              <button
                onClick={handleForgotPassword}
                className="text-lime-700 hover:underline dark:text-lime-500"
              >
                Forgot Password?
              </button>
            </div>

            {/* Log In */}
            <button
              onClick={handleSuccess}
              disabled={!email || !password}
              className="mb-5 w-full rounded-xl bg-lime-700 py-3 font-semibold text-white transition-all duration-300 hover:bg-lime-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Log In
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />

              <span className="text-sm text-gray-500 dark:text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 text-black transition-colors duration-300 hover:bg-gray-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            >
              <FaGoogle />
              Continue with Google
            </button>

            {/* Signup */}
            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                onClick={handleSignupSwitch}
                className="font-semibold text-lime-700 hover:underline dark:text-lime-500"
              >
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;