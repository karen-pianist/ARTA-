import React from "react";
import { MdShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import { playSound } from "../../sounds-src/SoundManager";

const Purchases = () => {
  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">

        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-sm dark:bg-zinc-900 dark:text-blue-500">
          <MdShoppingBag className="text-5xl" />
        </div>

        {/* Label */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          ARTA
        </p>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Purchase History
        </h1>

        {/* WIP */}
        <div className="mt-6 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-400">
          Work In Progress
        </div>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Your past artwork purchases will appear here once ARTA's
          backend and payment system are ready.
        </p>

        {/* Back */}
        <Link
          to="/profile"
          onClick={() => playSound("button")}
          className="mt-8 rounded-xl bg-lime-700 px-6 py-3 font-semibold text-white transition hover:bg-lime-800"
        >
          Back to Profile
        </Link>

      </div>
    </div>
  );
};

export default Purchases;