import CoursesGrid from "./CoursesGrid";
import AddCourseButton from "./AddCourseButton";
import RequireAuth from "@/app/RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
      <div className="pt-20 px-5">
        <CoursesGrid />
        <AddCourseButton />
      </div>
    </RequireAuth>
  );
}
