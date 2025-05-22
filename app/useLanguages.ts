import { useEffect, useState } from "react";

export type Language = {
  code: string;
  name: string;
};

export function useLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    fetch("https://libretranslate.com/languages", {
      next: { revalidate: 3600 },
    })
      .then((res) => res.json())
      .then((data) => {
        setLanguages(
          data.map((lang: { code: string; name: string }) => ({
            code: lang.code,
            name: lang.name,
          }))
        );
      });
  }, []);

  return languages;
}
