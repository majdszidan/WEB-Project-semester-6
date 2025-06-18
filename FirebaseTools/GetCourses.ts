import { auth, firestore } from "@/firebase";
import {
  onSnapshot,
  collection,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Course } from "./CreateCourse";

export function GetCourses(onData: (courses: Course[]) => void) {
  const unsub = onSnapshot(
    query(
      collection(firestore, "users/" + auth.currentUser?.uid + "/courses"),
      orderBy("lastAccessed", "desc")
    ),
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
  if (!docSnap.exists()) return null;
  await updateDoc(docSnap.ref, { lastAccessed: Timestamp.now() });
  return docSnap.data() as Course;
}
