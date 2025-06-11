import { auth, firestore } from "@/firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  DocumentReference,
  getDocs,
} from "firebase/firestore";
import { Question } from "./SaveQuestions";

export function GetQuizzes(
  courseId: string,
  onData: (question: DocumentReference[]) => void
) {
  const unsub = onSnapshot(
    query(
      collection(
        firestore,
        "users/" + auth.currentUser?.uid + "/courses/" + courseId + "/quizzes"
      ),
      orderBy("created", "desc")
    ),
    (snapshot) => {
      const quizzes = snapshot.docs.map((doc) => {
        return doc.ref;
      });

      onData(quizzes as DocumentReference[]);
    }
  );
  return unsub;
}

export async function GetQuestions(quizz: DocumentReference) {
  const docs = await getDocs(collection(quizz, "questions"));
  return docs.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  }) as unknown as Question[];
}
