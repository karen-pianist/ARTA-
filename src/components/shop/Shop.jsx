import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import products from "../arts/data";
import { useCart } from "../cart/CartContext";
import { useWishlist } from "../wishlist/WishlistContext";
import { CiHeart, CiFilter } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import Search from "../search/Search";
import collection from "../collection/collection_data";
import { playSound } from "../../sounds-src/SoundManager";
import { useLanguage } from "../../context/LanguageContext";

const levenshtein = (a, b) => {
  const matrix = Array.from(
    { length: b.length + 1 },
    (_, i) => [i]
  );

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
    }
  }

  return matrix[b.length][a.length];
};

const fuzzyMatch = (queryWord, targetWord) => {
  if (!queryWord || !targetWord) {
    return false;
  }

  if (targetWord.includes(queryWord)) {
    return true;
  }

  const distance = levenshtein(queryWord, targetWord);

  if (targetWord.length <= 4) {
    return distance <= 1;
  }

  const allowedDistance = Math.max(
    1,
    Math.floor(targetWord.length * 0.4)
  );

  return distance <= allowedDistance;
};

const Shop = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [addedId, setAddedId] = useState(null);
  const [searchParams] = useSearchParams();
  const collectionId = Number(searchParams.get("collection"));
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const sortOptions = [
    {
      value: "featured",
      label: "Featured",
    },
    {
      value: "price-low",
      label: "Price: Low → High",
    },
    {
      value: "price-high",
      label: "Price: High → Low",
    },
    {
      value: "az",
      label: "A → Z",
    },
    {
      value: "za",
      label: "Z → A",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const selectedCollection = collection.find(
      (item) => item.id === collectionId
    );

    if (
      selectedCollection &&
      !selectedCollection.products.includes(product.id)
    ) {
      return false;
    }

    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    const artworkTitle = t(
      `artworks.${product.titleKey}.title`
    );

    const artistName = t(
      `artists.${product.artistKey}`
    );

    const searchableText =
      `${artworkTitle} ${artistName}`.toLowerCase();

    if (searchableText.includes(query)) {
      return true;
    }

    const queryWords = query.split(/\s+/);
    const targetWords = searchableText.split(/\s+/);

    return queryWords.every((queryWord) =>
      targetWords.some((targetWord) =>
        fuzzyMatch(queryWord, targetWord)
      )
    );
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            parseInt(a.price.replace("$", ""), 10) -
            parseInt(b.price.replace("$", ""), 10)
          );

        case "price-high":
          return (
            parseInt(b.price.replace("$", ""), 10) -
            parseInt(a.price.replace("$", ""), 10)
          );

        case "az":
          return t(
            `artworks.${a.titleKey}.title`
          ).localeCompare(
            t(`artworks.${b.titleKey}.title`)
          );

        case "za":
          return t(
            `artworks.${b.titleKey}.title`
          ).localeCompare(
            t(`artworks.${a.titleKey}.title`)
          );

        case "featured":
        default:
          return 0;
      }
    }
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    playSound("button");

    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">

      <div className="mx-auto mb-16 w-full text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          ARTA Shop
        </p>

        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Discover Artwork
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Explore our collection of carefully selected
          artwork and find something that belongs in
          your space.
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-5xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <Search
              search={search}
              setSearch={setSearch}
            />
          </div>

          <div
            ref={sortRef}
            className="relative shrink-0"
          >
            <button
              type="button"
              onClick={() =>
                setSortOpen((current) => !current)
              }
              className="flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-lime-500 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200"
            >
              <CiFilter className="text-xl" />

              <span>
                {
                  sortOptions.find(
                    (option) =>
                      option.value === sortBy
                  )?.label
                }
              </span>

              <span
                className={`ml-1 text-xs transition-transform duration-300 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              >
                ↓
              </span>
            </button>

            {sortOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 text-left shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setSortBy(option.value);
                      setSortOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      sortBy === option.value
                        ? "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{option.label}</span>

                    {sortBy === option.value && (
                      <IoCheckmark className="text-xl" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sortedProducts.length === 0 && (
        <div className="mx-auto max-w-2xl py-20 text-center">
          <p className="text-5xl">🎨</p>

          <h2 className="mt-5 text-2xl font-bold">
            No artwork found
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Try a different artwork title or artist.
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-6 rounded-xl bg-lime-700 px-5 py-3 font-semibold text-white transition hover:bg-lime-800"
          >
            Clear Search
          </button>
        </div>
      )}

      {sortedProducts.length > 0 && (
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => {
            const artworkTitle = t(
              `artworks.${product.titleKey}.title`
            );

            return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <Link to={`/shop/${product.id}`}>
                    <img
                      src={product.image}
                      alt={artworkTitle}
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <button
                    onClick={() =>
                      toggleWishlist(product)
                    }
                    aria-label={
                      isInWishlist(product.id)
                        ? `Remove ${artworkTitle} from wishlist`
                        : `Add ${artworkTitle} to wishlist`
                    }
                    className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 active:scale-90 dark:bg-zinc-900/90 ${
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <CiHeart className="text-2xl" />
                  </button>
                </div>

                <div className="p-6">
                  <Link
                    to={`/shop/${product.id}`}
                    className="text-lg font-bold text-gray-900 transition-colors hover:text-lime-700 dark:text-white dark:hover:text-lime-500"
                  >
                    {artworkTitle}
                  </Link>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {t(`artists.${product.artistKey}`)}
                  </p>

                  <p className="mt-2 text-base font-semibold text-lime-700 dark:text-lime-500">
                    {product.price}
                  </p>

                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className={`mt-5 w-full rounded-xl px-4 py-3 font-semibold text-white shadow-sm transition-all duration-300 ${
                      addedId === product.id
                        ? "scale-95 bg-lime-900"
                        : "bg-lime-700 hover:-translate-y-0.5 hover:bg-lime-800 hover:shadow-md active:scale-95"
                    } dark:bg-lime-600 dark:hover:bg-lime-500`}
                  >
                    {addedId === product.id
                      ? "Added ✓"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;