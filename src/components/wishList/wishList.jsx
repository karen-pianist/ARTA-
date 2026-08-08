import React from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useWishlist } from "./WishlistContext";
import { playSound } from "../../sounds-src/SoundManager";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const handleWishlistToggle = (product) => {
    playSound("button");
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">

      {/* Header */}
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          Your Favorites
        </p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Saved
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Artwork you've saved for later.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CiHeart className="mb-5 text-7xl text-gray-400 dark:text-gray-600" />

          <h2 className="text-2xl font-bold">
            Your saved is empty
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Find something you love and save it for later.
          </p>

          <Link
            to="/shop"
            onClick={() => playSound("button")}
            className="mt-6 rounded-xl bg-lime-700 px-6 py-3 font-semibold text-white transition hover:bg-lime-800"
          >
            Explore Shop
          </Link>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >

              {/* Clickable Artwork */}
              <Link
                to={`/shop/${product.id}`}
                state={{ fromWishlist: true }}
                className="block"
              >
                <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-800">

                  <img
                    src={product.image}
                    alt={t(`artworks.${product.titleKey}`)}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleWishlistToggle(product);
                    }}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md backdrop-blur transition hover:scale-110 dark:bg-zinc-900/90"
                    aria-label={`Remove ${t(`artworks.${product.titleKey}`)} from wishlist`}
                  >
                    <CiHeart className="text-2xl" />
                  </button>

                </div>

                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t(`artworks.${product.titleKey}`)}
                  </h2>

                  <p className="mt-2 font-semibold text-lime-700 dark:text-lime-500">
                    {product.price}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-500 transition-colors group-hover:text-lime-700 dark:text-gray-400 dark:group-hover:text-lime-500">
                    <span>View Artwork</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;
