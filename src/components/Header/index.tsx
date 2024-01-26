import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub, IconSettings } from "@tabler/icons-react";

import ModalSetting from "../ModalSetting";

export function Header() {
  const [modalOpened, { open, close }] = useDisclosure(false);
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
          <ModalSetting modalOpened={modalOpened} close={close} />
        </Group>
      </Container>
    </header>
  );
}
