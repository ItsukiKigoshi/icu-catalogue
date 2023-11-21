"use client";
import React from "react";
import { HeaderSimple } from "../../components/HeaderSimple/HeaderSimple";
import { Timetable } from "@/components/Timetable/Timetable";
import { Grid } from "@mantine/core";
import { NavbarSearch } from "@/components/NavbarSearch/NavbarSearch";
import RequirementTable from "@/components/RequirementTable/RequirementTable";

export default function HomePage() {
  return (
    <div>
      <HeaderSimple />
      <Grid justify="flex-start" gutter="md" align="stretch" mx={7}>
        <Grid.Col span="content">
          <NavbarSearch />
        </Grid.Col>
        <Grid.Col span="auto">
          <Timetable />
        </Grid.Col>
        <Grid.Col span={2}>
          <RequirementTable />
        </Grid.Col>
      </Grid>
    </div>
  );
}
