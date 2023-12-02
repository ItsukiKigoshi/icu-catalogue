import { ScrollArea, TextInput, rem } from "@mantine/core";

import { Course } from "@/src/type/Types";
import { IconSearch } from "@tabler/icons-react";
import CourseCard from "../CourseCard/CourseCard";
import classes from "./NavbarSearch.module.css";

export function NavbarSearch(props: {
  courses: Course[];
  toggleIsEnrolled: (regno: number) => () => void;
}) {
  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const results = props.courses.map((course) => (
    <CourseCard course={course} toggleIsEnrolled={props.toggleIsEnrolled} />
  ));

  return (
    <nav className={classes.navbar}>
      <form>
        <TextInput
          placeholder="Search Courses"
          size="xs"
          leftSection={
            <IconSearch
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
          styles={{ section: { pointerEvents: "none" } }}
          mb="sm"
        />
      </form>

      <ScrollArea>
        <div className={classes.navbarMain}>{results}</div>
      </ScrollArea>
    </nav>
  );
}
