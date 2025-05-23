import CoursesGrid from "./CoursesGrid";
import AddCourseButton from "./AddCourseButton";
import RequireAuth from "../RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <div className="pt-20">
        <CoursesGrid />
        <AddCourseButton />
      </div>
    </RequireAuth>
  );
}
