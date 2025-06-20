"use client";

import { useState, useEffect } from "react";
import LoginModal from "./login";
import SignUpModal from "./signup";
import { ChevronDown, Sun, Moon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { LanguageList, translatedPages } from "@/app/Languages";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
  const router = useRouter();

  // Theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const root = document.documentElement;
    if (storedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      <nav
        className="shadow fixed w-full z-50 transition-colors"
        style={{
          backgroundColor: "var(--navbar-background)",
          color: "var(--navbar-foreground)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="text-4xl font-bold text-indigo-600">
              EduMate
            </Link>

            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md transition hover:bg-[var(--card-background)]"
                title="Toggle Dark Mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <MenuIcon
                onClick={() => setIsPhoneMenuOpen(!isPhoneMenuOpen)}
                className="text-[var(--primary-color)]"
              />

              <div
                hidden={!isPhoneMenuOpen}
                className="fixed flex justify-center flex-col items-center w-screen top-16 start-0 z-50 shadow-inner"
                style={{
                  backgroundColor: "var(--card-background)",
                  color: "var(--foreground)",
                }}
              >
                <button
                  id="login-btn"
                  className="px-4 py-2 font-medium rounded-md transition hover:bg-[var(--background)] text-[var(--primary-color)]"
                  onClick={() => setLoginIsOpen(true)}
                >
                  כניסה
                </button>

                <button
                  id="signup-btn"
                  className="px-4 py-2 font-medium rounded-md transition hover:bg-[var(--background)] text-[var(--primary-color)]"
                  onClick={() => setRegisterIsOpen(true)}
                >
                  הרשמה
                </button>

                <div className="relative" id="language-dropdown-container">
                  <button
                    type="button"
                    id="language-dropdown-btn"
                    className="flex items-center px-3 py-2 text-sm font-bold rounded-md lang-selector-hover"
                    onClick={() => setLanguageIsOpen(!languageIsOpen)}
                  >
                    <span id="selected-language">Hebrew</span>
                    <ChevronDown className="ml-1 text-xs" />
                  </button>

                  {languageIsOpen && (
                    <div
                      className="w-screen h-screen top-0 start-0 fixed z-40"
                      onClick={() => setLanguageIsOpen(false)}
                    ></div>
                  )}

                  <div
                    hidden={!languageIsOpen}
                    id="language-dropdown"
                    className="fixed start-0 w-screen max-h-80 overflow-y-auto rounded-md shadow-lg z-50"
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
                        onClick={async (e) => {
                          e.preventDefault();
                          setLanguageIsOpen(false);
                          document.cookie = `lang=${language.code}`;
                          router.refresh();
                        }}
                        className="block px-4 py-2 text-sm lang-selector-hover"
                      >
                        {language.name + " (" + language.code + ")"}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>


            {/* Right side */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                title="Toggle Dark Mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLanguageIsOpen(!languageIsOpen)}
                  className="flex items-center text-sm font-bold px-3 py-2 rounded-md lang-selector-hover"
                >
                  <span>Hebrew</span>
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
                      className="absolute end-0 mt-2 w-48 rounded-md shadow-lg max-h-80 overflow-y-auto ring-1 ring-black ring-opacity-5 z-50"
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
                          className="block px-4 py-2 text-sm lang-selector-hover"
                        >
                          {language.name} ({language.code})
                        </Link>
                      ))}
                    </dialog>
                  </>
                )}
              </div>

              {/* Auth Buttons */}
              <button
                className="px-4 py-2 font-medium rounded-md transition lang-selector-hover text-[var(--primary-color)]"
                onClick={() => setLoginIsOpen(true)}
              >
                כניסה
              </button>
              <button
                className="px-4 py-2 font-medium rounded-md transition lang-selector-hover text-[var(--primary-color)]"
                onClick={() => setRegisterIsOpen(true)}
              >
                הרשמה
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <LoginModal isOpen={loginIsOpen} setIsOpen={setLoginIsOpen} />
      <SignUpModal isOpen={registerIsOpen} setIsOpen={setRegisterIsOpen} />
    </>
  );
}
