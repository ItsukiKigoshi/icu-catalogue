// src/app/page.tsx

"use client";
import {
  AppShell,
  Flex,
  em,
  Text,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useToggle } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Header } from "../../components/2025/Header";
import ModalSetting from "../../components/2025/ModalSetting";
import { Navbar } from "../../components/2025/Navbar";
import { Timetable } from "../../components/2025/Timetable";
import { useLocalStorage } from "../../hooks/classic-2024/useLocalStorage";
import { Course, Term } from "../../type/2025/Types";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconCoinYen,
  IconSend,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { selectedCoursesAtom, timetableAtom, TimetableCell } from "../../stories/atoms";
export default function Page() {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);
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
      group: "2023",
      items: [
        { label: "2023S", ay: "2023", season: "Spring", value: "2023Spring" },
        { label: "2023A", ay: "2023", season: "Autumn", value: "2023Autumn" },
        { label: "2023W", ay: "2023", season: "Winter", value: "2023Winter" },
      ],
    },
    {
      group: "2024",
      items: [
        { label: "2024S", ay: "2024", season: "Spring", value: "2024Spring" },
        { label: "2024A", ay: "2024", season: "Autumn", value: "2024Autumn" },
        { label: "2024W", ay: "2024", season: "Winter", value: "2024Winter" },
      ],
    },
    {
      group: "2025",
      items: [
        { label: "2025S", ay: "2025", season: "Spring", value: "2025Spring" },
        { label: "2025A", ay: "2025", season: "Autumn", value: "2025Autumn" },
        { label: "2025W", ay: "2025", season: "Winter", value: "2025Winter" },
      ],
    },
    {
      group: "2026",
      items: [
        { label: "2026S", ay: "2026", season: "Spring", value: "2026Spring" },
        { label: "2026A", ay: "2026", season: "Autumn", value: "2026Autumn" },
        { label: "2026W", ay: "2026", season: "Winter", value: "2026Winter" },
      ],
    },
  ];
  const [selectedTermValue, setSelectedTermValue] = useState("2025Spring");
  const selectedTerm = terms
    .flatMap(term => term.items)
    .find(term => term.value === selectedTermValue);

  const [language, setLanguage] = useLocalStorage<string>("language", "E");

  const [
    modalSettingOpened,
    { open: modalSettingOpen, close: modalSettingClose },
  ] = useDisclosure(false);

  // Get the list of courses from the local storage
/*   const [courses, setCourses] = useLocalStorage<Course[]>("courses", [
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
  ]); */
/*  */
  // const timetable: { [key: string]: Course[] } = {};
  const [selectedCourses, setSelectedCourses] = useAtom(selectedCoursesAtom);
  const [timetableCells] = useAtom(timetableAtom);

  const coursesInSelectedTerm = selectedCourses.filter(
    (course) =>
      course.season === selectedTerm?.season &&
      course.ay.toString() === selectedTerm?.ay
  );
  useEffect(() => {
    console.log("coursesInSelectedTerm:", coursesInSelectedTerm);
  }, [coursesInSelectedTerm]);
  

  /* const enrolledCoursesInSelectedTerm = coursesInSelectedTerm.filter(
    (course) => course.isEnrolled
  );

  enrolledCoursesInSelectedTerm.forEach((course) => {
    const scheduleEntries = Array.isArray(course.schedule) ? course.schedule : [];
    scheduleEntries.forEach((entry) => {
      const [time, day] = entry.split("/");
      if (!timetable[`${time}/${day}`]) {
        timetable[`${time}/${day}`] = [];
      }
      timetable[`${time}/${day}`].push(course);
    });
  }); */
  
  // Toggle the isEnrolled property of a certain course
  /* const toggleIsEnrolled = (regno: number) => {
    setCourses(
      courses.map((course: Course) => {
        if (course.regno === regno) {
          return { ...course, isEnrolled: !course.isEnrolled };
        } else {
          return course;
        }
      })
    );
  }; */
  const toggleIsEnrolled = (regno: number) => {
    setSelectedCourses(prev => 
      prev.map(course => 
        course.regno === regno ? { ...course, isEnrolled: !course.isEnrolled } : course
      )
    );
  };

  // Add a course to the list "courses"
 /*  const addCourse = (course: Course) => {
    setSelectedCourses(prev => [...prev, course]);
  };

  const addCourseAndMoveToTheTerm = (course: Course) => {
    addCourse(course);
    notifications.show({
      title: `Success!`,
      message: `${course.no} (${course.ay} ${course.season}) has been added!`,
      autoClose: 5000,
    });
    setSelectedTermValue(`${course.ay}${course.season}`);
  }; */

  // Update a certain course in the list "courses"
  // If the course is not in the list, add it
  const updateCourse = (course: Course) => {
    setSelectedCourses(prev => {
      const index = prev.findIndex(c => c.regno === course.regno);
      return index !== -1
        ? prev.map((c, i) => i === index ? course : c)
        : [...prev, course];
    });
  };
  
  // Delete a certain course from the list "courses"
  const deleteCourse = (regno: number) => {
    setSelectedCourses(prev => prev.filter(course => course.regno !== regno));
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "400px",
        breakpoint: "sm",
        collapsed: { mobile: !navbarOpened },
      }}
    >
      <AppShell.Header>
        <Header
          navbarOpened={navbarOpened}
          toggleNavbar={() => {
            toggleNavbar();
          }}
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
          languageController={{
            language,
            setLanguage,
          }}
          courses={selectedCourses}
          setCourses={setSelectedCourses}
        />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar
          courses={coursesInSelectedTerm}
          courseController={{
            toggleIsEnrolled,
            // addCourse: addCourseAndMoveToTheTerm,
            updateCourse,
            deleteCourse,
          }}
          language={language}
          selectedTerm={selectedTerm}
        />
      </AppShell.Navbar>
      <AppShell.Main>
        <Timetable
          // timetableCells={timetableCells}
          enrolledCourses={coursesInSelectedTerm.filter(course => course.isEnrolled)}
          courseController={{
            toggleIsEnrolled,
            updateCourse,
            deleteCourse,
          }}
          language={language}
          weekdays={weekdays}
        />
      </AppShell.Main>
      {/* <AppShell.Footer
        withBorder={false}
        h="60px"
        style={{ background: "rgba(0,0,0,0)" }}
      >
     
      </AppShell.Footer> */}
    </AppShell>
  );
}