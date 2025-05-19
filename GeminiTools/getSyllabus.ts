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
        text: `You are a high school professor creating a syllabus for ${topic}. 
        Give me a JSON array containing the core concepts taught in ${topic}, ordered from basic to advanced. 
        Each object should have two keys: 'title' (string) and 'description' (string). 
        The description should be a concise sentence summarizing the concept. 
        Respond in ${language}.`,
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
  return JSON.parse(response.text ?? "[]") as Syllabus[];
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
}

export type Syllabus = {
  title: string;
  description: string;
};
