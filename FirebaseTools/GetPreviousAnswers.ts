import { auth, firestore } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GetQuestions } from "./GetQuestions";

export type Answered = {
  question_text: string;
  student_answer: string;
  correct_answer: string;
  concept_covered: string;
};

export async function GetPreviousAnswers(courseId: string) {
  let prev: Answered[] = [];
  try {
    const docSnap = await getDocs(
      collection(
        firestore,
        "users/" + auth.currentUser?.uid + "/courses/" + courseId + "/quizzes"
      )
    );
    for (let i = 0; i < docSnap.docs.length; i++)
      prev = [
        ...prev,
        ...(await GetQuestions(docSnap.docs[i].ref)).map((question) => {
          return {
            question_text: question.question,
            student_answer: question.user_answer ?? "",
            correct_answer: question.correct_answer,
            concept_covered: question.topic_covered,
          } as Answered;
        }),
      ];
  } catch (error) {
    console.log(error);
  }
  return prev;
}
