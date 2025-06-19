import { DocumentReference } from "firebase/firestore";
import { SendHorizonalIcon } from "lucide-react";

export default function CourseNav({
  quizzes,
  setQuiz,
  quiz,
  canSubmit,
  submit,
}: {
  quizzes: DocumentReference[];
  quiz: number;
  setQuiz: (quiz: number) => void;
  canSubmit: boolean;
  submit: () => void;
}) {
  const isLastQuiz = quiz === quizzes.length - 1;

  return (
    <div
      className="flex items-center justify-between p-4 rounded-lg transition-colors"
      style={{
        backgroundColor: "var(--card-background, #f9fafb)", // light gray fallback
        border: "1px solid var(--border-color, #d1d5db)",
      }}
    >
      <div className="flex items-center space-x-4">
        <span
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--foreground)" }}
        >
          Quiz:
        </span>
        <div className="flex space-x-2">
          {quizzes.map((_, index) => {
            const isActive = quiz === index;
            return (
              <button
                key={index}
                onClick={() => setQuiz(index)}
                className="px-3 py-1 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive
                    ? "var(--primary-color, #3b82f6)" // blue fallback
                    : "var(--card-background, #fff)",
                  color: isActive
                    ? "var(--card-background, #fff)" // white text on active
                    : "var(--foreground)",
                  border: isActive
                    ? "none"
                    : "1px solid var(--border-color, #d1d5db)",
                }}
              >
                {quizzes.length - index}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={submit}
        disabled={!canSubmit || quiz != 0}
         style={{
          backgroundColor: canSubmit && isLastQuiz
            ? "var(--success-color, #22c55e)" // green fallback
            : "var(--border-color, #d1d5db)",
          color: canSubmit && isLastQuiz
            ? "var(--card-background, #fff)"
            : "var(--foreground)",
        }}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <SendHorizonalIcon className="mr-1" />
        Submit
      </button>
    </div>
  );
}
