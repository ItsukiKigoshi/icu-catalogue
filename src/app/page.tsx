"use client";
import { AppShell, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Timetable } from "../components/Timetable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Course } from "../type/Types";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);

  // Get the list of courses from the local storage
  const [courses, setCourses] = useLocalStorage<Course[]>("courses", [
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
      color: "#ff0000",
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
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Text fw="bold">
              🚧 This App is still under development. Do not store any important
              data here!
            </Text>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
