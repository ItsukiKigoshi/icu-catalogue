"use client";
import { AppShell, Button, Flex, em } from "@mantine/core";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";
import { IconCalendar, IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Timetable } from "../components/Timetable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Course } from "../type/Types";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const [weekdays, toggleSaturday] = useToggle([
    ["M", "TU", "W", "TH", "F"],
    ["M", "TU", "W", "TH", "F", "SA"],
  ]);

  const terms = [
    { label: "2024S", ay: "2024", season: "Spring", value: "2024S" },
    { label: "2024A", ay: "2024", season: "Autumn", value: "2024A" },
    { label: "2024W", ay: "2024", season: "Winter", value: "2024W" },
  ];
  const [selectedTermValue, setselectedTermValue] = useState(terms[0].value);

  const selectedTerm = terms.find((term) => term.value === selectedTermValue);

  const [displayMode, toggleDisplayMode] = useToggle(["list", "timetable"]);
  useEffect(() => {
    if (!isMobile) {
      toggleDisplayMode("timetable");
    }
  }, [isMobile]);

  // Get the list of courses from the local storage
  const [courses, setCourses] = useLocalStorage<Course[]>("courses", [
    {
      regno: 99997,
      season: "Spring",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Spring Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "orange",
      isEnrolled: true,
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      regno: 99998,
      season: "Autumn",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Autumn Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "pink",
      isEnrolled: true,
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      regno: 99999,
      season: "Winter",
      ay: 2024,
      no: "CS101",
      lang: "E",
      e: "Example Winter Course",
      j: "科目例",
      schedule: ["3/M", "3/W", "3/F"],
      instructor: "John Doe",
      unit: 3,
      room: "H-000",
      color: "green",
      isEnrolled: true,
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
  ]);

  const timetable: { [key: string]: Course[] } = {};
  const coursesInSelectedTerm = courses.filter(
    (course) =>
      course.season === selectedTerm?.season &&
      course.ay.toString() === selectedTerm?.ay
  );

  const enrolledCourses = coursesInSelectedTerm.filter(
    (course) => course.isEnrolled
  );
  enrolledCourses.forEach((course) => {
    course.schedule?.forEach((entry) => {
      const [time, day] = entry.split("/");
      if (!timetable[`${time}/${day}`]) {
        timetable[`${time}/${day}`] = [];
      }
      timetable[`${time}/${day}`].push(course);
    });
  });

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
          terms={terms}
          selectedTermValue={selectedTermValue}
          setselectedTermValue={setselectedTermValue}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar
          courses={coursesInSelectedTerm}
          courseController={{
            toggleIsEnrolled,
            addCourse,
            deleteCourse,
          }}
        />
      </AppShell.Navbar>
      <AppShell.Main h="100vh">
        {displayMode === "timetable" ? (
          <Timetable
            timetable={timetable}
            enrolledCourses={enrolledCourses}
            courseController={{
              toggleIsEnrolled,
              deleteCourse,
            }}
            weekdays={weekdays}
          />
        ) : (
          <Navbar
            courses={coursesInSelectedTerm}
            courseController={{
              toggleIsEnrolled,
              addCourse,
              deleteCourse,
            }}
          />
        )}
      </AppShell.Main>
      <AppShell.Footer
        withBorder={false}
        hiddenFrom="sm"
        h="60px"
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
            {displayMode === "list" ? <IconCalendar /> : <IconList />}
          </Button>
        </Flex>
      </AppShell.Footer>
      {/* <SpotlightSearch /> */}
    </AppShell>
  );
}
