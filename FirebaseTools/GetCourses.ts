import { auth, firestore } from "@/firebase";
import {
  onSnapshot,
  collection,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { Course } from "./CreateCourse";

export function GetCourses(onData: (courses: Course[]) => void) {
  const unsub = onSnapshot(
    collection(firestore, "users/" + auth.currentUser?.uid + "/courses"),
    (snapshot) => {
      const courses = snapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      onData(
        courses.map((docx) => ({
          ...docx,
          lastAccessed: (
            docx as unknown as { lastAccessed: Timestamp }
          ).lastAccessed.toDate(),
        })) as Course[]
      );
    }
  );
  return unsub;
}

export async function GetCourse(courseId: string) {
  const docSnap = await getDoc(
    doc(firestore, "users/" + auth.currentUser?.uid + "/courses/" + courseId)
  );
  return docSnap.data() as Course;
}
