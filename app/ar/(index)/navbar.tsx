"use client";
import { useState } from "react";
import LoginModal from "./login";
import SignUpModal from "./signup";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { LanguageList, translatedPages } from "@/app/Languages";
import { useRouter } from "next/navigation";
export default function NavBar() {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [languageIsOpen, setLanguageIsOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="bg-white shadow fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <a href="#" className="text-4xl font-bold text-indigo-600">
                  EduMate
                </a>
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
                  <span id="selected-language">العربية</span>
                  <ChevronDown className="ms-1 text-xs"></ChevronDown>
                </button>
                <dialog
                  open={languageIsOpen}
                  id="language-dropdown"
                  className="absolute start-0 mt-2 w-48 rounded-md shadow-lg max-h-80 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5"
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
            <div className="hidden sm:me-6 sm:flex sm:items-center space-x-2">
              <>
                <button
                  id="login-btn"
                  className="px-4 py-2 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition"
                  onClick={() => {
                    setLoginIsOpen(true);
                  }}
                >
                  تسجيل الدخول
                </button>
                <button
                  id="signup-btn"
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
                  onClick={() => {
                    setRegisterIsOpen(true);
                  }}
                >
                  إنشاء حساب
                </button>
              </>
            </div>
          </div>
        </div>
      </nav>
      <LoginModal isOpen={loginIsOpen} setIsOpen={setLoginIsOpen} />
      <SignUpModal isOpen={registerIsOpen} setIsOpen={setRegisterIsOpen} />
    </>
  );
}
