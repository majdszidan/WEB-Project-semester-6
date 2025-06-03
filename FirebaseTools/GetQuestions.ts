import { auth, firestore } from "@/firebase";
import { onSnapshot, collection, query } from "firebase/firestore";
import { Question } from "./SaveQuestions";

export function GetQuestions(
  courseId: string,
  onData: (question: Question[]) => void
) {
  const unsub = onSnapshot(
    query(
      collection(
        firestore,
        "users/" + auth.currentUser?.uid + "/courses/" + courseId + "/questions"
      )
    ),
    (snapshot) => {
      const questions = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      onData(questions as Question[]);
    }
  );
  return unsub;
}
