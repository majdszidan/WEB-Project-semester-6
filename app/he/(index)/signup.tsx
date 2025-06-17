import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { CheckCircle2Icon, InfoIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    (document.getElementById("signup-form") as HTMLFormElement).reset();
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
          router.replace("/home");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };
  return (
    <dialog
      id="signup-modal-dialog"
      className="w-screen h-screen bg-transparent fixed top-0 start-0 z-50"
      open={isOpen}
    >
      <div
        id="signup-modal-overlay"
        className="bg-gray-500 opacity-75 transition-opacity w-full h-screen"
      ></div>
      <div
        id="signup-modal-wrapper"
        className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center"
        onClick={(e) => {
          if ((e.target as HTMLElement).id === "signup-modal-wrapper")
            setIsOpen(false);
        }}
      >
        <div
          id="signup-modal-container"
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full"
        >
          <div
            id="signup-modal-content"
            className="bg-white px-4 pt-5 pb-4 sm:p-6"
          >
            <div
              id="signup-modal-header"
              className="flex justify-between items-center mb-4"
            >
              <h3
                id="signup-modal-title"
                className="text-lg font-medium text-gray-900"
              >
                יצירת חשבון חדש
              </h3>
              <button
                type="button"
                id="signup-close-button"
                className="close-modal text-gray-400 hover:text-gray-500"
                onClick={() => setIsOpen(false)}
              >
                <XIcon />
              </button>
            </div>
            {error && (
              <div
                id="signup-error-box"
                className="text-red-600 w-full bg-red-300 p-2 rounded-md my-2"
              >
                <InfoIcon className="inline me-2" />
                <p className="inline">{error}</p>
              </div>
            )}

            {success && (
              <div
                id="signup-success-box"
                className="text-green-600 w-full bg-green-300 p-2 rounded-md my-2"
              >
                <CheckCircle2Icon className="inline me-2" />
                <p className="inline">החשבון נוצר בהצלחה, מתחנר לחשבון...!</p>
              </div>
            )}

            <form id="signup-form" className="space-y-6" onSubmit={register}>
              <div id="signup-name-fields" className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    שם פרטי
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    שם משפחה
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  כתובת אימייל
                </label>
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  סיסמה
                </label>
                <input
                  type="password"
                  name="password"
                  id="signup-password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  אימות סיסמה
                </label>
                <input
                  type="password"
                  name="re-password"
                  id="confirm-password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  id="signup-submit-button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  הרשמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      Use code with caution.
    </dialog>
  );
}
