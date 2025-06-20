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
      setError("الرجاء إدخال عنوان بريدك الإلكتروني وكلمة المرور");
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
      className="login-modal w-screen h-screen bg-transparent fixed top-0 left-0 z-50"
      open={isOpen}
    >
      {/* Modal Backdrop */}
      <div className="login-backdrop bg-black opacity-40 transition-opacity w-full h-screen" />

      {/* Modal Container */}
      <div
        className="login-container fixed inset-0 z-50 w-screen h-screen flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "login-clickable-area")
            setIsOpen(false);
        }}
        id="login-clickable-area"
      >
        {/* Modal Content */}
        <div
          className="login-content rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full"
          style={{
            backgroundColor: "var(--card-background)",
            color: "var(--card-foreground)",
          }}
        >
          <div className="login-body px-4 pt-5 pb-4 sm:p-6">
            {/* Header */}
            <div className="login-header flex justify-between items-center mb-4">
              <h3 className="login-title text-lg font-medium">
                تسجيل الدخول إلى حسابك
              </h3>
              <button
                type="button"
                className="login-close-button hover:opacity-70"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="login-close-icon" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="login-error w-full p-2 rounded-md my-2 flex items-center"
                style={{
                  backgroundColor: "var(--answer-bg-wrong)",
                  color: "var(--answer-text-wrong)",
                }}
              >
                <InfoIcon className="login-error-icon inline mr-2" />
                <p className="login-error-text inline">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form className="login-form space-y-6" onSubmit={login}>
              {/* Email */}
              <div className="login-email-field">
                <label
                  htmlFor="email"
                  className="login-email-label block text-sm font-medium"
                >
                  عنوان البريد الإلكتروني

                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="login-email-input mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              {/* Password */}
              <div className="login-password-field">
                <label
                  htmlFor="password"
                  className="login-password-label block text-sm font-medium"
                >
                  كلمة المرور

                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="login-password-input mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              {/* Forgot Password */}
              <div className="login-options flex items-center justify-between">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (email.length > 0) {
                      sendPasswordResetEmail(auth, email.toString());
                    } else setError("Please enter your email");
                  }}
                  className="login-forgot-link text-sm font-medium"
                  style={{
                    color: "var(--primary-color)",
                  }}
                >
                  هل نسيت كلمة المرور؟
                </a>
              </div>

              {/* Submit */}
              <div className="login-submit">
                <button
                  type="submit"
                  className="login-submit-button w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    color: "#fff",
                  }}
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
