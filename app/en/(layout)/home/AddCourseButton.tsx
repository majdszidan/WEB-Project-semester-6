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
  const [selectedTopics, setSelectedTopics] = useState<Set<Syllabus>>(
    new Set()
  );
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
          className="fixed bottom-6 right-6 p-2 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50"
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'var(--title-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
            e.currentTarget.style.filter = 'brightness(0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
            e.currentTarget.style.filter = 'brightness(1)';
          }}
        >
          <PlusIcon className="w-7 h-7" />
        </button>
      )}

      {isOpen && !showSyllabusModal && (
        <>
          <div className="fixed inset-0 z-40 w-screen h-screen bg-black opacity-50"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="rounded-2xl shadow-xl w-full max-w-md p-6 relative"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--card-foreground)',
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 hover:opacity-70"
                style={{ color: 'var(--card-foreground)' }}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 
                className="text-2xl font-bold text-center mb-6"
                style={{ color: 'var(--card-foreground)' }}
              >
                Add New Course
              </h2>

              {error && (
                <div 
                  className="mb-4 text-center font-medium"
                  style={{ color: 'var(--danger-color)' }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={courseName}
                    placeholder="Name of the course"
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--answer-bg-default)',
                      color: 'var(--foreground)',
                      border: `1px solid var(--border-color)`,
                    }}
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="mt-1 block w-full rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--answer-bg-default)',
                      color: 'var(--foreground)',
                      border: `1px solid var(--border-color)`,
                    }}
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
                  <label 
                    className="block text-sm font-medium"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full rounded-md shadow-sm px-3 py-2 focus:ring-2 focus:outline-none"
                    style={{
                      backgroundColor: 'var(--answer-bg-default)',
                      color: 'var(--foreground)',
                      border: `1px solid var(--border-color)`,
                    }}
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
                    className="w-full py-2 px-4 rounded-md shadow transition"
                    style={{
                      backgroundColor: loading ? 'var(--border-color)' : 'var(--primary-color)',
                      color: 'var(--title-color)',
                      opacity: loading ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.filter = 'brightness(0.9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.currentTarget.style.filter = 'brightness(1)';
                      }
                    }}
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
            <div 
              className="rounded-2xl shadow-xl w-full max-w-md p-6 relative"
              style={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--card-foreground)',
              }}
            >
              <h3 
                className="text-2xl font-semibold mb-4 text-center"
                style={{ color: 'var(--card-foreground)' }}
              >
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
                      style={{
                        accentColor: 'var(--primary-color)',
                      }}
                    />
                    <div>
                      <p 
                        className="font-medium"
                        style={{ color: 'var(--card-foreground)' }}
                      >
                        {item.title}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: 'var(--card-foreground)',
                          opacity: 0.7,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setShowSyllabusModal(false)}
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: 'var(--secondary-background)',
                    color: 'var(--foreground)',
                    border: `1px solid var(--border-color)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--border-color)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--secondary-background)';
                  }}
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
                    } catch (err) {
                      alert((err as Error).message);
                    }
                  }}
                  className="px-4 py-2 rounded transition"
                  style={{
                    backgroundColor: 'var(--answer-bg-correct)',
                    color: 'var(--title-color)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'brightness(0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
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