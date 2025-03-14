"use client";
import { ScrollArea, Stack, Button } from "@mantine/core";

import CourseCard from "@/src/components/CourseCard";
import { Course, Term } from "@/src/type/Types";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import AddCourse from "../AddCourse";
import ModalDetail from "../ModalDetail";
import Link from "next/link";

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
        {/* navigate to search page*/}
        <Link href="/search" passHref>
          <Button variant="outline" fullWidth>
            Go to Search
          </Button>
        </Link>
        <ScrollArea>
          {results}
          <ModalDetail
            courses={modalDetailFocusedCourse}
            modalDetailOpened={modalDetailOpened}
            modalDetailClose={() => {
              modalDetailClose();
            }}
            courseController={props.courseController}
            language={props.language}
          />
        </ScrollArea>
      </Stack>
    </>
  );
}