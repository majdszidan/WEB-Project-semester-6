import { auth, firestore } from "@/firebase";
import { CoveringQuestions } from "@/GeminiTools/generateCoveringQuestions";
import {
  collection,
  doc,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export async function SaveQuestions(courseId: string, quiz: CoveringQuestions) {
  await runTransaction(firestore, async (transaction) => {
    transaction.update(
      doc(firestore, "users/" + auth.currentUser?.uid + "/courses/" + courseId),
      { progress: Math.round(quiz.comprehension_score * 100) }
    );
    const quizzesRef = collection(
      firestore,
      "users/" + auth.currentUser?.uid + "/courses/" + courseId + "/quizzes"
    );
    const quizRef = doc(quizzesRef);
    transaction.set(quizRef, { created: Timestamp.now() });
    for (let i = 0; i < quiz.questions.length; i++) {
      transaction.set(doc(quizRef, "questions/" + i), {
        question: quiz.questions[i].question,
        correct_answer: quiz.questions[i].correct_answer,
        wrong_answers: quiz.questions[i].wrong_answers,
        topic_covered: quiz.questions[i].topic_covered,
      });
    }
  });
}

export async function AnswerQuestion(
  courseId: string,
  quizzId: string,
  questionId: string,
  answer: string
) {
  await updateDoc(
    doc(
      firestore,
      "users/" +
        auth.currentUser?.uid +
        "/courses/" +
        courseId +
        "/quizzes/" +
        quizzId +
        "/questions/" +
        questionId
    ),
    { user_answer: answer }
  );
}

export interface Question {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
  topic_covered: string;
  user_answer?: string;
  id: string;
}
