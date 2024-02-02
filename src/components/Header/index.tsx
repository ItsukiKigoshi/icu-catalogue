import {
  ActionIcon,
  Container,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandGithub, IconSettings } from "@tabler/icons-react";

import ModalSetting from "../ModalSetting";

export function Header(props: {
  weekdays: string[];
  toggleSaturday: () => void;
  terms: { value: string; ay: string; season: string; label: string }[];
  selectedTermValue: string;
  setselectedTermValue: (value: string) => void;
}) {
  const [modalSettingOpened, { open, close }] = useDisclosure(false);

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
            Catalogue.icu
          </Text>
        </Group>
        <Group gap={5}>
          <NativeSelect
            value={props.selectedTermValue}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              props.setselectedTermValue(event.currentTarget.value)
            }
            data={props.terms}
          />
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
          <ModalSetting
            modalSettingOpened={modalSettingOpened}
            close={close}
            weekdays={props.weekdays}
            toggleSaturday={() => {
              props.toggleSaturday();
            }}
          />
        </Group>
      </Container>
    </header>
  );
}
