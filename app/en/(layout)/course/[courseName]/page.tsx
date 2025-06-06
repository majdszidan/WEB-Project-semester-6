"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GenerateConveringQuestions } from "@/GeminiTools/generateCoveringQuestions";

interface Question {
  question: string;
  correct_answer: string;
  wrong_answers: string[];
  topic_covered: string;
}

export default function CoursePage() {
  const { courseName } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseName) return;

    const load = async () => {
      try {
        const topic = decodeURIComponent(courseName as string);

        const aiResult = await GenerateConveringQuestions({
          syllabus: [{ title: topic, description: topic }],
          language: "English", // או "עברית" אם את רוצה
          prevQuestions: [],
        });

        setQuestions(aiResult.questions);
      } catch (err) {
        console.error("❌ AI generation failed:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseName]);

  const handleAnswer = (id: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [id]: selected }));
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-white text-black space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-800">
        Welcome to {decodeURIComponent(courseName as string)}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {questions.map((q, index) => {
            const id = index.toString();
            const allChoices = [...q.wrong_answers, q.correct_answer].sort();

            return (
              <div
                key={id}
                className="border p-4 rounded-lg shadow space-y-3 bg-gray-50"
              >
                <h2 className="text-lg font-semibold">{q.question}</h2>
                {allChoices.map((choice) => {
                  const isSelected = answers[id] === choice;
                  const isCorrect = choice === q.correct_answer;

                  return (
                    <button
                      key={choice}
                      onClick={() => handleAnswer(id, choice)}
                      className={`w-full text-left px-4 py-2 rounded border transition ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-red-100 border-red-500 text-red-800"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {choice}
                    </button>
                  );
                })}
                {answers[id] && (
                  <p className="text-sm mt-1">
                    {answers[id] === q.correct_answer ? (
                      <span className="text-green-600">✔️ Correct</span>
                    ) : (
                      <span className="text-red-600">
                        ❌ Incorrect. Correct answer:{" "}
                        <strong>{q.correct_answer}</strong>
                      </span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
