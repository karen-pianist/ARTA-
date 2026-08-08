import React, { createContext, useContext, useEffect, useState } from "react";

import en from "./en";
import ar from "./ar";
import ja from "./ja";
import fr from "./fr";
import es from "./es";

const translations = {
  en,
  ar,
  ja,
  fr,
  es,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("artaLanguage") || "en";
  });

  useEffect(() => {
    localStorage.setItem("artaLanguage", language);

    document.documentElement.lang = language;

    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (!translations[newLanguage]) {
      console.warn(`Language "${newLanguage}" is not available.`);
      return;
    }

    setLanguage(newLanguage);
  };

  const t = (key) => {
    const keys = key.split(".");

    let value = translations[language];

    for (const part of keys) {
      value = value?.[part];
    }

    // Fall back to English if the translation doesn't exist.
    if (value === undefined) {
      value = translations.en;

      for (const part of keys) {
        value = value?.[part];
      }
    }

    // If it still doesn't exist, show the key instead of crashing.
    return value ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        changeLanguage,
        t,
        languages: {
          en: "English",
          ar: "العربية",
          ja: "日本語",
          fr: "Français",
          es: "Español",
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside a LanguageProvider"
    );
  }

  return context;
};