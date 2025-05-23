"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { GetCourses } from "@/FirebaseTools/GetCourses";
import { Course } from "@/FirebaseTools/CreateCourse";

export default function CoursesGrid() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const unsub = GetCourses(setCourses);
    return unsub;
  }, []);

  return (
    <>
      {courses.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Choose a Course
          </h2>
          <div
            id="courses-grid"
            className="flex flex-wrap justify-center gap-3 m-3"
          >
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center left-0 top-0 fixed w-screen items-center h-screen font-extrabold text-xl text ">
          Click on the plus sign to create your first course :)
        </div>
      )}
    </>
  );
}
