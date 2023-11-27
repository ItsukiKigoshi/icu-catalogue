"use client";

import { Course } from "@/src/type/Course";
import { TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

type GetSearchResults = (results: Course[]) => void;

export default function SearchCourses({
  getSearchResults,
}: {
  getSearchResults: GetSearchResults;
}): JSX.Element {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/courses/search?query=${query}`);
    const course = await response.json();

    getSearchResults(course);
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Courses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form> */}

      {/* onSubmit can be replaced with onChange according to a load of API Server */}
      <form onSubmit={handleSubmit}>
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
