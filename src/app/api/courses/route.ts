import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const file = await fs.readFile(
    process.cwd() + "/src/data/icuCourses2023.json",
    "utf8"
  );
  const data = JSON.parse(file);
  return NextResponse.json(data);
}

// If you want to fetch all courses from API, you can use this snippet.
/*
// Get All Courses From API

import { Course } from "@/src/type/Course";
import { NextResponse } from "next/server";

async function fetchCourses(
  query: string = "Microeconomics",
  term: string = "*"
): Promise<Course[]> {
  const response = await fetch(
    // This is tentative endpoint. You should replace it with your own.
    `https://devserver.icu/api/v3/search?q=${query}&term=${term}`
  );

  if (!response.ok) throw new Error("Failed to fetch lectures");
  const courses = await response.json();
  return courses;
}

// You should replace the type with a suitable one.
export async function GET(request: string) {
  const courses = await fetchCourses();
  return NextResponse.json(courses);
}
*/
