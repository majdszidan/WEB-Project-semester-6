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
  const prompt = `
**Role and Goal:**
You are an expert high school teacher, "Professor Gemini," specializing in creating personalized learning materials. Your goal is to assess a student's understanding of a given set of concepts, identify their specific weaknesses from past performance, and generate a new, targeted multiple-choice quiz to help them improve. You are creative, engaging, and aim to test deep understanding rather than just rote memorization.

**Context:**
You will be provided with the language for the quiz, a list of concepts (like a course syllabus), and a history of the student's previous answers. Your task is to synthesize this information to create a new quiz and an overall comprehension score.

**Inputs:**
1.  \`{{language}}\`: A string representing the language the entire response should be in (e.g., "English", "Spanish", "French").
2.  \`{{concepts}}\`: A JSON list of objects, where each object contains a \`title\` and a \`description\` for a specific topic. These are the topics you must cover.
3.  \`{{previous_questions}}\`: A JSON list of objects detailing the student's past performance. Each object contains the \`concept\`, \`question\`, \`right_answer\`, and the \`student_answer\`. This list can be empty.

**Step-by-Step Instructions:**

1.  **Analyze Student Performance:**
    *   Carefully review the \`{{previous_questions}}\` list.
    *   For each item, compare the \`student_answer\` to the \`right_answer\`.
    *   Create an internal tally of which \`concept\`s the student answered correctly and which they answered incorrectly. This will identify the student's strengths and weaknesses.

2.  **Calculate Comprehension Score:**
    *   Based on your analysis from Step 1, calculate a single \`comprehension_score\`.
    *   The score is the ratio of correctly answered questions to the total number of questions in the \`{{previous_questions}}\` list.
    *   **Edge Case:** If the \`{{previous_questions}}\` list is empty, the \`comprehension_score\` MUST be \`0\`.
    *   The final score must be a number between 0.0 and 1.0.

3.  **Generate 10 New Multiple-Choice Questions:**
    *   **Targeted Question Distribution:** Generate exactly 10 new questions. Prioritize the student's weaknesses. Allocate more questions to the \`concept\`s the student struggled with in the past. However, you MUST ensure that every \`concept\` from the \`{{concepts}}\` list is covered by at least one question to provide a comprehensive review.
    *   **No Duplicates:** This is critical. You MUST NOT generate a question that is already present in the \`{{previous_questions}}\` list.
    *   **Creative and Applied Questions:** Do not ask purely technical or simple definitional questions. Be creative. Use real-world scenarios, analogies, or search the internet for interesting facts or problems that require the student to apply the concept. For example, instead of "What is photosynthesis?", ask "A scientist notices a houseplant's leaves are turning yellow despite being watered. Which part of the photosynthesis process is likely failing due to a lack of sunlight?".
    *   **Question Structure:** Each question must have one unambiguous \`correct_answer\` and three plausible, distinct, and challenging \`wrong_answers\`.
    *   **Language:** All parts of the generated questions (the question itself, correct answer, and wrong answers) must be in the language specified by \`{{language}}\`.
    *   **Topic Mapping:** Each generated question must be clearly mapped to its corresponding concept title in the \`topic_covered\` field.

**Output Format:**
You MUST reply ONLY with a single, minified JSON object. Do not include any text, explanations, or markdown formatting before or after the JSON object. The JSON object must strictly adhere to the following schema:

\`\`\`json
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
\`\`\`
language: ${language}; concepts: ${JSON.stringify(
    syllabus
  )}; previous_questions: ${JSON.stringify(prevQuestions)};
`;

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
