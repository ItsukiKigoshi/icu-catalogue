import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Grid,
  Group,
  HoverCard,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { IconPlus, IconQuestionMark } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function AddCourse(props: {
  addCourse: (course: Course) => void;
  courses: Course[];
}) {
  const [query, setQuery] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // Set the error message to empty when the query is empty
  useEffect(() => {
    if (query === "") {
      setErrorMessage("");
    }
  }, [query]);

  function parseCourseInfo(str: string): Course | undefined {
    // replace "(" or "<" with "," in front of the schedule, and remove ")" and ">" after schedule
    const modifiedStr = str
      .replace(/\((\d\/)/g, "$1")
      .replace(/(M|TU|W|TH|F|SA)>/g, "$1")
      .replace(/(M|TU|W|TH|F|SA)\)/g, "$1")
      .replace(/,\(/g, ",")
      .replace(/,<\)/g, ",")
      .replace(/ or /g, ",")
      .replace(/</g, ",")

      // remove "*", which means "ignoring Super 4"
      .replace(/\*/g, "");

    // Debug Console
    // console.log(`modifiedStr: ${modifiedStr}`);

    const regex =
      /(\d+)\s(\w+)\s(\d+)\s(\[change\]\s(\d{4}\/\d{2}\/\d{2})\s)?(\s)?(\w+)\s?([JEO])?(\s\w{1})?\s(.+?)?\s\s(.+?)\s(\d\/[A-Z]+(,\d\/[A-Z]+)*)\s((.+?))?\s?(\((\d+)\))?\s(Online|(Face to Face))?(.+?)\s?(.+?)\s(\d+(\/\d+)*)/;

    const match = modifiedStr.match(regex);

    //Debug Console
    // if (match) {
    //   for (let i = 0; i < match?.length; i++) {
    //     console.log(`${i}: ${match[i]}`);
    //   }
    // }

    if (match) {
      setErrorMessage("");
      const schedule = match[12]
        .replace(/[<>()]/g, "")
        .split(/,|\sor\s/)
        .map((s) => s.trim())
        .filter((s) => s.match(/\d\/[A-Z]+/));

      let inputUnit: string = match[22];
      let unit: number;

      // Convert "1/3" to 0.3 if the unit is 1/3
      if (inputUnit === "1/3") {
        unit = 0.3;
      } else {
        unit = parseInt(inputUnit);
      }

      const course: Course = {
        regno: parseInt(match[1]),
        season: match[2],
        ay: parseInt(match[3]),
        no: match[7],
        lang: match[8],
        e: match[10],
        j: match[11],
        schedule: schedule,
        instructor: match[20],
        unit: unit,
        modified: new Date(),
        isEnrolled: true, // Default value, update as needed
        color: "#000000", // Default value, update as needed
      };

      return course;
    } else if (query !== "") {
      setErrorMessage(`The string does not match the expected format.`);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(query);
    const course = parseCourseInfo(query);

    // Check if the course is already in the list
    function isAlreadyInList(course: Course): boolean {
      let isAlreadyInList = false;
      props.courses.forEach((c) => {
        if (c.regno === course.regno) {
          isAlreadyInList = true;
        }
      });
      return isAlreadyInList;
    }

    if (course !== undefined) {
      if (isAlreadyInList(course)) {
        setErrorMessage(`Already in the List! regno:${course.regno}`);
      } else {
        props.addCourse(course);
        setQuery("");
      }
    }
  };

  return (
    <Grid p="xs">
      <Grid.Col span="auto">
        <form onSubmit={handleSubmit}>
          <TextInput
            m="0"
            placeholder="Add Course"
            w="100%"
            leftSection={
              <IconPlus
                style={{ width: rem(12), height: rem(12) }}
                stroke={1.5}
              />
            }
            styles={{ section: { pointerEvents: "none" } }}
            value={query}
            error={errorMessage}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </form>
      </Grid.Col>
      <Grid.Col span="content">
        <Group justify="center">
          <HoverCard>
            <HoverCard.Target>
              <ActionIcon
                color="gray"
                size="lg"
                component="a"
                href="https://github.com/ItsukiKigoshi/icu-catalogue/releases/tag/v0.0.0"
                target="_blank"
              >
                <IconQuestionMark />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text>Copy & Paste from Course Offerings!</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
