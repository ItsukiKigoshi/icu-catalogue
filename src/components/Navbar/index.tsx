"use client";
import { ScrollArea, Stack } from "@mantine/core";

import CourseCard from "@/src/components/CourseCard";
import { Course, Term } from "@/src/type/Types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AddCourse from "../AddCourse";
import ModalDetail from "../ModalDetail";

export function Navbar(props: {
  courses: Course[];
  courseController: {
    toggleIsEnrolled: (regno: number) => void;
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (regno: number) => void;
  };
  language: string;
  selectedTerm?: Term;
}) {
  const [
    modalDetailOpened,
    { open: ModalDetailOpen, close: modalDetailClose },
  ] = useDisclosure(false);
  const [modalDetailFocusedCourse, setModalDetailFocusedCourse] = useState<
    Course[]
  >([]);

  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const results = props.courses
    // Sort the courses by their no property
    ?.sort(function (a, b) {
      if (a.regno > b.regno) {
        return 1;
      } else {
        return -1;
      }
    })
    ?.map((course) => (
      <div key={course.regno}>
        <CourseCard
          course={course}
          toggleIsEnrolled={props.courseController.toggleIsEnrolled}
          deleteCourse={props.courseController.deleteCourse}
          open={() => {
            setModalDetailFocusedCourse([course]);
            ModalDetailOpen();
          }}
          language={props.language}
        />
      </div>
    ));

  return (
    <>
      <Stack justify="flex-start" p="sm" h="100%">
        <AddCourse
          courses={props.courses}
          courseController={props.courseController}
          selectedTerm={props.selectedTerm}
        />
        <ScrollArea>
          {results}
          <ModalDetail
            courses={modalDetailFocusedCourse}
            modalDetailOpened={modalDetailOpened}
            modalDetailClose={() => {
              modalDetailClose();
            }}
            courseController={props.courseController}
          />
        </ScrollArea>
      </Stack>
    </>
  );
}
