// components/TranslationProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TranslationContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => Promise<string>;
};

const TranslationContext = createContext<TranslationContextType>({
  language: "en",
  setLanguage: () => {},
  translate: async (text: string) => text,
});

export const useTranslationContext = () => useContext(TranslationContext);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");

  const translate = async (text: string) => {
    if (language === "en") return text;

    try {
      const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: language,
          format: "text",
        }),
      });

      const data = await res.json();
      return data.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
}