import React, { useState } from "react";
import { useCart } from "../cart/CartContext";
import { playSound } from "../../sounds-src/SoundManager";

const Cart = () => {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [purchased, setPurchased] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    playSound("success");
    setPurchased(true);

    setTimeout(() => {
      clearCart();
      setPurchased(false);
    }, 2500);
  };

  const handleIncrease = (item) => {
    playSound("button");
    addToCart(item);
  };

  const handleDecrease = (id) => {
    playSound("button");
    decreaseQuantity(id);
  };

  const handleRemove = (id) => {
    playSound("button");
    removeFromCart(id);
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8] px-6 py-16 text-gray-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-gray-100 sm:px-10 lg:px-20">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-4xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-700 dark:text-lime-500">
          Your Selection
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Shopping Cart
        </h1>
      </div>

      {purchased ? (
        /* Purchase Success */
        <div className="mx-auto max-w-2xl rounded-3xl border border-lime-200 bg-white p-12 text-center shadow-sm dark:border-lime-900 dark:bg-zinc-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-100 text-4xl dark:bg-lime-900/40">
            💸
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Cha-ching!
          </h2>

          <p className="mt-3 text-lg font-semibold text-lime-700 dark:text-lime-500">
            Purchase Successful!
          </p>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Thanks for shopping with ARTA.
          </p>
        </div>
      ) : cart.length === 0 ? (
        /* Empty Cart */
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold">
            Your cart is empty
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Explore the shop and find something you love.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_350px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-500 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-full rounded-2xl object-cover sm:w-32"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-1 font-semibold text-lime-700 dark:text-lime-500">
                    {item.price}
                  </p>

                  {/* Quantity */}
                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="h-8 w-8 rounded-lg bg-gray-200 font-bold transition hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      −
                    </button>

                    <span className="min-w-5 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleIncrease(item)}
                      className="h-8 w-8 rounded-lg bg-gray-200 font-bold transition hover:bg-gray-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm font-semibold text-red-500 transition hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="my-6 h-px bg-gray-200 dark:bg-zinc-800" />

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Items</span>

              <span>
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>${total}</span>
            </div>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              className="mt-7 w-full rounded-xl bg-lime-700 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-lime-800 active:scale-[0.98] dark:bg-lime-900 dark:hover:bg-lime-800"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;