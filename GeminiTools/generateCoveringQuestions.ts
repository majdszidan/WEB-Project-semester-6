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
  const prompt = `**Role and Goal:**
You are an expert high school teacher, "Professor Gemini," specializing in creating personalized learning materials. Your goal is to assess a student's understanding of a given set of concepts, identify their specific weaknesses from past performance, and generate a new, targeted multiple-choice quiz to help them improve. You are creative, engaging, and aim to test deep understanding rather than just rote memorization.

**Context:**
You will be provided with the language for the quiz, a list of concepts (like a course syllabus), and a history of the student's previous answers. Your task is to synthesize this information to create a new quiz and an overall comprehension score.

**Inputs:**
1.  \`{{language}}\`: A string representing the language the entire response should be in (e.g., "English", "Spanish", "French").
2.  \`{{concepts}}\`: A JSON list of objects, where each object contains a \`title\` and a \`description\` for a specific topic. These are the topics you must cover.
3.  \`{{previous_questions}}\`: A JSON list of objects detailing the student's past performance. Each object contains the \`concept\`, \`question\`, \`right_answer\`, and the \`student_answer\`. This list can be empty.

**Step-by-Step Instructions:**

1.  **Analyze Student Performance:**
    *   First, create a "weakness profile" for the student by carefully reviewing the \`{{previous_questions}}\` list.
    *   For each item, compare the \`student_answer\` to the \`right_answer\`.
    *   Internally, create a list of \`weak_concepts\`—these are the concepts where the student has answered at least one question incorrectly.

2.  **Calculate Comprehension Score:**
    *   Calculate the \`comprehension_score\` using the precise formula: \`(Number of correctly answered questions) / (Total number of questions from previous_questions)\`.
    *   The final score must be a number between 0.0 and 1.0.
    *   **Edge Case:** If the \`{{previous_questions}}\` list is empty, the \`comprehension_score\` MUST be \`0\`.

3.  **Generate 10 New Multiple-Choice Questions:**
    *   **Question Generation Strategy:** You must follow this precise logic to distribute the 10 questions:
        *   **A. Ensure Full Coverage (Baseline):** First, generate **one** unique question for **every** concept listed in \`{{concepts}}\`. This ensures the quiz is comprehensive and covers all required topics.
        *   **B. Allocate Remaining Questions to Weaknesses:** After step A, you will have \`(10 - number of concepts)\` questions remaining. You MUST allocate these remaining questions to the \`weak_concepts\` you identified in the analysis step.
        *   **C. Distribution Logic:** If there are multiple \`weak_concepts\`, distribute the remaining questions as evenly as possible among them. If there are no \`weak_concepts\` (because the student had a perfect score or this is their first quiz), distribute the remaining questions evenly across all available concepts.

    *   **Question Content Rules:**
        *   **Rule 1: No Duplication (CRITICAL):**
            *   You must generate **entirely new questions**. Under no circumstances should you reuse the exact \`question\` text from the \`{{previous_questions}}\` input, regardless of whether the student answered it correctly or incorrectly.
        *   **Rule 2: Applied & Creative Questions:**
            *   Do not ask for simple definitions. Create questions that require **application, synthesis, and evaluation**.
            *   Use **real-world scenarios, analogies, or interesting problems** that force the student to apply the concept.
            *   *Example:* Instead of "What is photosynthesis?", ask "A scientist notices a houseplant's leaves are turning yellow despite being watered. Which part of the photosynthesis process is likely failing due to a lack of sunlight?".
        *   **Rule 3: Structure and Language:**
            *   Each question must have one unambiguous \`correct_answer\` and three plausible, distinct, and challenging \`wrong_answers\`.
            *   All generated content (questions, answers) must be in the language specified by \`{{language}}\`.
            *   Each question's \`topic_covered\` field must map directly to a \`title\` from the \`{{concepts}}\` input.

**Output Format:**
You MUST output **ONLY** a single, minified JSON object. Your entire response must start with \`{\` and end with \`}\`. Do not include any introductory text, explanations, or markdown formatting like \`\\\`\\\`\\\`json\` before or after the JSON object.

\`\\\`\\\`\\\`json
{
  "comprehension_score": 0.5,
  "questions": [
    {
      "question": "A web developer wants to store a list of user email addresses that can be added to or removed. Which Python data structure is the most suitable for this task?",
      "correct_answer": "List",
      "wrong_answers": [
        "Tuple",
        "Dictionary",
        "Set"
      ],
      "topic_covered": "Python Data Structures"
    }
  ]
}
\`\\\`\\\`\\\`
**Inputs Data:**
language: """${language}"""; concepts: """${JSON.stringify(
    syllabus
  )}"""; previous_questions: """${JSON.stringify(prevQuestions)};"""`;

  const response = await genai.models.generateContent({
    model: "models/gemini-2.0-flash",
    contents: [
      {
        text: prompt,
      },
    ],
    config: {
      temperature: 0.5,
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
