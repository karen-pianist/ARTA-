import React from "react";
import { Link } from "react-router-dom";
import collection from "./collection_data";
import products from "../arts/data";

const Collection = () => {
  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">

      {/* Page Header */}
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          Explore
        </p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Our Collections
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Discover carefully curated collections of artwork, bringing
          together pieces that share a story, style, or feeling.
        </p>
      </div>

      {/* Collections */}
      <div className="mx-auto max-w-6xl space-y-16">
        {collection.map((collection) => {
          const collectionProducts = collection.products
            .map((id) => products.find((product) => product.id === id))
            .filter(Boolean);

          return (
            <section key={collection.id}>

              {/* Collection Header */}
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {collection.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {collection.description}
                  </p>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-lime-700 dark:text-lime-500">
                    {collectionProducts.length} artworks
                  </p>
                </div>

                {/* Collection Button */}
                <Link
                  to={`/shop?collection=${collection.id}`}
                  className="group/link inline-flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-500 hover:text-lime-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-lime-500 dark:hover:text-lime-500"
                >
                  Explore Collection

                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Artwork */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {collectionProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/${product.id}`}
                    state={{
                      fromCollection: true,
                      collectionId: collection.id,
                      collectionTitle: collection.title,
                    }}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    {/* Image */}
                    <div className="overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <img
                        src={product.image}
                        alt={t(`artworks.${product.titleKey}`)}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {t(`artworks.${product.titleKey}`)}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {product.price}
                      </p>

                      <div className="mt-4 h-1 w-8 rounded-full bg-lime-700 transition-all duration-300 group-hover:w-14 dark:bg-lime-900" />
                    </div>
                  </Link>
                ))}
              </div>

            </section>
          );
        })}
      </div>

    </div>
  );
};

export default Collection;