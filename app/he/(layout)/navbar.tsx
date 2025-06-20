"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { User, LogOut, Sun, Moon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import SiteLangPicker from "@/app/siteLangPicker";

export default function NavBar() {
  const [username, setUsername] = useState(auth.currentUser?.email || "");
  const [isDark, setIsDark] = useState(false);
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName ?? user.email?.split("@")[0] ?? "");
      }
    });

    const storedTheme = localStorage.getItem("theme");
    const root = document.documentElement;
    if (storedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }

    return () => unsubscribe();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <nav
      className="top-0 start-0 shadow fixed w-full z-50 transition-colors"
      style={{
        backgroundColor: "var(--navbar-background)",
        color: "var(--navbar-foreground)",
      }}
    >
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-4xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            EduMate
          </Link>

          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition"
              style={{
                backgroundColor: isDark
                  ? "var(--card-background)"
                  : "var(--secondary-background)",
              }}
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
              <div className="flex flex-col mt-2 items-center space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-[var(--foreground)]">
                    {username.split("@")[0]}
                  </span>
                  <User className="w-5 h-5 text-[var(--primary-color)]" />
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition"
                  style={{
                    color: "var(--danger-color)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--hover-danger-bg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <LogOut className="w-4 h-4 me-1" />
                  יציאה
                </button>
              </div>

              <div className="relative" id="language-dropdown-container">
                <SiteLangPicker lang="Hebrew" />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language dropdown */}
            <div className="relative">
              <SiteLangPicker lang="Hebrew" />
            </div>

            {/* User + Logout */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold">
                {username.split("@")[0]}
              </span>
              <User
                className="w-5 h-5"
                style={{ color: "var(--primary-color)" }}
              />
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm rounded-md transition"
                style={{
                  color: "var(--danger-color, #dc2626)",
                  backgroundColor: "transparent",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--hover-danger-bg, #fee2e2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <LogOut className="w-4 h-4 me-1" />
                יציאה
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
