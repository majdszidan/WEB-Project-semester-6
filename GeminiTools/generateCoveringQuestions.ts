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
  const prompt =
    `You are an expert AI Quiz Generator and Learning Analyst for high school students. Your task is to generate a targeted quiz and assess student understanding based on a provided syllabus and their past performance. The new questions and answer choices you generate must be in ${language}.\n` +
    "**Your Goal:**\n" +
    "Generate a JSON object containing:\n" +
    "1. A `comprehension_score` (float between 0.0 and 1.0) representing your assessment of the student's overall understanding of the syllabus, considering their past performance. 0.0 means no understanding, and 1.0 means full understanding.\n" +
    "2. An array named `questions` containing exactly 10 unique multiple-choice question objects. Each object must have:\n" +
    `* \`question\`: (string) The question text, **in ${language}.**\n` +
    `* \`correct_answer\`: (string) The correct answer, **in ${language}.**\n` +
    `'* \`wrong_answers\`: (array of 3 strings) Three distinct and plausible incorrect answer choices, **each in ${language}.**\n` +
    "* `topic_covered`: (string) The specific concept from the input `syllabus` that this question assesses. **This string must exactly match one of the items from the provided `syllabus` array, maintaining its original language.**\n" +
    "**Inputs I will provide:**\n" +
    "1. **`syllabus`**: A JSON array of strings. Each string is a concept or topic from the high school syllabus. **These concepts can be in any language Gemini understands (e.g., English, Arabic, French, Spanish, Hebrew, etc.).**\n" +
    "```json\n" +
    "// Example (could be English):\n" +
    "// [\n" +
    '// "Newton\'s Laws of Motion",\n' +
    '// "Photosynthesis: Light-dependent reactions"\n' +
    "// ]\n" +
    "// Example (could be Arabic):\n" +
    "// [\n" +
    '// "قوانين نيوتن للحركة",\n' +
    '// "البناء الضوئي: التفاعلات المعتمدة على الضوء"\n' +
    "// ]\n" +
    "// Example (could be Hebrew):\n" +
    "// [\n" +
    '// "חוקי התנועה של ניוטון",\n' +
    '// "פוטוסינתזה: תגובות תלויות אור"\n' +
    "// ]\n" +
    "```\n" +
    "2. **`past_performance`**: A JSON array of objects. Each object represents a previously asked question, the student's answer, the correct answer, and the specific syllabus concept it covered.\n" +
    "* The `concept_covered` field in this input will **exactly match an item from the provided `syllabus` array, in its original language.**\n" +
    "* The `question_text`, `student_answer`, and `correct_answer` fields in this input are in their original language.\n" + // Corrected: "is" to "are" for consistency
    "```json\n" +
    "// Example (matching an English syllabus):\n" +
    "// [\n" +
    "// {\n" +
    '// "question_text": "Which law states that for every action, there is an equal and opposite reaction?",\n' +
    '// "student_answer": "Newton\'s First Law",\n' +
    '// "correct_answer": "Newton\'s Third Law",\n' +
    '// "concept_covered": "Newton\'s Laws of Motion" // Matches English syllabus item\n' +
    "// }\n" +
    "// ]\n" +
    "// Example (matching an Arabic syllabus):\n" +
    "// [\n" +
    "// {\n" +
    '// "question_text": "ما هو القانون الذي ينص على أن لكل فعل رد فعل مساوٍ له في المقدار ومضاد له في الاتجاه؟",\n' +
    '// "student_answer": "قانون نيوتن الأول",\n' +
    '// "correct_answer": "قانون نيوتن الثالث",\n' +
    '// "concept_covered": "قوانين نيوتن للحركة" // Matches Arabic syllabus item\n' +
    "// }\n" +
    "// ]\n" +
    "// Example (matching a Hebrew syllabus):\n" +
    "// [\n" +
    "// {\n" +
    '// "question_text": "איזה חוק קובע שלכל פעולה יש תגובה שווה והפוכה בכיוונה?",\n' +
    '// "student_answer": "החוק הראשון של ניוטון",\n' +
    '// "correct_answer": "החוק השלישי של ניוטון",\n' +
    '// "concept_covered": "חוקי התנועה של ניוטון" // Matches Hebrew syllabus item\n' +
    "// }\n" +
    "// ]\n" +
    "```\n" +
    "**Instructions for Generation:**\n" +
    "1. **Analyze Syllabus:** Understand the breadth and depth of concepts presented in the input `syllabus` (regardless of its language).\n" +
    "2. **Analyze Past Performance:**\n" +
    "* Using the `concept_covered` field (which will be in the language of the syllabus), identify concepts from the `syllabus` where the student answered incorrectly. These are high-priority areas.\n" +
    "* Identify concepts where the student answered correctly. These are lower-priority for *re-testing*.\n" +
    "* Identify concepts from the `syllabus` that have not yet been covered in `past_performance`.\n" +
    "* Do NOT repeat questions verbatim from `past_performance.question_text`. You can ask *new* questions on the *same concept*.\n" +
    `3. **Question Generation (10 MCQs in ${language}):**\n` +
    "* Generate exactly 10 unique multiple-choice questions.\n" +
    `* **All generated \`question\` text, \`correct_answer\` text, and \`wrong_answers\` text MUST be in natural and accurate ${language} suitable for a high school level.**\n` +
    "* **Prioritize questions on concepts the student has previously answered incorrectly.** For each such question, set its `topic_covered` field to the relevant concept string exactly as it appears in the input `syllabus` (preserving its original language).\n" +
    "* If there are fewer than 10 such weak areas, or to ensure variety, ask questions on concepts not yet covered in `past_performance`. For each such question, set its `topic_covered` field to the relevant concept string from the `syllabus` (preserving its original language).\n" +
    "* Ask fewer (or no new) questions on concepts the student has consistently answered correctly. If you do generate a question for such a concept, set its `topic_covered` field accordingly (using the exact syllabus item).\n" +
    "* Ensure the questions are appropriate for a high school level in terms of difficulty and content.\n" +
    `* Each question must have one clearly correct answer and three plausible but incorrect distractors, all in ${language}.\n` +
    "* For each generated question, the `topic_covered` string MUST be an exact match to one of the strings in the input `syllabus` array, **maintaining the original language and casing of that syllabus item.**\n" +
    "* Distribute questions to cover a range of topics from the `syllabus`, even while focusing on weaker areas.\n" +
    "4. **Comprehension Score Calculation:**\n" +
    "* **If the `past_performance` input array is empty, set the `comprehension_score` to `0.0` exactly.**\n" +
    "* Otherwise (if `past_performance` is not empty), base this score on your analysis of `past_performance` relative to the entire `syllabus`.\n" +
    "* Base this score on your analysis of `past_performance` relative to the entire `syllabus`.\n" +
    "* This score reflects overall understanding of the syllabus concepts, irrespective of the language of the syllabus or past questions.\n" +
    "* A student who has answered most questions correctly should have a higher score.\n" +
    "* Consider the proportion of the syllabus covered and mastered when `past_performance` is available.\n" + // <-- MODIFIED SECTION ENDS HERE
    "**Output Format (JSON Object - keys in English, specified textual values in " +
    language +
    ", `topic_covered` matches input syllabus language):**\n" +
    "```json\n" +
    "{\n" +
    '"comprehension_score": 0.0, // Float between 0.0 and 1.0\n' +
    '"questions": [\n' +
    "{\n" +
    `"question": "[Generated question text in ${language}]",\n` + // Changed from `in an ${language}` to `in ${language}` for conciseness
    `"correct_answer": "[The correct answer in ${language}]",\n` +
    '"wrong_answers": [\n' +
    `"[Wrong answer 1 in ${language}]",\n` +
    `"[Wrong answer 2 in ${language}]",\n` +
    `"[Wrong answer 3 in ${language}]"\n` +
    "],\n" +
    '"topic_covered": "[Exact String from Input Syllabus Item, in its Original Language]" // This value is a direct copy of a string from the input `syllabus` array.\n' +
    "}\n" +
    "// ...9 more question objects\n" +
    "]\n" +
    "}" +
    // The following lines are how you append your data, kept as is from your example:
    "\n\nSyllabus: " +
    JSON.stringify(syllabus) +
    "\n\nPast Performance: " +
    JSON.stringify(prevQuestions); // Assuming prevQuestions is defined in your scope

  const response = await genai.models.generateContent({
    model: "models/gemini-2.0-flash",
    contents: [
      {
        text: prompt,
      },
    ],
    config: {
      temperature: 0.4,
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
