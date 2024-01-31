"use client";
import { AppShell, Button, Flex, em } from "@mantine/core";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";
import { IconCalendar, IconList } from "@tabler/icons-react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Timetable } from "../components/Timetable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Course } from "../type/Types";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [displayMode, toggleDisplayMode] = useToggle(["list", "timetable"]);

  const [weekdays, toggleSaturday] = useToggle([
    ["M", "TU", "W", "TH", "F"],
    ["M", "TU", "W", "TH", "F", "SA"],
  ]);

  useEffect(() => {
    if (!isMobile) {
      toggleDisplayMode("timetable");
    }
  }, [isMobile]);

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
      color: "red",
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
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{
        width: "400px",
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="0"
      h="100vh"
      w="100vw"
    >
      <AppShell.Header>
        <Header
          weekdays={weekdays}
          toggleSaturday={() => {
            toggleSaturday();
          }}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar
          courses={courses}
          toggleIsEnrolled={toggleIsEnrolled}
          addCourse={addCourse}
          deleteCourse={deleteCourse}
        />
      </AppShell.Navbar>
      <AppShell.Main h="100vh">
        {displayMode === "timetable" ? (
          <Timetable courses={courses} weekdays={weekdays} />
        ) : (
          <Navbar
            courses={courses}
            toggleIsEnrolled={toggleIsEnrolled}
            addCourse={addCourse}
            deleteCourse={deleteCourse}
          />
        )}
      </AppShell.Main>
      <AppShell.Footer
        withBorder={false}
        style={{ background: "rgba(0,0,0,0)" }}
      >
        <Flex gap="md" mih={50} justify="center" align="center" direction="row">
          {/* <Button
            variant="filled"
            size="lg"
            leftSection={<IconSearch />}
            onClick={spotlight.open}
          >
            Search
          </Button> */}
          <Button
            hiddenFrom="sm"
            size="lg"
            color="gray"
            mr={3}
            onClick={() => {
              toggleDisplayMode();
            }}
          >
            {displayMode === "list" ? <IconList /> : <IconCalendar />}
          </Button>
        </Flex>
      </AppShell.Footer>
      {/* <SpotlightSearch /> */}
    </AppShell>
  );
}
