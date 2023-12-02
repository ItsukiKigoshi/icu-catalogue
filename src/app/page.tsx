"use client";
import { AppShell, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Navbar } from "../components/Navbar/Navbar";
import RequirementTable from "../components/RequirementTable/RequirementTable";
import { Timetable } from "../components/Timetable/Timetable";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);

  const [courses, setCourses] = useState([
    {
      regno: 1,
      season: "Spring",
      ay: "2022",
      no: "CS101",
      lang: "English",
      e: "Introduction to Computer Science",
      j: "コンピュータサイエンス入門",
      instructor: "John Doe",
      schedule: ["3/M", "3/W", "3/F"],
      unit: "3",
      isEnrolled: false,
    },
    {
      regno: 2,
      season: "Autumn",
      ay: "2022",
      no: "MTH201",
      lang: "English",
      e: "Calculus",
      j: "微積分学",
      instructor: "Jane Smith",
      schedule: ["3/M", "2/TH", "3/TH"],
      unit: "4",
      isEnrolled: false,
    },
    {
      regno: 3,
      season: "Summer",
      ay: "2022",
      no: "PHYS301",
      lang: "English",
      e: "Physics",
      j: "物理学",
      instructor: "David Johnson",
      schedule: ["4/M", "4/W", "4/F"],
      unit: "3",
      isEnrolled: false,
    },
  ]);

  const toggleIsEnrolled = (regno: number) => {
    return () => {
      setCourses(
        courses.map((course) => {
          if (course.regno === regno) {
            return { ...course, isEnrolled: !course.isEnrolled };
          } else {
            return course;
          }
        })
      );
    };
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "300px",
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      h="100vh"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar courses={courses} toggleIsEnrolled={toggleIsEnrolled} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Grid justify="flex-start" gutter="md" align="stretch">
          <Grid.Col span={{ base: "auto" }}>
            <Timetable courses={courses} />
          </Grid.Col>
          <Grid.Col mt={{ base: 5, md: 0 }} span={{ base: 12, md: "content" }}>
            <RequirementTable />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
