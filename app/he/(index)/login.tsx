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
      {/* Modal Backdrop */}
      <div className="login-backdrop bg-gray-500 opacity-75 transition-opacity w-full h-screen"></div>
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
        <div className="login-content bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          <div className="login-body bg-white px-4 pt-5 pb-4 sm:p-6">
            {/* Header with Title and Close Button */}
            <div className="login-header flex justify-between items-center mb-4">
              <h3 className="login-title text-lg font-medium text-gray-900">
                התחברו לחשבון שלכם
              </h3>
              <button
                type="button"
                className="login-close-button text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="login-close-icon" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="login-error text-red-600 w-full bg-red-300 p-2 rounded-md my-2">
                <InfoIcon className="login-error-icon inline me-2" />
                <p className="login-error-text inline">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form className="login-form space-y-6" onSubmit={login}>
              {/* Email Field */}
              <div className="login-email-field">
                <label
                  htmlFor="email"
                  className="login-email-label block text-sm font-medium text-gray-700"
                >
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  className="login-email-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Password Field */}
              <div className="login-password-field">
                <label
                  htmlFor="password"
                  className="login-password-label block text-sm font-medium text-gray-700"
                >
                  סיסמה
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="login-password-input mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Forgot Password */}
              <div className="login-options flex items-center justify-between">
                <div className="login-forgot-password">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (email.length > 0) {
                        sendPasswordResetEmail(auth, email?.toString() ?? "");
                      } else setError("אנא הזינו את כתובת האימייל שלכם");
                    }}
                    className="login-forgot-link text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    שכחתם סיסמה?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div className="login-submit">
                <button
                  type="submit"
                  className="login-submit-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
