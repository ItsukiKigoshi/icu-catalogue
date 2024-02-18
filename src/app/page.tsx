"use client";
import { AppShell, Button, Flex, em } from "@mantine/core";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCalendar, IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import ModalSetting from "../components/ModalSetting";
import { Navbar } from "../components/Navbar";
import { Timetable } from "../components/Timetable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Course, Term } from "../type/Types";

export default function Page() {
  const [opened] = useDisclosure(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // This "weekdays" handler can be refactored by using useToggle hook
  const [weekdays, setWeekdays] = useLocalStorage<string[]>("weekdays", [
    "M",
    "TU",
    "W",
    "TH",
    "F",
  ]);
  const toggleSaturday = () => {
    const updatedWeekdays =
      weekdays.length === 5
        ? ["M", "TU", "W", "TH", "F", "SA"]
        : ["M", "TU", "W", "TH", "F"];
    setWeekdays(updatedWeekdays);
  };

  const terms: { group: string; items: Term[] }[] = [
    {
      group: "All",
      items: [{ label: "All", ay: "All", season: "All", value: "All" }],
    },
    {
      group: "2024",
      items: [
        { label: "2024S", ay: "2024", season: "Spring", value: "2024Spring" },
        { label: "2024A", ay: "2024", season: "Autumn", value: "2024Autumn" },
        { label: "2024W", ay: "2024", season: "Winter", value: "2024Winter" },
        { label: "2024 All", ay: "2024", season: "All", value: "2024All" },
      ],
    },
    {
      group: "2023",
      items: [
        { label: "2023S", ay: "2023", season: "Spring", value: "2023Spring" },
        { label: "2023A", ay: "2023", season: "Autumn", value: "2023Autumn" },
        { label: "2023W", ay: "2023", season: "Winter", value: "2023Winter" },
        { label: "2023 All", ay: "2023", season: "All", value: "2023All" },
      ],
    },
  ];
  const [selectedTermValue, setSelectedTermValue] = useState("2024Spring");
  const selectedTerm: Term | undefined = terms
    .map((term) => term.items)
    .flat()
    .find((term) => term.value === selectedTermValue);

  const [displayMode, toggleDisplayMode] = useToggle(["list", "timetable"]);
  useEffect(() => {
    if (!isMobile) {
      toggleDisplayMode("timetable");
    }
  }, [isMobile]);

  const [
    modalSettingOpened,
    { open: modalSettingOpen, close: modalSettingClose },
  ] = useDisclosure(false);

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
      color: "#e64980",
      isEnrolled: true,
      note: "",
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
      color: "#fd7e14",
      isEnrolled: true,
      note: "",
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
      color: "#40c057",
      isEnrolled: true,
      note: "",
      modified: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
    },
  ]);

  const timetable: { [key: string]: Course[] } = {};
  const coursesInSelectedTerm = courses.filter(
    (course) =>
      (selectedTerm?.season === "All" ||
        course.season === selectedTerm?.season) &&
      (selectedTerm?.ay === "All" || course.ay.toString() === selectedTerm?.ay)
  );

  const enrolledCoursesInSelectedTerm = coursesInSelectedTerm.filter(
    (course) => course.isEnrolled
  );

  enrolledCoursesInSelectedTerm.forEach((course) => {
    course.schedule?.forEach((entry) => {
      const [time, day] = entry.split("/");
      if (!timetable[`${time}/${day}`]) {
        timetable[`${time}/${day}`] = [];
      }
      timetable[`${time}/${day}`].push(course);
    });
  });

  // Toggle the isEnrolled property of a certain course
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
  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const addCourseAndMoveToTheTerm = (course: Course) => {
    addCourse(course);
    notifications.show({
      title: `Success!`,
      message: `${course.no} (${course.ay} ${course.season}) has been added!`,
      autoClose: 5000,
    });
    setSelectedTermValue(`${course.ay}${course.season}`);
  };

  // Update a certain course in the list "courses"
  // If the course is not in the list, add it
  const updateCourse = (course: Course) => {
    const courseIndex = courses.findIndex(
      (c: Course) => c.regno === course.regno
    );
    if (courseIndex !== -1) {
      setCourses(
        courses.map((c: Course, index: number) =>
          index === courseIndex ? course : c
        )
      );
    } else {
      addCourse(course);
    }
  };

  // Delete a certain course from the list "courses"
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
    >
      <AppShell.Header>
        <Header
          weekdays={weekdays}
          toggleSaturday={() => {
            toggleSaturday();
          }}
          terms={terms}
          selectedTermValue={selectedTermValue}
          setSelectedTermValue={setSelectedTermValue}
          modalSettingOpen={modalSettingOpen}
        />
        <ModalSetting
          modalSettingOpened={modalSettingOpened}
          close={modalSettingClose}
          weekdays={weekdays}
          toggleSaturday={() => {
            toggleSaturday();
          }}
          courses={courses}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar
          courses={coursesInSelectedTerm}
          courseController={{
            toggleIsEnrolled,
            addCourse: addCourseAndMoveToTheTerm,
            updateCourse,
            deleteCourse,
          }}
          selectedTerm={selectedTerm}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        {displayMode === "timetable" ? (
          <Timetable
            timetable={timetable}
            enrolledCourses={enrolledCoursesInSelectedTerm}
            courseController={{
              toggleIsEnrolled,
              updateCourse,
              deleteCourse,
            }}
            weekdays={weekdays}
          />
        ) : (
          <Navbar
            courses={coursesInSelectedTerm}
            courseController={{
              toggleIsEnrolled,
              addCourse: addCourseAndMoveToTheTerm,
              updateCourse,
              deleteCourse,
            }}
            selectedTerm={selectedTerm}
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
