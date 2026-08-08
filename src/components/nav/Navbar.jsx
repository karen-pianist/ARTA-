import React, { useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiHeart, CiSearch } from "react-icons/ci";
import {
  MdOutlineShoppingBag,
  MdAccountCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useWishlist } from "../wishlist/WishlistContext";
import { useCart } from "../cart/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { playSound } from "../../sounds-src/SoundManager";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);

  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { t } = useLanguage();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleButtonSound = () => {
    playSound("button");
  };

  const handleMenuToggle = () => {
    playSound("button");
    setShowNav((previous) => !previous);
  };

  return (
    <div
      className={`relative box-border flex w-full items-center px-10 py-3.75 transition-colors duration-300 ${
        showNav
          ? "bg-white dark:bg-zinc-950"
          : "bg-[#f5f1e8] dark:bg-zinc-950"
      }`}
    >
      {/* Menu Button */}
      <button
        onClick={handleMenuToggle}
        className="absolute left-4 text-[22px] text-black transition-transform duration-300 hover:scale-110 dark:text-white"
        aria-label={t("navbar.toggleNavigation")}
        title={t("navbar.toggleNavigation")}
      >
        <IoReorderThreeOutline />
      </button>

      {/* Navbar Content */}
      <div
        className={`mx-auto flex items-center gap-7.5 transition-all duration-300 ${
          showNav
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {/* Saved */}
        <Link
          to="/wishlist"
          onClick={handleButtonSound}
          className="relative ml-3 text-black dark:text-white"
          aria-label={t("navbar.saved")}
          title={t("navbar.saved")}
        >
          <CiHeart className="text-[22px] transition hover:scale-110 hover:text-red-500" />

          {wishlist.length > 0 && (
            <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          onClick={handleButtonSound}
          className="relative ml-3 text-black dark:text-white"
          aria-label={t("navbar.cart")}
          title={t("navbar.cart")}
        >
          <MdOutlineShoppingBag className="text-[22px] transition hover:scale-110 hover:text-blue-600" />

          {cartCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Home */}
        <Link
          to="/"
          onClick={handleButtonSound}
          className="font-mono text-black transition hover:text-blue-600 dark:text-white"
        >
          {t("navbar.home")}
        </Link>

        {/* About */}
        <Link
          to="/about"
          onClick={handleButtonSound}
          className="font-mono text-black transition hover:text-blue-600 dark:text-white"
        >
          {t("navbar.about")}
        </Link>

        {/* Artists */}
        <Link
          to="/artists"
          onClick={handleButtonSound}
          className="font-mono text-black transition hover:text-blue-600 dark:text-white"
        >
          {t("navbar.artists")}
        </Link>

        {/* Shop */}
        <Link
          to="/shop"
          onClick={handleButtonSound}
          className="font-mono text-black transition hover:text-blue-600 dark:text-white"
        >
          {t("navbar.shop")}
        </Link>

        {/* Collection */}
        <Link
          to="/collection"
          onClick={handleButtonSound}
          className="font-mono text-black transition hover:text-blue-600 dark:text-white"
        >
          {t("navbar.collection")}
        </Link>

        {/* Search */}
        <Link
          to="/shop"
          onClick={handleButtonSound}
          className="ml-3 text-black dark:text-white"
          aria-label={t("navbar.search")}
          title={t("navbar.search")}
        >
          <CiSearch className="text-[22px] transition hover:scale-110 hover:text-blue-600" />
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          onClick={handleButtonSound}
          className="ml-2 text-black dark:text-white"
          aria-label={t("navbar.profile")}
          title={t("navbar.profile")}
        >
          <MdAccountCircle className="text-[25px] transition-all duration-300 hover:scale-110 hover:text-lime-700 dark:hover:text-lime-500" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

