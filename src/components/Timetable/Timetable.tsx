"use client";
import { Course } from "@/src/type/Types";
import { Card, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import classes from "./Timetable.module.css";

export function Timetable(props: { courses: Course[] }) {
  const theme = useMantineTheme();

  const weekDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekDayItems = weekDays.map((day) => (
    <Card key={day} className={classes.item} style={{ height: "30px" }}>
      <Text size="lg" mt={3} fw={700}>
        {day}
      </Text>
    </Card>
  ));

  type ScheduleItem = [string, number, string];
  const scheduleItems: ScheduleItem[] = [
    ["8:50", 1, "10:00"],
    ["10:10", 2, "11:20"],
    ["11:30", 3, "12:40"],
    ["13:50", 4, "15:00"],
    ["15:10", 5, "16:20"],
    ["16:30", 6, "17:40"],
    ["17:50", 7, "19:00"],
  ];

  const schedule: JSX.Element[] = scheduleItems.map((item) => (
    <>
      <Card key={item[2]} className={classes.item} p={1}>
        <Text size="xs" c="dimmed">
          {item[0]}
        </Text>
        <Text size="md" my="10">
          {item[1]}
        </Text>
        <Text size="xs" c="dimmed">
          {item[2]}
        </Text>
      </Card>
    </>
  ));

  const timetable: { [key: string]: Course[] } = {};

  const enrolledCourses = props.courses.filter((course) => course.isEnrolled);
  enrolledCourses.forEach((course) => {
    course.schedule?.forEach((entry) => {
      const [time, day] = entry.split("/");
      if (!timetable[`${time}/${day}`]) {
        timetable[`${time}/${day}`] = [];
      }
      timetable[`${time}/${day}`].push(course);
    });
  });

  return (
    <Card withBorder radius="md" className={classes.card}>
      <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs">
        <Card
          className={classes.item}
          style={{ backgroundColor: "transparent", height: "30px" }}
        ></Card>
        {weekDayItems}
        <Stack>{schedule}</Stack>

        <Stack>
          {Array(7)
            .fill(0)
            .map((_, i) => {
              return (
                <Card className={classes.item} p={1}>
                  {timetable[`${i + 1}/M`]?.map((course) => {
                    return (
                      <Text size="xs" c="dimmed">
                        {course.e}
                      </Text>
                    );
                  })}
                </Card>
              );
            })}
        </Stack>
      </SimpleGrid>
      {enrolledCourses.map((course) => (
        <p key={course.regno}>
          {course.e}: {course.schedule}
        </p>
      ))}
    </Card>
  );
}
