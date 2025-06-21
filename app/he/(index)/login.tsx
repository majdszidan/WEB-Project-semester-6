"use client";

import { auth } from "@/firebase";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { InfoIcon, XIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const login = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    setError("");
    const data = new FormData(form.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      setError("אנא הזינו את כתובת האימייל והסיסמה שלכם");
      return;
    }

    signInWithEmailAndPassword(
      auth,
      email?.toString() ?? "",
      password?.toString() ?? ""
    ).catch((e) => setError(e.message));
  };

  return (
    <dialog
      className="login-modal w-screen h-screen bg-transparent fixed top-0 start-0 z-50"
      open={isOpen}
    >
      {/* Backdrop */}
      <div className="bg-black opacity-40 transition-opacity w-full h-screen"></div>

      {/* Modal Container */}
      <div
        id="login-clickable-area"
        className="login-container fixed inset-0 m-2 z-50 h-screen flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "login-clickable-area") {
            setIsOpen(false);
          }
        }}
      >
        {/* Modal Box */}
        <div
          className="rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full"
          style={{
            backgroundColor: "var(--card-background)",
            color: "var(--card-foreground)",
          }}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">התחברו לחשבון שלכם</h3>
              <button
                type="button"
                className="hover:opacity-70"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="w-full p-2 rounded-md my-2 flex items-center"
                style={{
                  backgroundColor: "var(--answer-bg-wrong)",
                  color: "var(--answer-text-wrong)",
                }}
              >
                <InfoIcon className="inline me-2" />
                <p className="inline">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-6" onSubmit={login}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  סיסמה
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (email.length > 0) {
                      sendPasswordResetEmail(auth, email);
                    } else {
                      setError("אנא הזינו את כתובת האימייל שלכם");
                    }
                  }}
                  className="text-sm font-medium"
                  style={{
                    color: "var(--primary-color)",
                  }}
                >
                  שכחתם סיסמה?
                </a>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="login-submit-button w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium
                  bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)] active:bg-[var(--primary-color-hover)]"
                >
                  התחברות
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
