import CoursesGrid from "./CoursesGrid";
import AddCourseButton from "./AddCourseButton";

export default function HomePage() {
  return (
    <div className="pt-20 px-5">
      <CoursesGrid />
      <AddCourseButton />
    </div>
  );
}
