import { ActionIcon, Burger, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub, IconSettings } from "@tabler/icons-react";

import React from "react";

import ModalSetting from "../ModalSetting/ModalSetting";
import classes from "./Header.module.css";

export function Header(props: {
  opened: boolean;
  toggle: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [modalOpened, { open, close }] = useDisclosure(false);
  return (
    <header>
      <Container size="max" className={classes.inner}>
        <Group gap={5}>
          <Burger
            opened={props.opened}
            onClick={props.toggle}
            hiddenFrom="sm"
            size="sm"
            mr={3}
          />
          <Text size="lg" fw={700}>
            ICU Catalogue (Preview)
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
            color="gray"
            variant="default"
            size="xl"
            aria-label="Settings"
            onClick={open}
          >
            <IconSettings />
          </ActionIcon>
          <ModalSetting modalOpened={modalOpened} close={close} />
        </Group>
      </Container>
    </header>
  );
}
