"use client";
import { TimetableItem } from "@/src/type/Types";
import { Card, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import classes from "./Timetable.module.css";

export function Timetable(props: { timetableData: TimetableItem[][] }) {
  const theme = useMantineTheme();

  const weekDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekDayItems = weekDays.map((day) => (
    <Card key={day} className={classes.item} style={{ height: "30px" }}>
      <Text size="lg" mt={3} fw={700}>
        {day}
      </Text>
    </Card>
  ));

  const timetableItems: JSX.Element[][] = [];

  for (let i = 0; i < props.timetableData.length; i++) {
    timetableItems[i] = props.timetableData[i].map((item) => (
      <Card key={item.no} className={classes.item} p={1}>
        <Text size="xs">{item.e}</Text>
      </Card>
    ));
  }

  type ScheduleItem = [string, number, string];
  const schedule: ScheduleItem[] = [
    ["8:50", 1, "10:00"],
    ["10:10", 2, "11:20"],
    ["11:30", 3, "12:40"],
    ["13:50", 4, "15:00"],
    ["15:10", 5, "16:20"],
    ["16:30", 6, "17:40"],
    ["17:50", 7, "19:00"],
  ];

  const timetable: JSX.Element[] = schedule.map((item) => (
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
      {timetableItems[item[1] - 1]}
    </>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs">
        <Card
          className={classes.item}
          style={{ backgroundColor: "transparent", height: "30px" }}
        ></Card>
        {weekDayItems}
        {timetable}
      </SimpleGrid>
    </Card>
  );
}
