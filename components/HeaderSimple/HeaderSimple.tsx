"use client";
import {
  Container,
  Group,
  Burger,
  Text,
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
  Modal,
  SegmentedControl,
  Card,
  Switch,
  NativeSelect,
  Divider,
  Input,
} from "@mantine/core";
import classes from "./HeaderSimple.module.css";
import React from "react";
import cx from "clsx";
import {
  IconBrandGithub,
  IconSettings,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export function HeaderSimple(props: {
  opened: boolean | undefined;
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [modalOpened, { open, close }] = useDisclosure(false);

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
            color="gray"
            variant="default"
            size="xl"
            aria-label="Settings"
            onClick={open}
          >
            <IconSettings />
          </ActionIcon>

          {/* Modal can be another component. */}
          <Modal opened={modalOpened} onClose={close} title="Settings" centered>
            <Group
              justify="space-between"
              className={classes.item}
              wrap="nowrap"
              gap="xl"
            >
              <Text>Term</Text>
              <NativeSelect
                data={[
                  "Not Specified",
                  "Spring 2023",
                  "Autumn 2023",
                  "Winter 2023",
                ]}
              />
            </Group>
            <Group
              justify="space-between"
              className={classes.item}
              wrap="nowrap"
              gap="xl"
            >
              <Text>ELA / JLP Core</Text>
              <Input placeholder='Enter Section (e.g."5A")' />
            </Group>
            <Group
              justify="space-between"
              className={classes.item}
              wrap="nowrap"
              gap="xl"
            >
              <Text>ELA / JLP AS</Text>
              <Input placeholder='Enter Section (e.g."5AS1")' />
            </Group>
            <Group
              justify="space-between"
              className={classes.item}
              wrap="nowrap"
              gap="xl"
            >
              <Text>Colour Scheme</Text>
              <ActionIcon
                onClick={() =>
                  setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                  )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                <IconSun
                  className={cx(classes.icon, classes.light)}
                  stroke={1.5}
                />
                <IconMoon
                  className={cx(classes.icon, classes.dark)}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          </Modal>
        </Group>
      </Container>
    </header>
  );
}
