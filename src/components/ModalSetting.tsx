import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Alert,
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
  IconBrandDiscord,
  IconBrandGithub,
  IconCoinYen,
  IconDownload,
  IconFileImport,
  IconInfoCircle,
  IconMoon,
  IconSend,
  IconSun,
} from "@tabler/icons-react";
import { saveAs } from "file-saver";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";

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
        <Group justify="center">
          <Alert
            variant="light"
            color="red"
            title="We are Moving!"
            icon={<IconInfoCircle />}
          >
            {props.languageController.language == 'J' ? (
                <section>
                  <p>いつもICU Catalogueをご利用いただきありがとうございます！
                    私たちは，ICU Catalogueでみなさまから頂いたフィードバックをもとにまったく新しいアプリ:
                    <a href="https://timetable.icu/">ICUのじかんわり</a>をつくりました．</p>
                  <ul>
                    <li>コース一覧を検索</li>
                    <li>Long4-7を含めた時間割表示</li>
                    <li>ログインして同期</li>
                  </ul>
                 <p>などができます．ぜひ新しいアプリをお試しください．
                ところで，ICU Catalogueの管理は最低限にとどまりますが，今後も提供は続けます．
                これからもどうぞよろしくお願いします．開発者代表: 木越斎(itsuki@timetable.icu)
                 </p>
                </section>
              ) : (
                <p> We are moving a developing resource to a whole new application <a href="https://timetable.icu/">Timetable.icu</a>!
                  In the new app, you can search from course data and sync across devices.
                  However, there is no plan to close this app. Thanks for using ICU Catalogue.
                Lead Developer: Itsuki Kigoshi(itsuki@timetable.icu)</p>
              )}
          </Alert>
        </Group>
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
          <Text fw="bold">Course Title Language</Text>
          <SegmentedControl
            data={["E", "J"]}
            fullWidth
            value={props.languageController.language}
            onChange={(value) => props.languageController.setLanguage(value)}
          />
        </Group>
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
              input.click();
            }}
            color="gray"
            leftSection={<IconFileImport />}
            variant="default"
          >
            Import JSON
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
          <Group justify="center">
            <ActionIcon
              component="a"
              href="https://github.com/ItsukiKigoshi/icu-catalogue"
              target="_blank"
              color="gray"
              variant="default"
              size="lg"
              aria-label="GitHub"
            >
              <IconBrandGithub />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://discord.gg/2gmKTs4ezk"
              target="_blank"
              color="gray"
              variant="default"
              size="lg"
              aria-label="Discord"
            >
              <IconBrandDiscord />
            </ActionIcon>
            <ActionIcon
              component="a"
              href="https://opencollective.com/icu-catalogue"
              target="_blank"
              color="gray"
              variant="default"
              size="lg"
              aria-label="Open Collective"
            >
              <IconCoinYen />
            </ActionIcon>
          </Group>
        </Group>
        <ModalConfirm
          title="Are you sure to replace courses?"
          confirmLabel="Yes, Replace"
          onConfirm={() => {
            props.setCourses(updatedCourses);
            modalConfirmClose();
          }}
          close={modalConfirmClose}
          modalConfirmOpened={modalConfirmOpened}
        />
      </Stack>
    </Modal>
  );
}
