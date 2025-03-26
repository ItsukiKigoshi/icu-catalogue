"use client";
import { Course } from "@/src/type/Types";
import { TimetableCell } from "../../stories/atoms";
import {
  Card,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ModalDetail from "../ModalDetail";

interface TimetableProps {
  timetableCells: TimetableCell[];
  enrolledCourses: Course[];
  courseController: {
    toggleIsEnrolled: (regno: number) => void;
    updateCourse: (course: Course) => void;
    deleteCourse: (regno: number) => void;
  };
  language: string;
  weekdays: string[];
}

export function Timetable({
  timetableCells,
  enrolledCourses,
  weekdays,
  courseController,
  language,
}: TimetableProps) {
  const [modalDetailOpened, { open: modalDetailOpen, close: modalDetailClose }] = 
    useDisclosure(false);
  const [modalDetailFocusedCourse, setModalDetailFocusedCourse] = useState<Course[]>([]);

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

  // timetableLookup
  const timetableLookup = timetableCells.reduce((acc, cell) => {
    const key = `${cell.period}/${cell.day}`;
    acc[key] = cell.courses;
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <Stack h="100%" gap="0">
      {/* head of the timetable */}
      <Grid gutter="0" align="stretch">
        <Grid.Col span={1}>
          <Card radius="0" withBorder p="4">
            <Stack align="center" justify="center" gap="0" h="100%">
              <Flex justify="center" align="center" gap="4px">
                <Text size="md" fw="bold">
                  {enrolledCourses.reduce((sum, course) => sum + (Number(course.unit) || 0), 0)}
                </Text>
                <Text size="xs" c="dimmed" visibleFrom="sm">
                  units
                </Text>
              </Flex>
            </Stack>
          </Card>
        </Grid.Col>
        {weekdays.map((day) => (
          <Grid.Col key={day} span={11 / weekdays.length}>
            <Card radius="0" withBorder p="4">
              <Stack align="center" justify="center" gap="0" h="100%">
                <Text size="md" fw="bold">
                  {day}
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* timetable body */}
      {Array(7).fill(0).map((_, i) => {
        const period = scheduleItems[i][1];
        return (
          <Grid key={period} gutter="0" align="stretch">
            <Grid.Col span={1}>
              <Card radius="0" withBorder h="100%" mih="12vh" p="4">
                <Stack align="center" justify="center" gap="0" h="100%">
                  <Text size="xs" c="dimmed">{scheduleItems[i][0]}</Text>
                  <Text size="md">{period}</Text>
                  <Text size="xs" c="dimmed">{scheduleItems[i][2]}</Text>
                </Stack>
              </Card>
            </Grid.Col>
            
            {weekdays.map((day) => {
              const cellKey = `${period}/${day}`;
              const courses = timetableLookup[cellKey] || [];
              
              return (
                <Grid.Col key={`${period}-${day}`} span={11 / weekdays.length}>
                  <Card radius="0" withBorder h="100%" mih="12vh" p="4px">
                    <UnstyledButton
                      onClick={() => {
                        setModalDetailFocusedCourse(courses);
                        modalDetailOpen();
                      }}
                      h="100%"
                      disabled={courses.length === 0}
                    >
                      <Stack justify="center">
                        {courses.map((course) => (
                          <Flex gap="4px" key={course.regno}>
                            <Divider
                              color={course.color}
                              size="md"
                              orientation="vertical"
                            />
                            <Stack h="100%" w="100%" gap="0">
                              <Text size="xs" fw={700} lineClamp={2}>
                                {language === "E" ? course.e : course.j} ({course.lang})
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={1}>
                                {course.room}
                              </Text>
                            </Stack>
                          </Flex>
                        ))}
                      </Stack>
                    </UnstyledButton>
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        );
      })}

      <ModalDetail
        courses={modalDetailFocusedCourse}
        modalDetailOpened={modalDetailOpened}
        modalDetailClose={modalDetailClose}
        courseController={courseController}
        language={language}
      />
    </Stack>
  );
}