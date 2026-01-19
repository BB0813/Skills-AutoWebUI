"use client";

import { useTranslation } from "@/lib/i18n/context";
import { Languages } from "lucide-react";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en");
    setIsOpen(false);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="glass-button flex items-center gap-2 text-sm font-medium hover:bg-muted/80 transition-all duration-300"
      title={language === "en" ? "Switch to Chinese" : "Switch to English"}
    >
      <Languages className="w-4 h-4" />
      <span className="uppercase">{language}</span>
    </button>
  );
}
