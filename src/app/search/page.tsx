"use client";
import { DevServerCourse } from "@/src/type/Types";
import {
  ActionIcon,
  AppShell,
  Card,
  Divider,
  Flex,
  Grid,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconChevronLeft,
  IconPlaylistAdd,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { theme } from "../theme";

export default function page() {
  const form = useForm({
    initialValues: {
      query: "",
    },
  });
  const [term, setTerm] = useState("*");

  const [courses, setCourses] = useState<DevServerCourse[]>([]);
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

  const results = courses.map((course) => (
    <Card p={0}>
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
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="sm"
      h="100vh"
      w="100vw"
    >
      <AppShell.Main>
        <ScrollArea>
          <Stack px="sm">{results}</Stack>
        </ScrollArea>
      </AppShell.Main>
      <AppShell.Footer
        withBorder={false}
        style={{ background: "rgba(0,0,0,0)" }}
      >
        <Flex justify="center" align="center" gap="md">
          <ActionIcon
            variant="filled"
            aria-label="Go back"
            size="xl"
            component={Link}
            href="/"
          >
            <IconChevronLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
          <form
            onSubmit={form.onSubmit((values) =>
              searchCourse(values.query, term)
            )}
          >
            <TextInput
              radius="xl"
              size="lg"
              autoFocus
              placeholder="Search courses"
              rightSectionWidth={42}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  color={theme.primaryColor}
                  variant="filled"
                  type="submit"
                >
                  <IconSearch
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                  />
                </ActionIcon>
              }
              {...form.getInputProps("query")}
            />
          </form>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
}
