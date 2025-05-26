"use client";

import { useState } from "react";
import { auth } from "@/firebase";
import { ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LanguageList } from "../Languages";

export default function NavBar() {
  const router = useRouter(); // Initialize router
  const [languageIsOpen, setLanguageIsOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // Redirect to index page
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow fixed w-full z-50">
        <div className="max-w-6xl mx-auto">
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
            <div className="hidden sm:flex items-center ml-auto">
              <div className="relative" id="language-dropdown-container">
                <button
                  type="button"
                  id="language-dropdown-btn"
                  className="flex items-center text-gray-700 px-3 py-2 text-sm font-bold rounded-md hover:bg-gray-100"
                  onClick={() => {
                    setLanguageIsOpen(!languageIsOpen);
                  }}
                >
                  <span id="selected-language">English</span>
                  <ChevronDown className="ml-1 text-xs"></ChevronDown>
                </button>
                <dialog
                  open={languageIsOpen}
                  id="language-dropdown"
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg max-h-80 overflow-y-auto bg-white ring-1 ring-black ring-opacity-5"
                >
                  {LanguageList.map((language) => {
                    return (
                      <Link
                        key={language.code}
                        href={"#"}
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
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-bold font-large text-black">
                    {auth.currentUser?.displayName ||
                      auth.currentUser?.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
