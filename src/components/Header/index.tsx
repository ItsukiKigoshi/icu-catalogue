import {
  ActionIcon,
  ComboboxData,
  Container,
  Group,
  NativeSelect,
  Text,
} from "@mantine/core";
import { IconSend, IconSettings } from "@tabler/icons-react";

export function Header(props: {
  weekdays: string[];
  toggleSaturday: () => void;
  terms: ComboboxData;
  selectedTermValue: string;
  setselectedTermValue: (value: string) => void;
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
          <Text size="lg" fw={700}>
            ICU Catalogue
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
            href="https://forms.gle/FH3pNW84weKYuQ1H8"
            target="_blank"
            color="gray"
            variant="default"
            size="xl"
            aria-label="Give us feedback!"
          >
            <IconSend />
          </ActionIcon>
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
