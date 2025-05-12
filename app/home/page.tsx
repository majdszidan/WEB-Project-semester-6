import { GenerateCourse } from "./GenerateCourse";

export default async function HomePage() {
  const course = await GenerateCourse("C# advanced", "arabic");
  return (
    <>
      {course}
      {/* <h1>{course.quizName}</h1>
      {course.questions.map((question) => (
        <div key={question.question}>
          <h2>{question.question}</h2>
          <ul>
            {question.choices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </div>
      ))} */}
    </>
  );
}
