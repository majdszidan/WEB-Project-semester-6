"use server";

import { CourseCreator } from "@/GeminiTools/CreateCourse";

export async function GenerateCourse(topic: string, language: string) {
  const courseGenerator = new CourseCreator(topic, language);
  const generated = await courseGenerator.create();
  const analized = await courseGenerator.analyze(
    generated.questions.slice(0, 5).map((q) => q.question),
    generated.questions.slice(5).map((q) => q.question)
  );

  return analized.text;
}
