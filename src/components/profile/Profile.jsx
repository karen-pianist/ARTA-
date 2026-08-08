import React from "react";
import { Link } from "react-router-dom";
import {
  MdAccountCircle,
  MdLogin,
  MdPersonAdd,
  MdShoppingBag,
  MdSettings,
  MdFavoriteBorder,
  MdLogout,
} from "react-icons/md";
import { playSound } from "../../sounds-src/SoundManager";

const Profile = ({
  isLoggedIn,
  userEmail,
  setIsLoggedIn,
  setShowLogin,
  setLoginMode,
}) => {
  const handleLogin = () => {
    playSound("button");
    setLoginMode("login");
    setShowLogin(true);
  };

  const handleSignup = () => {
    playSound("button");
    setLoginMode("signup");
    setShowLogin(true);
  };

  const handleLogout = () => {
    playSound("button");
    setIsLoggedIn(false);
  };

  const handleButtonSound = () => {
    playSound("button");
  };

  const username = userEmail?.split("@")[0] || "there";

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-4xl">

        {/* Profile Header */}
        <div className="mb-14 text-center">
          <MdAccountCircle className="mx-auto mb-5 text-7xl text-gray-400 dark:text-gray-600" />

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
            Your Account
          </p>

          {isLoggedIn ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Hello, {username} 👋
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
                Welcome back to ARTA. Ready to discover some amazing artwork?
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome to ARTA
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
                Sign in to keep your saved artwork, purchases, and preferences
                in one place.
              </p>
            </>
          )}
        </div>

        {/* Logged-Out Authentication */}
        {!isLoggedIn && (
          <div className="grid gap-6 md:grid-cols-2">

            {/* Log In */}
            <button
              onClick={handleLogin}
              className="group rounded-3xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-lime-500"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 transition-transform duration-300 group-hover:scale-105 dark:bg-lime-950 dark:text-lime-500">
                <MdLogin className="text-3xl" />
              </div>

              <h2 className="text-2xl font-bold">
                Log In
              </h2>

              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                Already have an ARTA account? Sign in to access your saved
                artwork and preferences.
              </p>

              <div className="mt-6 font-semibold text-lime-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-lime-500">
                Log In →
              </div>
            </button>

            {/* Create Account */}
            <button
              onClick={handleSignup}
              className="group rounded-3xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-lime-500"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 transition-transform duration-300 group-hover:scale-105 dark:bg-lime-950 dark:text-lime-500">
                <MdPersonAdd className="text-3xl" />
              </div>

              <h2 className="text-2xl font-bold">
                Create Account
              </h2>

              <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                New to ARTA? Create an account to save your favorite artwork
                and personalize your experience.
              </p>

              <div className="mt-6 font-semibold text-lime-700 transition-transform duration-300 group-hover:translate-x-1 dark:text-lime-500">
                Create Account →
              </div>
            </button>

          </div>
        )}

        {/* Account Links */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          {/* Saved Artwork */}
          <Link
            to="/wishlist"
            onClick={handleButtonSound}
            className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <MdFavoriteBorder className="text-3xl text-red-500 transition-transform duration-300 group-hover:scale-110" />

            <div>
              <h3 className="font-bold">
                Saved Artwork
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                View artwork you've saved for later.
              </p>
            </div>

            <span className="ml-auto text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Past Purchases */}
          <Link
            to="/purchases"
            onClick={handleButtonSound}
            className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <MdShoppingBag className="text-3xl text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:text-blue-500" />

            <div>
              <h3 className="font-bold">
                Past Purchases
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                View artwork you've purchased.
              </p>
            </div>

            <span className="ml-auto text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            onClick={handleButtonSound}
            className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <MdSettings className="text-3xl text-gray-500 transition-transform duration-300 group-hover:rotate-45 dark:text-gray-400" />

            <div>
              <h3 className="font-bold">
                Settings
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Appearance, sounds, and preferences.
              </p>
            </div>

            <span className="ml-auto text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Log Out */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="group flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-red-900"
            >
              <MdLogout className="text-3xl text-red-500 transition-transform duration-300 group-hover:translate-x-1" />

              <div>
                <h3 className="font-bold">
                  Log Out
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Sign out of your ARTA account.
                </p>
              </div>

              <span className="ml-auto text-gray-400 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;

