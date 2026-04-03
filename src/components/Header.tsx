import {
  ActionIcon,
  Badge,
  Burger,
  ComboboxData,
  Container,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import { IconSettings, IconExternalLink } from "@tabler/icons-react";
import Image from 'next/image';
import React from "react";

export function Header(props: {
  navbarOpened: boolean;
  toggleNavbar: () => void;
  weekdays: string[];
  toggleSaturday: () => void;
  terms: ComboboxData;
  selectedTermValue: string;
  setSelectedTermValue: (value: string) => void;
  modalSettingOpen: () => void;
}) {
  return (
    <header>
      <Container
        size="max"
        style={{
          height: "56px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Group gap={5}>
          <Burger
              opened={props.navbarOpened}
              onClick={props.toggleNavbar}
              hiddenFrom="sm"
              size="sm"
          />
          <Image
              src="/icon-72x72.png"
              alt="Logo"
              width={40}
              height={40}
              style={{ display: 'block' }}
          />
          <Text size="lg" visibleFrom="sm" fw={700}>
            ICU Catalogue
          </Text>
          <Badge
              color="orange"
              variant="light"
              size="lg"
              component="a"
              target="_blank"
              href="https://timetable.icu"
              leftSection={
                <Image
                    src="/timetableicuicon.svg"
                    alt="Logo for New App"
                    width={14}
                    height={14}
                    style={{ display: 'block' }}
                />
              }
              rightSection={<IconExternalLink size={12} />}
              style={{ cursor: 'pointer' }}
              styles={{
                root: {
                  '&:hover': { opacity: 0.8, textDecoration: 'none' },
                },
              }}
          >
            <Text component="span" visibleFrom="sm" size="inherit">
              New App Available!
            </Text>
          </Badge>
        </Group>
        <Group gap={5}>
          <NativeSelect
            value={props.selectedTermValue}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              props.setSelectedTermValue(event.currentTarget.value)
            }
            data={props.terms}
          />
        </Group>
        <Group gap={5}>
          <ActionIcon
            color="gray"
            variant="default"
            size="xl"
            aria-label="Settings"
            onClick={props.modalSettingOpen}
          >
            <IconSettings />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
}
