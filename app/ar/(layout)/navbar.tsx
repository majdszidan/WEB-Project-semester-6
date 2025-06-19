"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { ChevronDown, User, LogOut, MenuIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LanguageList, translatedPages } from "@/app/Languages";

export default function NavBar() {
  const router = useRouter(); // Initialize router
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const [username, setUsername] = useState(auth.currentUser?.email || "");
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        document.cookie = "token=;";
        router.replace("/");
      } else {
        setUsername(user.displayName ?? user.email?.split("@")[0] ?? "");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow top-0 start-0 fixed w-full z-50">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-4xl font-bold text-indigo-600">
                  EduMate
                </Link>
              </div>
            </div>

            <div className="flex items-center sm:hidden">
              <MenuIcon
                onClick={() => setIsPhoneMenuOpen(!isPhoneMenuOpen)}
                className="text-blue-500"
              />
              <div
                hidden={!isPhoneMenuOpen}
                className="fixed flex justify-center flex-col items-center w-screen top-15 start-0  shadow-inner bg-white"
              >
                <div className="flex flex-col mt-2 items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold font-large text-black">
                      {username.split("@")[0]}
                    </span>
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                  >
                    <LogOut className="w-4 h-4 me-1" />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>

                <div className="relative" id="language-dropdown-container">
                  <button
                    type="button"
                    id="language-dropdown-btn"
                    className="flex items-center text-gray-700 px-3 py-2 text-sm font-bold rounded-md hover:bg-gray-100"
                    onClick={() => {
                      setLanguageIsOpen(!languageIsOpen);
                    }}
                  >
                    <span id="selected-language">Arabic</span>
                    <ChevronDown className="ml-1 text-xs"></ChevronDown>
                  </button>
                  {languageIsOpen && (
                    <div
                      className="w-screen h-screen top-0 start-0  fixed bg-black opacity-0"
                      onClick={() => setLanguageIsOpen(false)}
                    ></div>
                  )}
                  <dialog
                    open={languageIsOpen}
                    id="language-dropdown"
                    className="fixed start-0 w-screen rounded-md shadow-lg max-h-80 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5"
                  >
                    {LanguageList.filter((language) =>
                      translatedPages.includes(language.code)
                    ).map((language) => {
                      return (
                        <Link
                          key={language.code}
                          href={"#"}
                          onClick={async (e) => {
                            e.preventDefault();
                            setLanguageIsOpen(false);
                            document.cookie = `lang=${language.code}`;
                            router.refresh();
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {language.name + " (" + language.code + ")"}
                        </Link>
                      );
                    })}
                  </dialog>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="hidden sm:flex items-center ms-auto">
              <div className="relative" id="language-dropdown-container">
                <button
                  type="button"
                  id="language-dropdown-btn"
                  className="flex items-center text-gray-700 px-3 py-2 text-sm font-bold rounded-md hover:bg-gray-100"
                  onClick={() => {
                    setLanguageIsOpen(!languageIsOpen);
                  }}
                >
                  <span id="selected-language">Arabic</span>
                  <ChevronDown className="ms-1 text-xs"></ChevronDown>
                </button>
                {languageIsOpen && (
                  <div
                    className="w-screen h-screen top-0 start-0  fixed bg-black opacity-0"
                    onClick={() => setLanguageIsOpen(false)}
                  ></div>
                )}
                <dialog
                  open={languageIsOpen}
                  id="language-dropdown"
                  className="absolute end-0 mt-2 w-48 rounded-md shadow-lg max-h-80 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5"
                >
                  {LanguageList.filter((language) =>
                    translatedPages.includes(language.code)
                  ).map((language) => {
                    return (
                      <Link
                        key={language.code}
                        href={"#"}
                        onClick={async (e) => {
                          e.preventDefault();
                          setLanguageIsOpen(false);
                          document.cookie = `lang=${language.code}`;
                          router.refresh();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {language.name + " (" + language.code + ")"}
                      </Link>
                    );
                  })}
                </dialog>
              </div>
            </div>

            {/* Auth Section */}
            <div className="hidden sm:ms-6 sm:flex sm:items-center space-x-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold font-large text-black">
                    {username}
                  </span>
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  تسجيل الخروج
                  <LogOut className="w-4 h-4 ms-1 transform rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
