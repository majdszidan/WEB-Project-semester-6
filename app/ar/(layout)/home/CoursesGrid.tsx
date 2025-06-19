"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { GetCourses } from "@/FirebaseTools/GetCourses";
import { Course } from "@/FirebaseTools/CreateCourse";
import { auth } from "@/firebase";
import arrow from "@/public/arrow-white.png";
import Image from "next/image";

export default function CoursesGrid() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user === null) return;
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const unsub = GetCourses(setCourses);

    return unsub;
  }, [user]);

  return (
    <>
      {courses.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-white mb-6">
            الكورسات الخاصة بك
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
        <>
          <div className="flex p-5 z-10 flex-col justify-center left-0 top-0 fixed w-screen items-center h-screen font-extrabold text-xl text ">
            لم يتم انشاء كورسات
            <span className="text-blue-500"> (اضغط على + لانشاء كورس)</span>
          </div>
          <Image
            className="w-1/2 h-1/3 pl-10 fixed bottom-20 right-10"
            src={arrow}
            alt=""
          />
        </>
      )}
    </>
  );
}
