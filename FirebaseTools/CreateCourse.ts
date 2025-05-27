import { auth, firestore } from "@/firebase";
import { Syllabus } from "@/GeminiTools/getSyllabus";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function CreateCourse(course: Course) {
  await addDoc(
    collection(firestore, "users/" + auth.currentUser?.uid + "/courses"),
    {
      name: course.name,
      language: course.language,
      description: course.description,
      topics: Array.from(course.topics),
      genre: course.genre,
      progress: course.progress,
      created: Timestamp.now(),
      icon: course.icon,
      lastAccessed: Timestamp.fromDate(course.lastAccessed),
    }
  );
}

export type Course = {
  name: string;
  icon?: string;
  language: string;
  progress: number;
  genre: string;
  description: string;
  topics: Set<Syllabus>;
  created: Date;
  lastAccessed: Date;
  id?: string;
};
