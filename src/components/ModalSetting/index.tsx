import { Course } from "@/src/type/Types";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useColorScheme, useDisclosure } from "@mantine/hooks";
import {
  IconBrandGithub,
  IconDownload,
  IconFileImport,
  IconMoon,
  IconSend,
  IconSun,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm";
import { close } from "fs";

export default function ModalSetting(props: {
  modalSettingOpened: boolean;
  close: () => void;
  weekdays: string[];
  toggleSaturday: () => void;
  languageController: {
    language: string;
    setLanguage: (language: string) => void;
  };
  courses: Course[];
  setCourses: (courses: Course[]) => void;
}) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(useColorScheme(), {
    getInitialValueInEffect: true,
  });
  const [
    modalConfirmOpened,
    { open: modalConfirmOpen, close: modalConfirmClose },
  ] = useDisclosure(false);
  const [updatedCourses, setUpdatedCourses] = useState<Course[]>(props.courses);

  return (
    <Modal
      opened={props.modalSettingOpened}
      onClose={props.close}
      title="Settings"
      centered
    >
      <Stack gap="xl">
        <Group justify="space-between" wrap="nowrap" gap="xl">
          <Text fw="bold">Saturday</Text>
          <Checkbox
            checked={props.weekdays.length === 6}
            onChange={() => {
              props.toggleSaturday();
            }}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap" gap="xl">
          <Text fw="bold">Language</Text>
          <SegmentedControl
            data={["E", "J"]}
            fullWidth
            value={props.languageController.language}
            onChange={(value) => props.languageController.setLanguage(value)}
          />
        </Group>
        {/* <Group
        justify="space-between"
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP Core</Text>
        <Input data-autofocus placeholder='Enter Section (e.g."5A")' />
      </Group>
      <Group
        justify="space-between"
        wrap="nowrap"
        gap="xl"
      >
        <Text>ELA / JLP AS</Text>
        <Input placeholder='Enter Section (e.g."5AS1")' />
      </Group> */}
        <Group justify="space-between" wrap="nowrap" gap="xl">
          <Text fw="bold">Color</Text>
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
              {computedColorScheme === "dark" ? (
                <IconSun stroke={1.5} />
              ) : (
                <IconMoon stroke={1.5} />
              )}
            </Button>
            <Button
              onClick={() => setColorScheme("auto")}
              variant="default"
              size="sm"
            >
              System
            </Button>
          </Group>
        </Group>
        <Group justify="center" grow>
          <Button
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".json";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const courses = JSON.parse(e.target?.result as string);
                    setUpdatedCourses(courses);
                    modalConfirmOpen();
                  };
                  reader.readAsText(file);
                }
              };
            }}
            color="gray"
            leftSection={<IconFileImport />}
            variant="default"
          >
            Import JSON
            <ModalConfirm
              title="Import JSON"
              confirmLabel="Are you sure to replace courses?"
              onConfirm={() => {
                props.setCourses(updatedCourses);
                modalConfirmClose();
              }}
              close={modalConfirmClose}
              modalConfirmOpened={modalConfirmOpened}
            />
          </Button>
          <Button
            onClick={() => {
              const json = JSON.stringify(props.courses);
              const blob = new Blob([json], { type: "application/json" });
              saveAs(
                blob,
                `courses-${new Date().toISOString().slice(0, 10)}.json`
              );
            }}
            color="gray"
            leftSection={<IconDownload />}
            variant="default"
          >
            Download JSON
          </Button>
        </Group>
        <Group justify="center" grow>
          <Button
            leftSection={<IconBrandGithub />}
            component="a"
            href="https://github.com/ItsukiKigoshi/icu-catalogue"
            target="_blank"
            color="gray"
            variant="default"
            aria-label="Open in a new tab"
          >
            GitHub
          </Button>
          <Button
            leftSection={<IconSend />}
            component="a"
            href="https://forms.gle/FH3pNW84weKYuQ1H8"
            target="_blank"
            color="gray"
            variant="default"
            aria-label="Give us feedback!"
          >
            Feedback
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
