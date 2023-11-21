"use client";
import React from "react";
import { HeaderSimple } from "../../components/HeaderSimple/HeaderSimple";
import { Timetable } from "@/components/Timetable/Timetable";
import { AppShell, Grid } from "@mantine/core";
import { NavbarSearch } from "@/components/NavbarSearch/NavbarSearch";
import RequirementTable from "@/components/RequirementTable/RequirementTable";
import { useDisclosure } from "@mantine/hooks";

export default function HomePage() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: "300px",
          breakpoint: "md",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <HeaderSimple opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar>
          <NavbarSearch />
        </AppShell.Navbar>
        <AppShell.Main>
          <Grid justify="flex-start" gutter="md" align="stretch" mx={7}>
            <Grid.Col span={{ base: "auto" }}>
              <Timetable />
            </Grid.Col>
            <Grid.Col mt={{ base: 5, md: 0 }} span={{ base: 12, md: 2 }}>
              <RequirementTable />
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
