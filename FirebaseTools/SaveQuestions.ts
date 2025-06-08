import { auth, firestore } from "@/firebase";
import { CoveringQuestions } from "@/GeminiTools/generateCoveringQuestions";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export async function SaveQuestions(courseId: string, quiz: CoveringQuestions) {
  for (let i = 0; i < quiz.questions.length; i++) {
    await addDoc(
      collection(
        firestore,
        "users/" + auth.currentUser?.uid + "/courses/" + courseId + "/questions"
      ),
      {
        question: quiz.questions[i].question,
        correct_answer: quiz.questions[i].correct_answer,
        wrong_answers: quiz.questions[i].wrong_answers,
        topic_covered: quiz.questions[i].topic_covered,
        index: i,
        created: Timestamp.now(),
      }
    );
  }
  await updateDoc(
    doc(firestore, "users/" + auth.currentUser?.uid + "/courses/" + courseId),
    { progress: quiz.comprehension_score }
  );
}

export async function AnswerQuestion(
  courseId: string,
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
