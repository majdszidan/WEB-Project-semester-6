import Link from "next/link";
import { Course } from "@/FirebaseTools/CreateCourse";
import React from "react";
import { DynamicIcon, IconName, iconNames } from "lucide-react/dynamic";

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
    <div
      className="group relative border rounded-2xl p-6 w-full max-w-xs shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
      style={{
        backgroundColor: "var(--card-background)",
        borderColor: "var(--border-color)",
        color: "var(--card-foreground)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, var(--primary-color), var(--card-background))",
        }}
      />

      <div className="relative h-full flex justify-between flex-col z-10 space-y-4">
        <div>
          <div className="flex items-center gap-4">
            {icon && iconNames.includes(icon.toLowerCase() as IconName) ? (
              <DynamicIcon
                name={icon.toLowerCase() as IconName}
                color="var(--primary-color)"
                className="w-12 h-12 p-2 rounded-lg"
                style={{ backgroundColor: "var(--math-bg)" }} // fallback to math-bg or define separate icon-bg if needed
              />
            ) : (
              <div
                className="w-12 h-12 rounded-lg"
                style={{ backgroundColor: "var(--math-bg)" }}
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold group-hover:text-[var(--primary-color)] transition-colors">
                  {name}
                </h2>
                <p
                  className="text-xs inline text-white rounded-full px-1.5 py-1"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  {genre}
                </p>
              </div>
              {lastAccessed && (
                <p className="text-xs" style={{ color: "var(--foreground)" }}>
                  Last accessed: {lastAccessed.toDateString()}
                </p>
              )}
            </div>
          </div>

          {description && (
            <p
              dir="auto"
              className="text-sm"
              style={{ color: "var(--card-foreground)" }}
            >
              {description}
            </p>
          )}
        </div>

        <div>
          <div
            className="w-full rounded-full h-2.5"
            style={{ backgroundColor: "var(--border-color)" }}
          >
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundImage:
                  "linear-gradient(to right, var(--primary-color), #1e40af)",
              }}
            />
          </div>

          <div
            className="flex justify-between text-sm"
            style={{ color: "var(--foreground)" }}
          >
            <span>התקדמות</span>
            <span className="font-bold text-[var(--primary-color)]">
              {progress}%
            </span>
          </div>

          <div className="pt-2">
            <Link href={`/courses/${encodeURIComponent(id!)}`}>
              <button
                className="w-full mt-2 px-4 py-2 rounded-md hover:opacity-90 transition"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                פתח קורס
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
