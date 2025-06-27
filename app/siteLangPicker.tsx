import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { LanguageList, translatedPages } from "./Languages";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SiteLangPicker({ lang }: { lang: string }) {
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        type="button"
        onClick={() => setLanguageIsOpen(!languageIsOpen)}
        className="flex items-center text-sm font-bold px-3 py-2 rounded-md hover:backdrop-brightness-80"
      >
        <span>{lang}</span>
        <ChevronDown className="ms-1 text-xs" />
      </button>
      {languageIsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-0 z-40"
            onClick={() => setLanguageIsOpen(false)}
          />
          <dialog
            open={languageIsOpen}
            className="fixed left-0 sm:absolute sm:end-0 w-screen sm:w-48 rounded-md shadow-lg max-h-80 overflow-y-auto ring-1 ring-black ring-opacity-5 z-50"
            style={{
              backgroundColor: "var(--card-background)",
              color: "var(--foreground)",
            }}
          >
            {LanguageList.filter((language) =>
              translatedPages.includes(language.code)
            ).map((language) => (
              <Link
                key={language.code}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setLanguageIsOpen(false);
                  document.cookie = `lang=${language.code}`;
                  router.refresh();
                }}
                className="block px-4 w-full text-center py-2 text-sm hover:backdrop-brightness-85"
              >
                {language.name} ({language.code})
              </Link>
            ))}
          </dialog>
        </>
      )}{" "}
    </>
  );
}
