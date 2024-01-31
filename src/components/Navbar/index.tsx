"use client";
import { Badge, ScrollArea, Stack } from "@mantine/core";

import CourseCard from "@/src/components/CourseCard";
import { Course } from "@/src/type/Types";
import { useDisclosure } from "@mantine/hooks";
import { IconList } from "@tabler/icons-react";
import { useState } from "react";
import AddCourse from "../AddCourse";
import ModalDetail from "../ModalDetail";

export function Navbar(props: {
  courses: Course[];
  toggleIsEnrolled: (regno: number) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (regno: number) => void;
}) {
  const [modalDetailOpened, { open, close }] = useDisclosure(false);
  const [modalDetailFocusedCourse, setModalDetailFocusedCourse] = useState<
    Course[]
  >([]);

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
      <div key={course.regno}>
        <CourseCard
          course={course}
          toggleIsEnrolled={props.toggleIsEnrolled}
          deleteCourse={props.deleteCourse}
          open={() => {
            setModalDetailFocusedCourse([course]);
            open();
          }}
        />
      </div>
    ));

  return (
    <Stack justify="flex-start" p="sm">
      <Badge size="lg" leftSection={<IconList />} fullWidth color="gray">
        My List
      </Badge>
      <AddCourse
        courses={props.courses}
        addCourse={() => {
          props.addCourse();
        }}
      />
      <ScrollArea>
        <Stack>{results}</Stack>
      </ScrollArea>
      <ModalDetail
        courses={modalDetailFocusedCourse}
        modalDetailOpened={modalDetailOpened}
        close={() => {
          close();
        }}
      />
    </Stack>
  );
}
