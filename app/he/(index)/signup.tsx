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
    const form = document.getElementById("signup-form") as HTMLFormElement;
    if (form) form.reset();
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
      setError("אנא הזינו את שמכם הפרטי");
      return;
    } else if (!lName) {
      setError("אנא הזינו את שם המשפחה שלכם");
      return;
    } else if (
      !email ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.toString())
    ) {
      setError("אנא הזינו את כתובת האימייל שלכם");
      return;
    } else if (!password) {
      setError("אנא הזינו סיסמה");
      return;
    } else if (!password2) {
      setError("אנא הזינו את הסיסמה מחדש");
      return;
    } else if (password !== password2) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    createUserWithEmailAndPassword(auth, email.toString(), password.toString())
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: `${fName} ${lName}`,
        });
        setSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <dialog
      id="signup-modal-dialog"
      className="w-screen h-screen bg-transparent fixed top-0 start-0 z-50"
      open={isOpen}
    >
      <div className="bg-black opacity-40 transition-opacity w-full h-screen"></div>

      <div
        id="signup-modal-wrapper"
        className="fixed inset-0 m-2 z-50 h-screen flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "signup-modal-wrapper") {
            setIsOpen(false);
          }
        }}
      >
        <div
          className="rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full"
          style={{
            backgroundColor: "var(--card-background)",
            color: "var(--card-foreground)",
          }}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">יצירת חשבון חדש</h3>
              <button
                type="button"
                className="hover:opacity-70"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>

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

            {success && (
              <div
                className="w-full p-2 rounded-md my-2 flex items-center"
                style={{
                  backgroundColor: "var(--answer-bg-correct)",
                  color: "var(--answer-text-correct)",
                }}
              >
                <CheckCircle2Icon className="inline me-2" />
                <p className="inline">החשבון נוצר בהצלחה, מתחבר לחשבון...!</p>
              </div>
            )}

            <form id="signup-form" className="space-y-6" onSubmit={register}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">שם פרטי</label>
                  <input
                    type="text"
                    name="first-name"
                    className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                    style={{
                      backgroundColor: "var(--secondary-background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border-color)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">שם משפחה</label>
                  <input
                    type="text"
                    name="last-name"
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
                <label className="block text-sm font-medium">
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">סיסמה</label>
                <input
                  type="password"
                  name="password"
                  className="mt-1 block w-full rounded-md shadow-sm py-2 px-3"
                  style={{
                    backgroundColor: "var(--secondary-background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-color)",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">אימות סיסמה</label>
                <input
                  type="password"
                  name="re-password"
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
                  הרשמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
