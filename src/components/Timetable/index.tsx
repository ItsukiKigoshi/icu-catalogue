"use client";
import { Course } from "@/src/type/Types";
import { Card, Flex, Grid, Stack, Text } from "@mantine/core";

export function Timetable(props: { courses: Course[] }) {
  const weekDays: string[] = ["M", "TU", "W", "TH", "F", "SA"];

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
    <Stack h="100%" gap="0">
      <Grid gutter="0" align="stretch">
        <Grid.Col span={1.5}>
          <Card radius="0" withBorder p="4">
            <Stack align="center" justify="center" gap="0" h="100%">
              <Flex justify="center" align="center" gap="4px">
                <Text size="md" fw="bold">
                  {enrolledCourses.reduce(
                    (sum, course) => sum + course.unit,
                    0
                  )}
                </Text>
                <Text size="xs" c="dimmed">
                  units
                </Text>
              </Flex>
            </Stack>
          </Card>
        </Grid.Col>
        {weekDays.map((day) => {
          return (
            <Grid.Col span={1.75}>
              <Card radius="0" withBorder p="4">
                <Stack align="center" justify="center" gap="0" h="100%">
                  <Text size="md" fw="bold">
                    {day}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      {Array(7)
        .fill(0)
        .map((_, i) => {
          return (
            <Grid key={scheduleItems[i][1]} gutter="0" align="stretch">
              <Grid.Col span={1.5}>
                <Card radius="0" withBorder h="100%" p="4">
                  <Stack align="center" justify="center" gap="0" h="100%">
                    <Text size="xs" c="dimmed">
                      {scheduleItems[i][0]}
                    </Text>
                    <Text size="md">{scheduleItems[i][1]}</Text>
                    <Text size="xs" c="dimmed">
                      {scheduleItems[i][2]}
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
              {weekDays.map((day) => {
                return (
                  <Grid.Col span={1.75}>
                    <Card radius="0" withBorder h="100%" p="4">
                      <Stack
                        align="center"
                        justify="flex-start"
                        gap="0"
                        h="100%"
                      >
                        {timetable[`${scheduleItems[i][1]}/${day}`]?.map(
                          (course) => (
                            <Text size="sm" fw="750" lineClamp={2}>
                              {course.e}
                            </Text>
                          )
                        )}
                      </Stack>
                    </Card>
                  </Grid.Col>
                );
              })}
            </Grid>
          );
        })}
    </Stack>
  );
}
