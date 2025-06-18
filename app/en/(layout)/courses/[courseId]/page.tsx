"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GenerateConveringQuestions } from "@/GeminiTools/generateCoveringQuestions";
import {
  AnswerQuestion,
  Question,
  SaveQuestions,
} from "@/FirebaseTools/SaveQuestions";
import { GetCourse } from "@/FirebaseTools/GetCourses";
import { GetQuestions, GetQuizzes } from "@/FirebaseTools/GetQuestions";
import { auth } from "@/firebase";
import { Course } from "@/FirebaseTools/CreateCourse";
import { DocumentReference } from "firebase/firestore";
import { GetPreviousAnswers } from "@/FirebaseTools/GetPreviousAnswers";
import CourseChatbot from "./course_chatbot";
import CourseNav from "./course_nav";

type TabType = "quiz" | "chatbot";

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [quizzes, setQuizzes] = useState<DocumentReference[]>([]);
  const [quiz, setQuiz] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabType>("quiz");
  const router = useRouter();

  async function submit() {
    setLoading(true);
    GenerateConveringQuestions({
      language: course!.language,
      syllabus: Array.from(course!.topics),
      prevQuestions: await GetPreviousAnswers(courseId),
    }).then((q) => {
      SaveQuestions(courseId, q);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) return;
      setUsername(user.email || "");
    });
  }, []);

  useEffect(() => {
    if (!username) return;
    GetCourse(courseId).then((course) => {
      if (course == null) router.replace("/404");
      setCourse(course);
    });
  }, [courseId, router, username]);

  useEffect(() => {
    if (course) {
      return GetQuizzes(courseId, async (quizzes) => {
        if (quizzes.length === 0) {
          const quiz = await GenerateConveringQuestions({
            language: course.language,
            syllabus: Array.from(course.topics),
            prevQuestions: [],
          });
          SaveQuestions(courseId, quiz);
        }
        setQuizzes(quizzes);
        setQuiz(0);
      });
    }
  }, [courseId, course]);

  useEffect(() => {
    if (quizzes.length > 0 && quizzes[quiz]) {
      GetQuestions(quizzes[quiz]).then((questions) => {
        setQuestions(
          questions.map((q) => ({
            ...q,
            wrong_answers: [q.correct_answer, ...q.wrong_answers].sort(
              () => 0.5 - Math.random()
            ),
          }))
        );
        setAnswers({});
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].user_answer)
            setAnswers((prev) => ({ ...prev, [i]: questions[i].user_answer }));
        }
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [quiz, quizzes]);

  const handleAnswer = (id: string, selected: string) => {
    setAnswers((prev) => ({ ...prev, [id]: selected }));
    AnswerQuestion(courseId, quizzes[quiz].id, id, selected);
  };

  const renderQuizContent = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Navigation */}
      <CourseNav
        quizzes={quizzes}
        setQuiz={setQuiz}
        quiz={quiz}
        canSubmit={Object.keys(answers).length === questions.length}
        submit={submit}
      />

      {questions.map((q) => {
        const id = q.id;
        const allChoices = q.wrong_answers;

        return (
          <div
            key={id}
            className="border p-4 rounded-lg shadow space-y-3 bg-gray-50"
          >
            <h2 dir="auto" className="text-lg font-semibold">
              {q.question}
            </h2>
            {allChoices.map((choice) => {
              const isSelected = answers[id] === choice;
              const isCorrect = choice === q.correct_answer;

              return (
                <button
                  key={choice}
                  dir="auto"
                  disabled={answers[id] !== undefined}
                  onClick={() => handleAnswer(id, choice)}
                  className={`w-full text-start  px-4 py-2 rounded border transition  ${
                    isSelected
                      ? isCorrect
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-red-100 border-red-500 text-red-800"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {choice}{" "}
                  {answers[id] && (choice === q.correct_answer ? "✔️" : "❌")}
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Bottom Quiz Navigation */}
      <CourseNav
        quizzes={quizzes}
        setQuiz={setQuiz}
        quiz={quiz}
        canSubmit={Object.keys(answers).length === questions.length}
        submit={submit}
      />
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-400 p-4 rounded-lg shadow space-y-4 bg-gray-50 animate-pulse"
        >
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-3 pt-2">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    course?.name && (
      <div className="pt-15 bg-white h-screen">
        <div className="p-6 overflow-auto h-full text-black space-y-8">
          <h1 className="text-3xl font-bold text-center text-blue-800">
            {course?.name}
          </h1>

          {/* Tab Navigation */}
          <div className="max-w-3xl mx-auto">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "quiz"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Quiz
              </button>
              <button
                onClick={() => setActiveTab("chatbot")}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "chatbot"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Chatbot
              </button>
            </div>
          </div>

          {/* Tab Content */}

          <div hidden={activeTab !== "quiz"}>
            {loading ? renderLoadingSkeleton() : renderQuizContent()}
          </div>

          <div hidden={activeTab !== "chatbot"}>
            <CourseChatbot course={course} />
          </div>
        </div>
      </div>
    )
  );
}
