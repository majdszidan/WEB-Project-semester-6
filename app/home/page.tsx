import { GenerateCourse } from "./GenerateCourse";
import CoursesGrid from "./CoursesGrid";
import HomeLayout from "./layout";
import AddCourseButton from "./AddCourseButton";
import RequireAuth from "../RequireAuth";

export default function HomePage() {
  return (
    <RequireAuth>
     <HomeLayout>
    <div className="pt-20 px-6  space-y-8 space-x-100">
    <section>
      <h2 className="text-2xl font-semibold text-white mb-6">Choose a Course</h2>
      <CoursesGrid />
    </section>
    <AddCourseButton />
    
  </div>
  
  </HomeLayout>
    </RequireAuth>
  );
}