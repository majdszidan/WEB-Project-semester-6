"use client";

import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { auth, firestore } from "@/firebase"; // Use firestore here
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddCourseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to add a course.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, "courses"), {
        courseName,
        category,
        description,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setCourseName("");
      setCategory("");
      setDescription("");
      setIsOpen(false);
    } catch (err) {
      setError("Failed to save course. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-black hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-black text-center mb-6">Add New Course</h2>

            {error && (
              <div className="mb-4 text-red-600 text-center font-medium">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={loading}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="programming">Programming</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  required
                  disabled={loading}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${
                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-2 px-4 rounded-md shadow transition`}
                >
                  {loading ? "Saving..." : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
