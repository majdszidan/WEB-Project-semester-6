import { Course } from "@/FirebaseTools/CreateCourse";
import React from "react";

export default function CourseCard({
  name,
  icon,
  progress,
  genre,
  lastAccessed,
  description,
}: Course) {
  return (
    <div
      id="course-card-container"
      className="group relative bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-xs shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
    >
      <div
        id="hover-background"
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
      />

      <div id="course-card-content" className="relative z-10 space-y-4">
        <div id="course-header" className="flex items-center gap-4">
          {icon ? (
            <img
              id="course-icon"
              src={icon}
              alt={`${name} icon`}
              className="w-12 h-12 rounded-lg"
            />
          ) : (
            <div
              id="course-icon-placeholder"
              className="w-12 h-12 bg-blue-100 rounded-lg"
            />
          )}
          <div id="course-info">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {name}
            </h2>
            <p className="text-sm text-gray-500">{genre}</p>
            {lastAccessed && (
              <p id="last-accessed" className="text-xs text-gray-400">
                Last accessed: {lastAccessed.toDateString()}
              </p>
            )}
          </div>
        </div>

        {description && (
          <p id="course-description" className="text-sm text-gray-600">
            {description}
          </p>
        )}

        <div
          id="progress-bar-bg"
          className="w-full bg-gray-200 rounded-full h-2.5"
        >
          <div
            id="progress-bar-fill"
            className="h-2.5 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundImage: "linear-gradient(to right, #3b82f6, #1e40af)",
            }}
          />
        </div>

        <div
          id="progress-info"
          className="flex justify-between text-sm text-gray-600"
        >
          <span>Progress</span>
          <span className="font-bold text-blue-600">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
