import { Flex, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { Course, CourseWithAdded } from "@/src/type/Types";
import CourseCard from "../CourseCard/CourseCard";
import classes from "./NavbarSearch.module.css";
import SearchCourses from "./SearchCourses";

export function NavbarSearch() {
  const [courses, setCourses] = useState<CourseWithAdded[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      const response = await fetch("/api/courses");
      const jsonResponse = await response.json();

      const coursesAdded = jsonResponse.map((item: Course) => {
        return { ...item, added: false };
      });
      setCourses(coursesAdded);
    };

    getCourses();
  }, []);

  const toggleCheck = (regno: number) => {
    return () => {
      setCourses(
        courses.map((item) => {
          if (item.regno === regno) {
            console.log(`${item.regno}: ${item.added}`);
            return { ...item, added: !item.added };
          } else {
            return item;
          }
        })
      );
    };
  };

  const [currentQuery, setCurrentQuery] = useState("");

  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const results =
    courses.length > 0 || currentQuery === "" ? (
      <>
        {/* How to handle the state (currentQuery === "")?  */}
        {currentQuery !== "" ? (
          <Text>
            {courses.length} Results for "{currentQuery}"
          </Text>
        ) : (
          <></>
        )}
        {courses.map((item) => (
          <CourseCard item={item} toggleCheck={toggleCheck} />
        ))}
      </>
    ) : (
      <Flex justify="center">
        <Text>No Results for "{currentQuery}"</Text>
      </Flex>
    );

  return (
    <nav className={classes.navbar}>
      {/* Search Feature is now only available for courses */}
      <SearchCourses
        getSearchResults={(results: CourseWithAdded[]) => setCourses(results)}
        getCurrentQuery={(currentQuery: string) =>
          setCurrentQuery(currentQuery)
        }
      />

      <ScrollArea>
        <div className={classes.navbarMain}>{results}</div>
      </ScrollArea>
    </nav>
  );
}
