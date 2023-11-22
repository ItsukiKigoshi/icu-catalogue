"use client";
import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Text,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "./HeaderSimple.module.css";
import React from "react";
import cx from "clsx";
import { IconBrandGithub, IconMoon, IconSun } from "@tabler/icons-react";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function HeaderSimple(props: {
  opened: boolean | undefined;
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const [active, setActive] = useState(links[0].link);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  /*
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));
  */

  return (
    <header>
      <Container size="max" className={classes.inner}>
        <Group gap={5}>
          <Burger
            opened={props.opened}
            onClick={props.toggle}
            hiddenFrom="md"
            size="sm"
            mr={3}
          />
          <Text size="lg" fw={700}>
            ICU Catalogue
          </Text>
        </Group>
        <Group gap={5}>
          <ActionIcon
            component="a"
            href="https://github.com/ItsukiKigoshi/icu-catalogue"
            target="_blank"
            color="gray"
            variant="default"
            size="xl"
            aria-label="Open in a new tab"
          >
            <IconBrandGithub />
          </ActionIcon>
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
}
