import React, { useState } from "react";
import {
  Link,
  useParams,
  useLocation,
} from "react-router-dom";
import {
  CiHeart,
  CiShoppingCart,
} from "react-icons/ci";

import products from "../arts/data";
import { useCart } from "../cart/CartContext";
import { useWishlist } from "../wishlist/WishlistContext";
import collection_data from "../collection/collection_data";
import { playSound } from "../../sounds-src/SoundManager";
import { useLanguage } from "../../context/LanguageContext";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const { t } = useLanguage();

  const fromCollection =
    location.state?.fromCollection;

  const fromWishlist =
    location.state?.fromWishlist;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  const { addToCart } = useCart();
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
            ARTA
          </p>

          <h1 className="text-3xl font-bold">
            Artwork Not Found
          </h1>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            We couldn't find the artwork you're looking for.
          </p>

          <Link
            to={
              fromWishlist
                ? "/wishlist"
                : fromCollection
                  ? "/collection"
                  : "/shop"
            }
            className="mt-8 inline-flex rounded-xl bg-lime-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-800"
          >
            {fromWishlist
              ? "Back to Wishlist"
              : fromCollection
                ? "Back to Collection"
                : "Back to Shop"}
          </Link>
        </div>
      </div>
    );
  }

  const artwork = t(
    `artworks.${product.titleKey}`
  );

  const artworkTitle = artwork?.title ?? product.titleKey;

  const artworkDescription =
    artwork?.description ??
    "A carefully selected piece from the ARTA collection.";

  const artistName = t(
    `artists.${product.artistKey}`
  );

  const wishlisted = isInWishlist(product.id);

  const relatedProducts = (product.related || [])
    .map((relatedId) =>
      products.find(
        (item) => item.id === relatedId
      )
    )
    .filter(Boolean);

  const sameCollectionProducts = collection_data
    .filter((collection) =>
      collection.products.includes(product.id)
    )
    .flatMap((collection) =>
      collection.products
        .filter(
          (productId) =>
            productId !== product.id
        )
        .map((productId) =>
          products.find(
            (item) => item.id === productId
          )
        )
    )
    .filter(Boolean)
    .filter(
      (item, index, self) =>
        self.findIndex(
          (product) => product.id === item.id
        ) === index
    );

  const handleAddToCart = () => {
    addToCart(product);
    playSound("button");

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 700);
  };

  const handleWishlist = () => {
    playSound("button");
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-12 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        <Link
          to={
            fromWishlist
              ? "/wishlist"
              : fromCollection
                ? "/collection"
                : "/shop"
          }
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-lime-700 dark:text-gray-400 dark:hover:text-lime-500"
        >
          ←{" "}
          {fromWishlist
            ? "Back to Saved"
            : fromCollection
              ? "Back to Collection"
              : "Back to Shop"}
        </Link>

        <div className="grid overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:grid-cols-2">

          <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-800">
            <img
              src={product.image}
              alt={artworkTitle}
              className="h-full min-h-105 w-full object-cover transition-transform duration-700 hover:scale-[1.02] lg:min-h-170"
            />

            <button
              onClick={handleWishlist}
              aria-label={
                wishlisted
                  ? `Remove ${artworkTitle} from wishlist`
                  : `Add ${artworkTitle} to wishlist`
              }
              className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all duration-300 hover:scale-110 active:scale-90 dark:bg-zinc-900/90 ${
                wishlisted
                  ? "text-red-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <CiHeart
                className={`text-3xl transition-transform duration-300 ${
                  wishlisted
                    ? "scale-110"
                    : ""
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
              ARTA Collection
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {artworkTitle}
            </h1>

            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              This artwork is by{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-200">
                {artistName}
              </span>
            </p>

            <p className="mt-6 text-3xl font-bold text-lime-700 dark:text-lime-500">
              {product.price}
            </p>

            <div className="my-8 h-px bg-gray-200 dark:bg-zinc-800" />

            <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
              {artworkDescription}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-[#f5f1e8] p-4 dark:bg-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Collection
                </p>

                <p className="mt-1 font-semibold">
                  ARTA Collection
                </p>
              </div>

              <div className="rounded-2xl bg-[#f5f1e8] p-4 dark:bg-zinc-800">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Availability
                </p>

                <p className="mt-1 font-semibold">
                  In Stock
                </p>
              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold text-white shadow-sm transition-all duration-300 ${
                  added
                    ? "scale-[0.98] bg-lime-900"
                    : "bg-lime-700 hover:-translate-y-0.5 hover:bg-lime-800 hover:shadow-md active:scale-[0.98]"
                }`}
              >
                <CiShoppingCart className="text-2xl" />

                {added
                  ? "Added ✓"
                  : "Add to Cart"}
              </button>

              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-4 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                  wishlisted
                    ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950/30"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-zinc-600"
                }`}
              >
                <CiHeart className="text-2xl" />

                {wishlisted
                  ? "Saved"
                  : "Wishlist"}
              </button>

            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
                Continue Exploring
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                You Might Also Like
              </h2>

              <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
                More artwork selected to complement this piece.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map(
                (relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/shop/${relatedProduct.id}`}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <img
                        src={relatedProduct.image}
                        alt={t(
                          `artworks.${relatedProduct.titleKey}.title`
                        )}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {t(
                          `artworks.${relatedProduct.titleKey}.title`
                        )}
                      </h3>

                      <p className="mt-2 font-semibold text-lime-700 dark:text-lime-500">
                        {relatedProduct.price}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </section>
        )}

        {sameCollectionProducts.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
                From The Same Collection
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                More From This Collection
              </h2>

              <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
                Explore other artwork featured alongside this piece.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sameCollectionProducts.map(
                (collectionProduct) => (
                  <Link
                    key={collectionProduct.id}
                    to={`/shop/${collectionProduct.id}`}
                    className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="overflow-hidden bg-gray-100 dark:bg-zinc-800">
                      <img
                        src={collectionProduct.image}
                        alt={t(
                          `artworks.${collectionProduct.titleKey}.title`
                        )}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {t(
                          `artworks.${collectionProduct.titleKey}.title`
                        )}
                      </h3>

                      <p className="mt-2 font-semibold text-lime-700 dark:text-lime-500">
                        {collectionProduct.price}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;