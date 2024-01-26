"use client";
import { Badge, ScrollArea, Stack } from "@mantine/core";

import CourseCard from "@/src/components/CourseCard";
import { Course } from "@/src/type/Types";
import { IconList } from "@tabler/icons-react";

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
    <Stack justify="flex-start" p="sm">
      <Badge size="lg" leftSection={<IconList />} fullWidth color="gray">
        My List
      </Badge>
      <ScrollArea>
        <Stack>{results}</Stack>
      </ScrollArea>
    </Stack>
  );
}
