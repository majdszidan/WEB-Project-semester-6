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
      setLoading(false);
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
            className="border p-4 rounded-lg shadow space-y-3 transition-colors"
            style={{
              backgroundColor: "var(--card-background)",
              color: "var(--card-foreground)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2 className="text-lg font-semibold" dir="auto">
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
                  className="w-full text-start px-4 py-2 rounded border transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? isCorrect
                        ? "var(--answer-bg-correct)"
                        : "var(--answer-bg-wrong)"
                      : "var(--answer-bg-default)",
                    color: isSelected
                      ? isCorrect
                        ? "var(--answer-text-correct)"
                        : "var(--answer-text-wrong)"
                      : "var(--card-foreground)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  {choice}{" "}
                  {answers[id] && (choice === q.correct_answer ? "✔️" : "❌")}
                </button>
              );
            })}
          </div>
        );
      })}

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
          className="border p-4 rounded-lg shadow space-y-4 animate-pulse transition-colors"
          style={{
            backgroundColor: "var(--card-background)",
            borderColor: "var(--border-color)",
          }}
        >
          <div className="h-6 rounded w-3/4 bg-gray-300 dark:bg-gray-700"></div>
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 rounded w-full bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    course?.name && (
      <div
        className="min-h-screen transition-colors pt-15"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <div className="p-6 space-y-8 transition-colors">
          <h1
            className="text-3xl font-bold text-center transition-colors"
            style={{ color: "var(--primary-color)" }}
          >
            {course.name}
          </h1>

          {/* Tab Navigation */}
          <div className="max-w-3xl mx-auto">
            <div
              className="flex border-b transition-colors"
              style={{ borderColor: "var(--border-color)" }}
            >
              {(["quiz", "chatbot"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-3 font-medium text-sm border-b-2 transition-colors"
                  style={{
                    borderColor:
                      activeTab === tab
                        ? "var(--primary-color)"
                        : "transparent",
                    backgroundColor:
                      activeTab === tab
                        ? "var(--secondary-background)"
                        : "transparent",
                    color:
                      activeTab === tab
                        ? "var(--primary-color)"
                        : "var(--card-foreground)",
                  }}
                >
                  {tab === "quiz" ? "Quiz" : "Chatbot"}
                </button>
              ))}
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
