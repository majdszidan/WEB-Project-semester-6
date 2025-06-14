import Link from "next/link";
import { Course } from "@/FirebaseTools/CreateCourse";
import React from "react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";

export default function CourseCard({
  name,
  icon,
  progress,
  genre,
  lastAccessed,
  description,
  id,
}: Course) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-xs shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

      <div className="relative h-full flex justify-between flex-col z-10 space-y-4">
        <div>
          <div className="flex items-center gap-4">
            {icon &&
            iconNames.includes(
              (icon.toLocaleLowerCase() ?? "") as "replace"
            ) ? (
              <DynamicIcon
                name={icon.toLocaleLowerCase() as "replace"}
                color="#155dfc"
                className="bg-blue-100 w-12 h-12 p-2 rounded-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-blue-100 rounded-lg" />
            )}
            <div>
              <div className="flex items-center gap-2 ">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {name}
                </h2>
                <p className="text-xs inline text-white bg-blue-600 rounded-full px-1.5 py-1">
                  {genre}
                </p>
              </div>
              {lastAccessed && (
                <p className="text-xs text-gray-400">
                  Last accessed: {lastAccessed.toDateString()}
                </p>
              )}
            </div>
          </div>

          {description && (
            <p dir="auto" className="text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>

        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundImage: "linear-gradient(to right, #3b82f6, #1e40af)",
              }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span className="font-bold text-blue-600">{progress}%</span>
          </div>

          <div className="pt-2">
            <Link href={`/courses/${encodeURIComponent(id!)}`}>
              <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                פתח קורס
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
