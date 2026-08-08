import React from "react";
import artists from "./artists_data";

const Artists = () => {
  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">

      {/* Header */}
      <div className="mx-auto mb-14 max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          The Artists
        </p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Meet Our Artists
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Meet the artists behind the artwork. From timeless classics to bold
          modern styles, each artist brings their own creativity, passion, and
          personality to their work.
        </p>
      </div>

      {/* Artist Cards */}
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <div
            key={artist.name}
            className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Artist Initial */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-lime-700 text-lg font-bold text-gray-900 transition-all duration-300 group-hover:scale-110 dark:bg-lime-900 dark:text-gray-200">
              {artist.name.charAt(0)}
            </div>

            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
              {artist.name}
            </h2>

            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              {artist.description}
            </p>

            {/* Decorative line */}
            <div className="mt-6 h-1 w-10 rounded-full bg-lime-700 transition-all duration-300 group-hover:w-16 dark:bg-lime-900" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;

