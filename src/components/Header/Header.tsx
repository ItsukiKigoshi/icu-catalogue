import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Group,
  Input,
  Modal,
  NativeSelect,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useColorScheme, useDisclosure } from "@mantine/hooks";
import {
  IconBrandGithub,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";

import cx from "clsx";
import React from "react";

import classes from "./Header.module.css";

export function Header(props: {
  opened: boolean | undefined;
  toggle: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme(useColorScheme(), {
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
              <Input data-autofocus placeholder='Enter Section (e.g."5A")' />
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
              <Group>
                <Button
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === "light" ? "dark" : "light"
                    )
                  }
                  variant="default"
                  size="sm"
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
                </Button>
                <Button
                  onClick={() => setColorScheme("auto")}
                  variant="default"
                  size="sm"
                >
                  Reset
                </Button>
              </Group>
            </Group>
          </Modal>
        </Group>
      </Container>
    </header>
  );
}
