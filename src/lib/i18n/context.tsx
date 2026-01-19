"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en, zh } from "./dictionaries";

type Language = "en" | "zh";
type Dictionary = typeof en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("app-language") as Language;
    if (storedLang && (storedLang === "en" || storedLang === "zh")) {
      setLanguage(storedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.startsWith("zh") ? "zh" : "en";
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = language === "zh" ? zh : en;

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
