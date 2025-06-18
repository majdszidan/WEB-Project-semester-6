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
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Quiz:</span>
        <div className="flex space-x-2">
          {quizzes.map((_, index) => (
            <button
              key={index}
              onClick={() => setQuiz(index)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                quiz === index
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {quizzes.length - index}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={submit}
        disabled={!canSubmit || quiz != 0}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <SendHorizonalIcon />
      </button>
    </div>
  );
}
