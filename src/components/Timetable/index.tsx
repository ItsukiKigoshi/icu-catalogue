"use client";
import { Course } from "@/src/type/Types";
// import { TimetableCell } from "../../stories/atoms";
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
  // timetableCells: TimetableCell[];
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
  // timetableCells,
  enrolledCourses,
  weekdays,
  courseController,
  language,
}: TimetableProps) {
  const [modalDetailOpened, { open: modalDetailOpen, close: modalDetailClose }] = 
    useDisclosure(false);
  const [modalDetailFocusedCourse, setModalDetailFocusedCourse] = useState<Course[]>([]);

  type ScheduleItem = [string, number, string, boolean];
  const scheduleItems: ScheduleItem[] = [
    ["8:45", 1, "10:00", false],
    ["10:10", 2, "11:25", false],
    ["11:35", 3, "12:50", false],
    ["14:00", 4, "15:15", false], 
    ["13:20", 4, "15:15", true], 
    ["15:25", 5, "16:40", false], 
    ["15:25", 5, "17:20", true], 
    ["16:50", 6, "18:05", false],
    ["18:15", 7, "19:30", true], 
    ["18:15", 7, "20:10", false], 
  ];

  // timetableLookup
  const timetableLookup = enrolledCourses.reduce((acc, course) => {
    course.schedule.forEach(schedule => {
      const key = `${schedule.period}/${schedule.day}/${schedule.isSuper ? "super" : "normal"}`; // 增加 isSuper 判断
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(course);
    });
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
      {/* {Array(7).fill(0).map((_, i) => { 
        const period = scheduleItems[i][1]; */}
      {scheduleItems.map(([start, period, end, isSuper], i) => {
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
              const cellKey = `${period}/${day}/${isSuper ? "super" : "normal"}`;
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
                              {isSuper && (
                                <Text size="xs" c="red" lineClamp={2}>
                                  {scheduleItems[i][0]} {scheduleItems[i][2]}
                                  </Text>
                              )}
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