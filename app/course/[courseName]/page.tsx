"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function CoursePage() {
  const { courseName } = useParams();

  return (
    <div className="p-6 pt-24 space-y-6 min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold text-center text-blue-800">
        Welcome to {decodeURIComponent(courseName as string)}
      </h1>

      <p className="text-center text-gray-600">
        This is your custom course page.
      </p>
    </div>
  );
}
