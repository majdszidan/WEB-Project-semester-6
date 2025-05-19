import { auth } from "@/firebase";  // Your firebase auth instance
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (!auth.currentUser) throw new Error("User not authenticated");

    const userId = auth.currentUser.uid; // unique user ID from Firebase auth

    await addDoc(collection(db, "courses"), {
      courseName,
      category,
      description,
      userId, // link course to the user
      createdAt: new Date(),
    });

    setIsOpen(false);
    setCourseName("");
    setCategory("");
    setDescription("");
  } catch (error) {
    console.error("Error adding course:", error);
  }
};