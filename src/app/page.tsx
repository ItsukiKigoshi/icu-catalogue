"use client";
import { AppShell, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "../components/Header/Header";
import { NavbarSearch } from "../components/NavbarSearch/NavbarSearch";
import RequirementTable from "../components/RequirementTable/RequirementTable";
import { Timetable } from "../components/Timetable/Timetable";

export default function Page() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "300px",
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      h="100vh"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSearch />
      </AppShell.Navbar>
      <AppShell.Main>
        <Grid justify="flex-start" gutter="md" align="stretch">
          <Grid.Col span={{ base: "auto" }}>
            <Timetable />
          </Grid.Col>
          <Grid.Col mt={{ base: 5, md: 0 }} span={{ base: 12, md: "content" }}>
            <RequirementTable />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
