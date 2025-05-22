import CoursesGrid from "./CoursesGrid";
import AddCourseButton from "./AddCourseButton";
import RequireAuth from "../RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <div className="pt-20">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Choose a Course
          </h2>
          <CoursesGrid />
        </section>
        <AddCourseButton />
      </div>
    </RequireAuth>
  );
}
