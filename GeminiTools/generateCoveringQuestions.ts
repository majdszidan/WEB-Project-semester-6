"use server";

import { Type } from "@google/genai";
import { genai } from "./genai";
import { Syllabus } from "./getSyllabus";

export async function GenerateConveringQuestions({
  syllabus,
  language,
  prevQuestions,
}: Readonly<{
  syllabus: Syllabus[];
  language: string;
  prevQuestions: Answered[];
}>) {
  const prompt = `You are an expert AI Tutoring Strategist and Adaptive Learning Specialist. Your role has two primary functions: first, to provide a holistic, data-driven diagnosis of a student's current understanding, and second, to generate a targeted quiz for remediation and reinforcement.

Your task is to analyze a student's past performance and produce a single JSON object containing both their overall comprehension score and a new, personalized 10-question quiz, strictly adhering to the specified output schema.

**INPUTS:**

**1. Language for Generation (\`{{LANGUAGE}}\`)**
The target language for all generated content.
${language}

**2. Syllabus (\`{{SYLLABUS_JSON}}\`)**
A JSON array of all possible concepts for the course, matching the \`Syllabus\` type.
\`\`\`json
${JSON.stringify(syllabus)}
\`\`\`

**3. Previously Answered Questions (\`{{ANSWERED_QUESTIONS_JSON}}\`)**
A JSON array of questions the student has already answered, matching the \`Answered\` type. This list may be empty.
\`\`\`json
${JSON.stringify(prevQuestions)}
\`\`\`

---

**PRIMARY TASK 1: DIAGNOSE OVERALL COMPREHENSION**

You must first determine the \`comprehension_score\` by following these conditional rules:

*   **CASE 1: The \`{{ANSWERED_QUESTIONS_JSON}}\` list is EMPTY.**
    *   The \`comprehension_score\` **MUST** be exactly \`0.0\`.

*   **CASE 2: The \`{{ANSWERED_QUESTIONS_JSON}}\` list is NOT empty.**
    *   Calculate the score using this formula: \`comprehension_score = (Number of correct answers) / (Total number of questions)\`, where a correct answer is one where \`student_answer === correct_answer\`.
    *   The result must be a number, rounded to two decimal places (e.g., 0.75).

---

**PRIMARY TASK 2: GENERATE AN ADAPTIVE QUIZ**

After determining the score, generate a new quiz of 10 questions using the appropriate strategy below:

*   **CASE A: For a NEW student (\`{{ANSWERED_QUESTIONS_JSON}}\` is empty).**
    *   **Goal:** Create a general diagnostic quiz.
    *   **Content:** Distribute the 10 questions as evenly as possible across the various concepts in the \`{{SYLLABUS_JSON}}\`.
    *   **Difficulty:** Strictly adhere to the Progressive Difficulty Ramp.

*   **CASE B: For a RETURNING student (\`{{ANSWERED_QUESTIONS_JSON}}\` is not empty).**
    *   **Goal:** Targeted remediation and reinforcement.
    *   **Content:** Identify "weak topics" (incorrect answers) and "strong topics" (correct answers). Distribute the 10 questions with a **60-70% focus on weak topics** and a **30-40% focus on strong/other topics.**
    *   **Difficulty:** Adhere to the Progressive Difficulty Ramp.

**Progressive Difficulty Ramp (Applicable to both cases):**
*   **Questions 1-3 (Easy):** Foundational recall/identification.
*   **Questions 4-7 (Medium):** Application in simple scenarios.
*   **Questions 8-10 (Hard):** Analytical/synthesis questions.

---

**CRITICAL RULES & OUTPUT FORMAT**

1.  **Final Output Structure:** You **MUST** output a single, valid JSON object that strictly conforms to the following schema. Provide only this JSON object and nothing else.

    \`\`\`json
    {
      "comprehension_score": 0.67,
      "questions": [
        {
          "question": "The text of the multiple-choice question.",
          "correct_answer": "The single, exact string of the correct answer.",
          "wrong_answers": [
            "Plausible Distractor 1",
            "Plausible Distractor 2",
            "Plausible Distractor 3"
          ],
          "topic_covered": "The exact 'title' from the Syllabus that this question assesses."
        }
      ]
    }
    \`\`\`

2.  **Schema Adherence:**
    *   The top-level keys must be \`comprehension_score\` and \`questions\`.
    *   Each question object must contain a \`correct_answer\` (string) and a \`wrong_answers\` (array of **exactly 3** strings).
    *   The \`explanation\` field is **not part of the schema** and must be omitted.

3.  **Guaranteed Novelty:** The \`question\` text in your output **MUST NOT** be a semantic repeat of any \`question_text\` from the input. Always create new questions.

4.  **Topic Tagging:** The \`topic_covered\` field is mandatory and its value must match a \`title\` from the \`{{SYLLABUS_JSON}}\` exactly.

---

Begin your two-part task. Provide only the single valid JSON object as your final response.`;

  const response = await genai.models.generateContent({
    model: "models/gemini-2.5-flash",
    contents: [
      {
        text: prompt,
      },
    ],
    config: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["comprehension_score", "questions"],
        properties: {
          comprehension_score: { type: Type.NUMBER, minimum: 0, maximum: 1 },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: [
                "question",
                "correct_answer",
                "wrong_answers",
                "topic_covered",
              ],
              properties: {
                question: { type: Type.STRING },
                correct_answer: { type: Type.STRING },
                wrong_answers: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                topic_covered: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
  });

  return JSON.parse(response.text ?? "") as CoveringQuestions;
}

export type CoveringQuestions = {
  comprehension_score: number;
  questions: {
    question: string;
    correct_answer: string;
    wrong_answers: string[];
    topic_covered: string;
  }[];
};

export type Answered = {
  question_text: string;
  student_answer: string;
  correct_answer: string;
  concept_covered: string;
};
