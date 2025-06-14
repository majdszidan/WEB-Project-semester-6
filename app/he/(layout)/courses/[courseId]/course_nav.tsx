import { DocumentReference } from "firebase/firestore";
import { UndoDotIcon, SendHorizonalIcon, RedoDotIcon } from "lucide-react";

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
    <div className="flex justify-between flex-row">
      <button
        className="flex flex-row gap-3 bg-gray-500 text-white py-1 px-2 rounded-lg disabled:bg-gray-300"
        type="button"
        disabled={quizzes.length - quiz == 1}
        onClick={() => setQuiz(quiz + 1)}
      >
        <RedoDotIcon />
        קודם
      </button>
      {quizzes.length - quiz}/{quizzes.length}
      {quiz == 0 ? (
        <button
          className="flex flex-row gap-3 bg-blue-600 text-white py-1 px-2 rounded-lg disabled:bg-blue-300"
          type="button"
          disabled={!canSubmit}
          onClick={submit}
        >
          הגש
          <SendHorizonalIcon className="scale-x-[-1]" />
        </button>
      ) : (
        <button
          className="flex flex-row gap-3 bg-gray-500 text-white py-1 px-2 rounded-lg "
          type="button"
          onClick={() => setQuiz(quiz - 1)}
        >
          הבא
          <UndoDotIcon />
        </button>
      )}
    </div>
  );
}
