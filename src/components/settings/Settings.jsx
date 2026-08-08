import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdArrowBack,
  MdDarkMode,
  MdLightMode,
  MdVolumeUp,
  MdVolumeOff,
  MdLanguage,
} from "react-icons/md";
import { playSound } from "../../sounds-src/SoundManager";
import { useLanguage } from "../../context/LanguageContext";

const Settings = ({ darkMode, setDarkMode }) => {
  const { language, changeLanguage, languages } = useLanguage();

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("artaSoundEnabled") !== "false";
  });

  useEffect(() => {
    localStorage.setItem(
      "artaSoundEnabled",
      soundEnabled ? "true" : "false"
    );
  }, [soundEnabled]);

  const handleSoundToggle = () => {
    const nextValue = !soundEnabled;

    setSoundEnabled(nextValue);

    if (nextValue) {
      playSound("button");
    }
  };

  const handleDarkModeToggle = () => {
    playSound("button");
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;

    playSound("button");
    changeLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <Link
          to="/profile"
          onClick={() => playSound("button")}
          className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-lime-700 dark:text-gray-400 dark:hover:text-lime-500"
        >
          <MdArrowBack className="text-lg" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
            ARTA
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Settings
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
            Customize your ARTA experience.
          </p>
        </div>

        {/* Settings Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

          {/* Dark Mode */}
          <div className="flex items-center gap-5 border-b border-gray-200 p-6 dark:border-zinc-800 sm:p-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
              {darkMode ? (
                <MdLightMode className="text-2xl" />
              ) : (
                <MdDarkMode className="text-2xl" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">
                Dark Mode
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Switch between light and dark appearance.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="Toggle dark mode"
              onClick={handleDarkModeToggle}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                darkMode
                  ? "bg-lime-700"
                  : "bg-gray-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  darkMode
                    ? "translate-x-0"
                    : "translate-x-5"
                }`}
              />
            </button>
          </div>

          {/* Sounds */}
          <div className="flex items-center gap-5 border-b border-gray-200 p-6 dark:border-zinc-800 sm:p-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
              {soundEnabled ? (
                <MdVolumeUp className="text-2xl" />
              ) : (
                <MdVolumeOff className="text-2xl" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">
                Sounds
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enable or disable ARTA interface sounds.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={soundEnabled}
              aria-label="Toggle sounds"
              onClick={handleSoundToggle}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                soundEnabled
                  ? "bg-lime-700"
                  : "bg-gray-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  soundEnabled
                    ? "translate-x-0"
                    : "translate-x-5"
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center gap-5 p-6 sm:p-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
              <MdLanguage className="text-2xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-bold">
                Language
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Choose the language used by ARTA.
              </p>
            </div>

            <select
              value={language}
              onChange={handleLanguageChange}
              aria-label="Choose language"
              className="max-w-37.5 cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-none transition-colors focus:border-lime-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            >
              {Object.entries(languages).map(
                ([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                )
              )}
            </select>

          </div>
        </div>

        {/* Future Settings */}
        <div className="mt-8 rounded-3xl border border-dashed border-gray-300 p-6 dark:border-zinc-700 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            More Coming Soon
          </p>

          <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
            Account preferences, notifications, and other personalization
            options can be added here when the ARTA backend is ready.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Settings;