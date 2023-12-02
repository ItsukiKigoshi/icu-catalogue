import { ScrollArea, Text } from "@mantine/core";

import { Course } from "@/src/type/Types";
import CourseCard from "../CourseCard/CourseCard";
import classes from "./Navbar.module.css";

export function Navbar(props: {
  courses: Course[];
  toggleIsEnrolled: (regno: number) => () => void;
}) {
  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const results = props.courses.map((course) => (
    <CourseCard course={course} toggleIsEnrolled={props.toggleIsEnrolled} />
  ));

  return (
    <nav className={classes.navbar}>
      <Text size="md">My List</Text>
      <Text size="sm"> Resolve Conflicts</Text>
      <ScrollArea>
        <div className={classes.navbarMain}>{results}</div>
      </ScrollArea>
    </nav>
  );
}
