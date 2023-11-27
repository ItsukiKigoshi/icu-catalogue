"use client";

import { Course } from "@/src/type/Course";
import { TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type GetSearchResults = (results: Course[]) => void;
type GetCurrentQuery = (query: string) => void;

export default function SearchCourses({
  getSearchResults,
  getCurrentQuery,
}: {
  getSearchResults: GetSearchResults;
  getCurrentQuery: GetCurrentQuery;
}): JSX.Element {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/courses/search?query=${query}`);
    const course = await response.json();

    getCurrentQuery(query);
    getSearchResults(course);
  };

  return (
    <div>
      {/* onChange can be replaced with onSubmit according to a load of API Server */}
      <form onChange={handleSubmit}>
        <TextInput
          placeholder="Search Courses"
          size="xs"
          leftSection={
            <IconSearch
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          }
          styles={{ section: { pointerEvents: "none" } }}
          mb="sm"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
