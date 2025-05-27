"use server";

import { Type } from "@google/genai";
import { genai } from "./genai";

export async function getSyllabus({
  topic,
  language,
}: Readonly<{
  topic: string;
  language: string;
}>) {
  const response = await genai.models.generateContent({
    model: "models/gemini-2.0-flash",
    contents: [
      {
        text:
          "You are an expert curriculum designer specializing in creating **high school level** syllabi.\n" +
          'For the given topic "' +
          topic +
          '", produce a single, valid JSON object.\n' +
          "Do not include any explanatory text, markdown formatting, or conversational elements outside of the JSON itself.\n" +
          "The JSON object must have the following top-level keys:\n" +
          '1. `course_summary`: (string) A single, concise sentence describing the overall content and learning journey of a **high school course** based on this syllabus for "' +
          topic +
          '".\n' +
          '2. `topic_area`: (string) The general academic field or subject area to which "' +
          topic +
          '" belongs (e.g., "Mathematics", "Computer Science", "Literature", "Biology"). Infer this from the provided topic. **This value MUST always be in English.**\n' +
          "3. `core_concepts`: (JSON array) An array of objects, where each object represents a core concept or unit **suitable for a high school curriculum**. This array MUST be ordered logically, progressing from **foundational/basic concepts to more advanced concepts appropriate for high school students**. Each object within this array MUST contain:\n" +
          "* `title`: (string) The name/title of the concept.\n" +
          "* `description`: (string) A concise, one-sentence summary of what this concept covers, **understandable by a high school student**.\n" +
          "The following textual string values within the generated JSON MUST be in " +
          language +
          ": `course_summary`, all `title`s in `core_concepts`, and all `description`s in `core_concepts`.\n" +
          "The `topic_area` MUST be in English, as specified above.\n" +
          '4. `icon`: (string) The exact kebab-case name of an icon from **Lucide Icons** (see https://lucide.dev/) that is visually representative of the `topic`. Examples: "book-open", "brain-circuit", "code-2", "atom". This key MUST always be included. Provide only the icon name string. If a perfect match isn\'t available, choose the most relevant alternative from the Lucide Icons library.',
      },
    ],
    config: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["course_summary", "topic_area", "core_concepts"],
        properties: {
          icon: { type: Type.STRING },
          course_summary: { type: Type.STRING },
          topic_area: { type: Type.STRING },
          core_concepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "description"],
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
          },
        },
      },
    },
  });
  return JSON.parse(response.text ?? "[]") as CourseSyllabus;
}

export async function addToSyllabus({
  topic,
  language,
  syllabus,
  toAdd,
}: Readonly<{
  topic: string;
  language: string;
  syllabus: Syllabus[];
  toAdd: string[];
}>) {
  const response = await genai.models.generateContent({
    model: "models/gemini-2.0-flash",
    contents: [
      {
        text: `You are an AI assistant specializing in organizing educational concepts.
         You will be given a JSON array representing a curriculum of ${topic}-related topics, 
         ordered from basic to advanced. You will also be given a list of additional topics.
          Your task is to evaluate each topic in the list and, if it is relevant to ${topic}
           (either as a prerequisite, a related field, or a more advanced concept), 
           insert it into the JSON array in the correct position to maintain the basic-to-advanced order.
            If a topic is not relevant to algebra, ignore it. Return the modified JSON array.
             Do not modify the original topics, only add new ones. Respond in ${language}.\n
             Here is the original syllabus: ${JSON.stringify(syllabus)}.\n
             Here is the new topic to add: ${toAdd.join(", ")}.`,
      },
    ],
    config: {
      temperature: 0,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          required: ["title", "description"],
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
          },
        },
      },
    },
  });

  return response.text ? (JSON.parse(response.text) as Syllabus[]) : [];
}

export type CourseSyllabus = {
  course_summary: string;
  topic_area: string;
  icon?: string;
  core_concepts: Syllabus[];
};

export type Syllabus = {
  title: string;
  description: string;
};
