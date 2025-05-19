import React from "react";
import CourseCard from "./CourseCard";

export default function CoursesGrid() {
  const courses = [
    {
      name: "Assembly 101",
      icon: "/icons/nextjs.png",
      progress: 40,
      genre: "Programming",
      lastAccessed: "2 days ago",
      description: "Introduce of CPU language."
    },
    {
      name: "Modern Math",
      icon: "/icons/math.png",
      progress: 20,
      genre: "Math",
      lastAccessed: "5 days ago",
      description: "Learn the advanced steps of Math."
    },
    {
      name: "Biology Essentials",
      icon: "/icons/biology.png",
      progress: 60,
      genre: "Science",
      lastAccessed: "1 day ago",
      description: "Understand the building blocks of life from cells to ecosystems."
    },
  ];

  return (
    <div id="courses-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.name} {...course} />
      ))}
    </div>
  );
}
