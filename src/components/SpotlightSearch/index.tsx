"use client";
import { DevServerCourse } from "@/src/type/Types";
import {
  ActionIcon,
  Card,
  Divider,
  Grid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Spotlight } from "@mantine/spotlight";
import {
  IconExternalLink,
  IconPlaylistAdd,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function page() {
  const form = useForm({
    initialValues: {
      query: "",
    },
  });
  const [term, setTerm] = useState("*");

  const [courses, setCourses] = useState<DevServerCourse[]>([]);

  const [query, setQuery] = useState("");
  const searchCourse = (query: string, term: string) => {
    // Should be rewritten to use the API
    const url = `https://devserver.icu/api/v3/search?q=${query}&term=${term}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
        return data;
      });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchCourse(query, term);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, term]);

  const results = courses.map((course) => (
    <Spotlight.Action closeSpotlightOnTrigger={false}>
      <Card p="0" m="xs">
        <Grid>
          <Grid.Col span="auto">
            <UnstyledButton key={course.regno} w="100%" p="md">
              <Text fw={500}>{course.title_e}</Text>
              <Text size="sm" c="dimmed" lineClamp={2}>
                {course.summary_e}
              </Text>
            </UnstyledButton>
          </Grid.Col>
          <Divider orientation="vertical" my="md" mx={0} />
          <Grid.Col span="content" p="md">
            <Stack align="center" justify="center" h="100%">
              <ActionIcon size="md" color="gray">
                <IconPlaylistAdd />
              </ActionIcon>
              {/* TODO - Change Academic Year and Term */}
              <ActionIcon
                size="md"
                color="gray"
                component="a"
                href={`https://campus.icu.ac.jp/public/ehandbook/PreviewSyllabus.aspx?regno=${course.regno}&year=2023&term=2`}
                target="_blank"
              >
                <IconExternalLink />
              </ActionIcon>
            </Stack>
          </Grid.Col>
        </Grid>
      </Card>
    </Spotlight.Action>
  ));

  return (
    <Spotlight.Root onQueryChange={setQuery} scrollable>
      <Spotlight.Search
        placeholder="Search Syllabus"
        leftSection={<IconSearch stroke={1.5} />}
      />
      <Spotlight.ActionsList>
        {results.length > 0 ? (
          results
        ) : (
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        )}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
}
