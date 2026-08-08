import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "./data";
import { useLanguage } from "../../context/LanguageContext";

const Arts = () => {
  const { t } = useLanguage();

  const [randomProducts] = useState(() =>
    [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
  );

  return (
    <section className="bg-[#f5f1e8] px-6 py-16 font-inter transition-colors duration-500 dark:bg-zinc-950 sm:px-10 lg:px-20">
      <div className="mx-auto mb-10 max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          {t("featuredArtwork.label")}
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {t("featuredArtwork.title")}
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          {t("featuredArtwork.description")}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {randomProducts.map((product) => (
          <Link
            key={product.id}
            to={`/shop/${product.id}`}
            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="overflow-hidden bg-gray-100 dark:bg-zinc-800">
              <img
                src={product.image}
                alt={t(`artworks.${product.titleKey}.title`)}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {t(`artworks.${product.titleKey}.title`)}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t(`artists.${product.artistKey}`)}
              </p>

              <p className="mt-3 font-semibold text-lime-700 dark:text-lime-500">
                {product.price}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600 transition-colors group-hover:text-lime-700 dark:text-gray-400 dark:group-hover:text-lime-500">
                  {t("featuredArtwork.viewArtwork")}
                </span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-2xl bg-lime-700 px-7 py-3.5 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-lime-600 hover:shadow-lg dark:bg-lime-800 dark:hover:bg-lime-700"
        >
          {t("featuredArtwork.viewAll")}

          <span>→</span>
        </Link>
      </div>
    </section>
  );
};

export default Arts;