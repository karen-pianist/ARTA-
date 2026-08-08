import React from "react";
import { Link } from "react-router-dom";
import { playSound } from "../../sounds-src/SoundManager";
import download from "../../assets/download.png";
import { useLanguage } from "../../context/LanguageContext";

const Header = () => {
  const { t } = useLanguage();

  const handleClick = () => {
    playSound("button");
  };

  return (
    <section className="bg-[#f5f1e8] px-6 pb-16 pt-12 font-inter transition-colors duration-500 dark:bg-zinc-950 sm:px-10 sm:pb-20 sm:pt-16 lg:px-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">

        {/* Text */}
        <div className="max-w-2xl">

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-lime-700 dark:text-lime-500">
            {t("hero.welcome")}
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 transition-colors duration-500 sm:text-6xl lg:text-7xl dark:text-white">
            {t("hero.title")}
            <span className="block text-lime-700 dark:text-lime-500">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600 transition-colors duration-500 sm:text-xl dark:text-gray-400">
            {t("hero.description")}
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/shop"
              onClick={handleClick}
              className="inline-flex items-center justify-center rounded-2xl bg-lime-700 px-7 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-lime-600 hover:shadow-lg active:scale-[0.98] dark:bg-lime-800 dark:hover:bg-lime-700"
            >
              {t("hero.exploreArtwork")}
              <span className="ml-2 transition-transform duration-300 hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/about"
              onClick={handleClick}
              className="inline-flex items-center justify-center rounded-2xl border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-800 transition-all duration-300 hover:-translate-y-1 hover:border-lime-500 hover:text-lime-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200 dark:hover:border-lime-500 dark:hover:text-lime-500"
            >
              {t("hero.discoverArta")}
            </Link>

          </div>
        </div>

        {/* Artwork */}
        <div className="relative mx-auto w-full max-w-xl">

          <div className="overflow-hidden rounded-4xl border border-gray-200 bg-white p-3 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">

            <img
              src={download}
              alt={t("hero.artworkAlt")}
              className="aspect-square w-full rounded-3xl object-cover"
            />

          </div>

          {/* Small decorative label */}
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:-left-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              {t("hero.featuredArtwork")}
            </p>

            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {t("hero.discoverSomethingNew")}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Header;

