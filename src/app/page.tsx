"use client";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";
import { Timetable } from "../components/Timetable/Timetable";
import { Course } from "../type/Types";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);

  // Get the value of a certain key in the local storage
  const getLocalStorageValue = (key: string, initValue: string) => {
    const item = localStorage.getItem(key);

    return item ? item : initValue;
  };

  const useLocalStorage = (key: string, initValue: object) => {
    const [value, setValue] = useState(() =>
      JSON.parse(getLocalStorageValue(key, JSON.stringify(initValue)))
    );

    useEffect(() => {
      const callback = (event: StorageEvent) => {
        if (event.key === key) {
          setValue((value: object) =>
            JSON.parse(localStorage.getItem(key) ?? JSON.stringify(value))
          );
        }
      };

      window.addEventListener("storage", callback);
      return () => {
        window.removeEventListener("storage", callback);
      };
    }, [key]);

    const setLocalStorageValue = useCallback(
      (setStateAction: object | ((prevState: object) => object)) => {
        const newValue =
          setStateAction instanceof Function
            ? setStateAction(value)
            : setStateAction;

        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(() => newValue);
      },
      [key, value]
    );

    return [value, setLocalStorageValue] as const;
  };

  const [courses, setCourses] = useLocalStorage("courses", [
    {
      regno: 99999,
      season: "Spring",
      ay: 2022,
      no: "CS101",
      lang: "E",
      e: "Example Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
      unit: 3,
      isEnrolled: true,
    },
  ]);

  // Toggle the isEnrolled property of a certain course
  // Usage: toggleIsEnrolled(regno)
  const toggleIsEnrolled = (regno: number) => {
    setCourses(
      courses.map((course: Course) => {
        if (course.regno === regno) {
          return { ...course, isEnrolled: !course.isEnrolled };
        } else {
          return course;
        }
      })
    );
  };

  // Add a course to the list "courses"
  // Usage: addCourse(course: Course)
  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  // Delete a certain course from the list "courses"
  // Usage: deleteCourse(regno: number)
  const deleteCourse = (regno: number) => {
    setCourses(courses.filter((course: Course) => course.regno !== regno));
  };

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: "400px",
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
        h="100vh"
      >
        <AppShell.Header>
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar
            courses={courses}
            toggleIsEnrolled={toggleIsEnrolled}
            addCourse={addCourse}
            deleteCourse={deleteCourse}
          />
        </AppShell.Navbar>
        <AppShell.Main>
          {/* <Grid justify="flex-start" gutter="sm" align="stretch"> */}
          {/* <Grid.Col span={{ base: "auto" }}> */}
          <Timetable courses={courses} />
          {/* </Grid.Col> */}
          {/* <Grid.Col mt={{ base: 5, md: 0 }} span={{ base: 12, md: "content" }}>
            <RequirementTable />
          </Grid.Col> */}
          {/* </Grid> */}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
