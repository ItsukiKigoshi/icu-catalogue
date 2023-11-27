// Get Specific Courses From API
import { Course } from "@/src/type/Course";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

async function fetchCourses(): Promise<Course[]> {
  const file = await fs.readFile(
    process.cwd() + "/src/data/icuCourses2023.json",
    "utf8"
  );
  const data = JSON.parse(file);
  return data;
}

// async function fetchCourses(
//   query: string = "Macroeconomics Policy",
//   term: string = "*"
// ): Promise<Course[]> {
//   const response = await fetch(
//     // This is tentative endpoint. You should replace it with your own.
//     `https://devserver.icu/api/v3/search?q=${query}&term=${term}`
//   );

//   if (!response.ok) throw new Error("Failed to fetch lectures");
//   const courses = await response.json();
//   return courses;
// }

// You should replace the type with a suitable one.
export async function GET(request: Request) {
  const courses = await fetchCourses();
  const { searchParams } = new URL(request.url);
  //   console.log(request.url);
  const query: string = searchParams.get("query") || "";
  //   console.log(`query: ${query}`);

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((course) => {
          // Search query has bug. Some courses are not shown.
          return (
            course.title_e.toLowerCase().includes(query.toLocaleLowerCase()) ||
            course.summary_e
              .toLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            course.title_j.includes(query) ||
            course.summary_j.includes(query)
          );
        });

  //   console.log(
  //     filteredCourses.map((course) => {
  //       return course.title_e;
  //     })
  //   );
  return NextResponse.json(filteredCourses);
}
