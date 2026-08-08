import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/nav/Navbar";
import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Arts from "./components/arts/Arts";
import Login from "./components/login/Login";
import About from "./components/pages/About";
import Artists from "./components/artists/Artists";
import Collection from "./components/collection/Collection";
import Shop from "./components/shop/Shop";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import ProductDetails from "./components/product-details/ProductDetails";
import Profile from "./components/profile/Profile";
import Settings from "./components/settings/Settings";
import Purchases from "./components/purchases/Purchases";
import { LanguageProvider } from "./context/LanguageContext";

const Home = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-500 dark:bg-zinc-950">
      <Header />
      <Button />
      <Arts />
    </div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMode, setLoginMode] = useState("login");
  const [userEmail, setUserEmail] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("artaDarkMode") === "false";
});

const [soundsEnabled, setSoundsEnabled] = useState(() => {
  const saved = localStorage.getItem("artaSoundsEnabled");

  return saved === null ? true : saved === "true";
});

  // Dark mode
  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem("artaDarkMode", String(darkMode));
}, [darkMode]);

useEffect(() => {
  localStorage.setItem(
    "artaSoundsEnabled",
    String(soundsEnabled)
  );
}, [soundsEnabled]);


  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <LanguageProvider>
    <BrowserRouter>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        className={`transition-all duration-500 ${
          showLogin ? "blur-sm brightness-50" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/purchases" element={<Purchases />} />

          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route
            path="/profile"
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
                setIsLoggedIn={setIsLoggedIn}
                setShowLogin={setShowLogin}
                setLoginMode={setLoginMode}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                soundsEnabled={soundsEnabled}
                setSoundsEnabled={setSoundsEnabled}
              />
            }
          />
        </Routes>
      </div>

      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          initialMode={loginMode}
          onSuccess={handleLoginSuccess}
        />
      )}
    </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;