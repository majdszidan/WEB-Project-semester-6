"use client";

import React, { useEffect, useState } from "react";
import { PlusIcon, X } from "lucide-react";
import { auth } from "@/firebase";
import {
  CourseSyllabus,
  getSyllabus,
  Syllabus,
} from "@/GeminiTools/getSyllabus";
import { CreateCourse } from "@/FirebaseTools/CreateCourse";
import { LanguageList } from "@/app/Languages";

export default function AddCourseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<CourseSyllabus | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<Set<Syllabus>>(new Set());
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);

  useEffect(() => {
    setCourseName("");
    setDescription("");
    setLanguage("");
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to generate a syllabus.");
      return;
    }

    setLoading(true);

    try {
      const aiSyllabus = await getSyllabus({
        topic: description,
        language: language || "English",
      });

      setSyllabus(aiSyllabus);
      const allTitles = new Set(aiSyllabus.core_concepts);
      setSelectedTopics(allTitles);
      setShowSyllabusModal(true);
    } catch (err) {
      setError("Failed to generate syllabus. Please try again.");
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
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
        >
          <PlusIcon className="w-7 h-7" />
        </button>
      )}

      {isOpen && !showSyllabusModal && (
        <>
          <div className="fixed inset-0 z-40 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-black hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-bold text-black text-center mb-6">
                Add New Course
              </h2>

              {error && (
                <div className="mb-4 text-red-600 text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    placeholder="Name of the course"
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full border text-black border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select a language
                    </option>
                    {LanguageList.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    required
                    placeholder="Describe the course topic, e.g. 'Web Development', 'Imaginary numbers', etc."
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
                    {loading ? "Generating..." : "Generate Syllabus"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {showSyllabusModal && syllabus && (
        <>
          <div className="fixed inset-0 z-40 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
              <h3 className="text-2xl font-semibold text-black mb-4 text-center">
                Choose Syllabus Topics
              </h3>

              <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {syllabus.core_concepts.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTopics.has(item)}
                      onChange={() => {
                        setSelectedTopics((prev) => {
                          const newSet = new Set(prev);
                          if (newSet.has(item)) newSet.delete(item);
                          else newSet.add(item);
                          return newSet;
                        });
                      }}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-black font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowSyllabusModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={async () => {
                    try {
                      await CreateCourse({
                        name: courseName,
                        language: language,
                        description: syllabus.course_summary,
                        topics: selectedTopics,
                        icon: syllabus.icon,
                        progress: 0,
                        genre: syllabus.topic_area,
                        lastAccessed: new Date(),
                        created: new Date(),
                      });

                      setShowSyllabusModal(false);
                      setIsOpen(false);
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
