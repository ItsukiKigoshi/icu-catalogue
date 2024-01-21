import { Flex, ScrollArea, Text } from "@mantine/core";

import AddCourse from "@/src/components/AddCourse";
import CourseCard from "@/src/components/CourseCard";
import { Course } from "@/src/type/Types";
import classes from "./Navbar.module.css";

export function Navbar(props: {
  courses: Course[];
  toggleIsEnrolled: (regno: number) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (regno: number) => void;
}) {
  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const results = props.courses
    // Sort the courses by their no property
    .sort(function (a, b) {
      if (a.no > b.no) {
        return 1;
      } else {
        return -1;
      }
    })
    .map((course) => (
      <CourseCard
        course={course}
        toggleIsEnrolled={props.toggleIsEnrolled}
        deleteCourse={props.deleteCourse}
      />
    ));

  return (
    <nav className={classes.navbar}>
      <Flex justify="center">
        <Text size="lg" fw="bold" mb={5}>
          My List
        </Text>
      </Flex>

      <AddCourse addCourse={props.addCourse} courses={props.courses} />

      <ScrollArea>
        <div className={classes.navbarMain}>{results}</div>
      </ScrollArea>
    </nav>
  );
}
