"use client";

import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { InfoIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const login = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    setError("");
    const data = new FormData(form.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }
    signInWithEmailAndPassword(
      auth,
      email?.toString() ?? "",
      password?.toString() ?? ""
    )
      .then(() => {
        router.replace("/home");
      })
      .catch((e) => setError(e.message));
  };

  return (
    <dialog
      className="w-screen h-screen bg-transparent fixed top-0 left-0 z-50"
      open={isOpen}
    >
      <div className=" bg-gray-500 opacity-75 transition-opacity w-full h-screen"></div>
      <div
        className="fixed inset-0 z-50 w-screen h-screen  flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "login-clickable-area")
            setIsOpen(false);
        }}
        id="login-clickable-area"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Log in to your account
              </h3>
              <button
                type="button"
                className="close-modal text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            {error && (
              <div className="text-red-600 w-full bg-red-300 p-2 rounded-md my-2">
                <InfoIcon className="inline mr-2" />
                <p className="inline">{error}</p>
              </div>
            )}
            <form className="space-y-6" onSubmit={login}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
