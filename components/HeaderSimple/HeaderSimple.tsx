"use client";
import { useState } from "react";
import { Container, Group, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderSimple.module.css";
import React from "react";
import { NavbarSearch } from "../NavbarSearch/NavbarSearch";

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
      </Container>
    </header>
  );
}
