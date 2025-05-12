import { Chat, Type } from "@google/genai";
import { genai } from "./genai";

export class CourseCreator {
  topic: string;
  language: string;
  ai: Chat;

  constructor(topic: string, language: string) {
    this.language = language;
    this.topic = topic;
    this.ai = genai.chats.create({
      model: "models/gemini-2.0-flash",
      config: {
        temperature: 0.7,
      },
    });
  }

  async create() {
    const response = await this.ai.sendMessage({
      message: `
        You are a high school teacher providing personalized support to a student who needs to catch up on ${this.topic}.  Your goal is to identify the student's strengths and weaknesses within the subject.
**Task:** Generate 10 multiple-choice questions in ${this.language} covering wide range of fundamental concepts in ${this.topic}.  Each question should have four answer choices (A, B, C, and D), with only one correct answer.

**Output Requirements:**

*   **Format:** Present each question and its answer choices clearly in JSON format.
*   **Language:** All questions and answer choices MUST be written exclusively in ${this.language}.  Do NOT include any English or other languages.
*   **Content:**  The questions should be designed to assess basic understanding of key concepts in ${this.topic}, suitable for a typical high school curriculum.  Aim for a mix of recall, application, and conceptual understanding.
*   **Tone:** Maintain a patient, supportive, and encouraging tone. The goal is to identify learning gaps, not to intimidate the student.

**Example (in English - you will generate the questions in ${this.language}):**

1.  What is the capital of France?
    A) Berlin
    B) Rome
    C) Paris
    D) London

**After generating the questions, I will provide the student's answers, and you will then provide feedback on which areas need further review.**
        `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["quizName", "questions"],
          properties: {
            quizName: {
              type: Type.STRING,
              description: "An apporpriate name for the quiz",
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["question", "choices"],
                properties: {
                  question: {
                    type: Type.STRING,
                  },
                  choices: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return JSON.parse(response.text ?? "") as CourseCreationTest;
  }

  async analyze(rightAnswers: string[], wrongAnswers: string[]) {
    return await this.ai.sendMessage({
      message: `The questions answered correctly are: ${rightAnswers.join(
        "\n"
      )}.  The questions answered incorrectly are: ${wrongAnswers.join(
        "\n"
      )}.  Please provide feedback on which areas need further review. respond in English. Present the finding clearing in a list.`,
    });
  }
}

type CourseCreationTest = {
  quizName: string;
  questions: {
    question: string;
    choices: string[];
  }[];
};
