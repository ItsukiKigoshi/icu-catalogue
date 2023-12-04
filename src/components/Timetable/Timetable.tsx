"use client";
import { Course } from "@/src/type/Types";
import { Card, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core";
import classes from "./Timetable.module.css";

export function Timetable(props: { courses: Course[] }) {
  const theme = useMantineTheme();

  const weekDays: string[] = ["M", "TU", "W", "TH", "F", "SA"];
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
      <SimpleGrid cols={7} spacing="xs" verticalSpacing="xs">
        {/* Empty Card */}
        <Card
          className={classes.item}
          style={{ backgroundColor: "transparent", height: "30px" }}
        >
          <Text size="md" fw="bold">
            Sum:
            {enrolledCourses.reduce((sum, course) => sum + course.unit, 0)}
          </Text>
        </Card>

        {/* Card for weekdays */}
        {weekDayItems}

        {/*  Show time (1st Period ~ 7th Period) */}
        <Stack>{schedule}</Stack>

        {/* Show timetable for all weekdays */}
        {weekDays.map((day) => {
          return (
            // Set timetable column for each day (M,TU,W,TH,F)
            <Stack key={day}>
              {Array(7)
                .fill(0)
                .map((_, i) => {
                  return (
                    <Card key={i} className={classes.item} p={1}>
                      {timetable[`${i + 1}/${day}`]?.map((course) => {
                        return (
                          <Text key={course.regno} size="xs" fw="bold">
                            {course.e}
                          </Text>
                        );
                      })}
                    </Card>
                  );
                })}
            </Stack>
          );
        })}
      </SimpleGrid>
    </Card>
  );
}
