"use client";
import { Header } from "@/src/components/Header/Header";
import { NavbarSearch } from "@/src/components/NavbarSearch/NavbarSearch";
import RequirementTable from "@/src/components/RequirementTable/RequirementTable";
import { Timetable } from "@/src/components/Timetable/Timetable";
import { AppShell, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
