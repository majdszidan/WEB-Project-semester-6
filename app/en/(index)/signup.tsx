import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { CheckCircle2Icon, InfoIcon, XIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function SignUpModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    (document.getElementById("signup-form") as HTMLFormElement)?.reset();
  }, [isOpen]);

  const register = (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    setSuccess(false);
    setError("");
    const data = new FormData(form.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const password2 = data.get("re-password");
    const fName = data.get("first-name");
    const lName = data.get("last-name");

    if (!fName) {
      setError("Please enter your first name");
      return;
    } else if (!lName) {
      setError("Please enter your last name");
      return;
    } else if (
      !email ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.toString())
    ) {
      setError("Please enter your email");
      return;
    } else if (!password) {
      setError("Please enter your password");
      return;
    } else if (!password2) {
      setError("Please re-enter your password");
      return;
    } else if (password !== password2) {
      setError("Passwords do not match");
      return;
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.toString(),
        password.toString()
      )
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: fName + " " + lName,
          });
          setSuccess(true);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <dialog
      className="w-screen h-screen bg-transparent fixed top-0 left-0 z-50"
      open={isOpen}
    >
      {/* Backdrop */}
      <div className="bg-black opacity-40 transition-opacity w-full h-screen"></div>

      {/* Modal Container */}
      <div
        className="fixed inset-0 m-2 z-50 h-screen flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "signup-modal-wrapper")
            setIsOpen(false);
        }}
        id="signup-modal-wrapper"
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
              <h3 className="text-lg font-medium">Create a new account</h3>
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
                <InfoIcon className="inline mr-2" />
                <p className="inline">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div
                className="w-full p-2 rounded-md my-2 flex items-center"
                style={{
                  backgroundColor: "var(--answer-bg-correct)",
                  color: "var(--answer-text-correct)",
                }}
              >
                <CheckCircle2Icon className="inline mr-2" />
                <p className="inline">
                  Account created successfully! Logging you in...
                </p>
              </div>
            )}

            {/* Sign-Up Form */}
            <form id="signup-form" className="space-y-6" onSubmit={register}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                    style={{
                      backgroundColor: "var(--secondary-background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                    style={{
                      backgroundColor: "var(--secondary-background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="signup-password"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="re-password"
                  id="confirm-password"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium
                  bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)] active:bg-[var(--primary-color-hover)]"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
