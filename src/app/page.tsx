"use client"; // Mantine only works with "use client"
import React from "react";
import { AppShell, Button, Container, Text } from "@mantine/core";

export default function Page() {
  return (
    <AppShell header={{ height: 56 }} navbar={{ width: 200, breakpoint: "sm" }}>
      <AppShell.Header>
        <Container
          size="max"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "56px",
          }}
        >
          <Text size="lg" fw={700}>
            ICU Catalogue
          </Text>
          <Button component="a" href="/classic-2024" variant="default">
            Go to Classic
          </Button>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar visibleFrom={"sm"}>Navbar</AppShell.Navbar>
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}
