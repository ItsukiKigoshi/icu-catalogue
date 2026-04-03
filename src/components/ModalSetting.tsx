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
} from "@mantine/core";
import { useColorScheme, useDisclosure } from "@mantine/hooks";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconCoinYen,
  IconDownload,
  IconFileImport,
  IconInfoCircle,
  IconSend,
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
              title="We are Moving! / お引越し中！ "
              icon={<IconInfoCircle />}
          >
            {props.languageController.language == 'J' ? (
                <section>
                  <h3>
                    新アプリ「<a target="_blank" href="https://timetable.icu/"><b>ICUのじかんわり</b></a>」をリリースしました！
                  </h3>
                  <p>
                    コース検索，L4-7対応，デバイス間同期で履修登録はお手の物． </p>
                  <p>
                    ICU Catalogueは最低限の管理のみを継続し，開発は新アプリが主体になります．
                    ぜひこの機会に新アプリをお試しください． あなたのICU Catalogueへの愛のおかげで素敵な新版が誕生しました．
                    これまでの，そしてこれからも，愛に感謝します！
                  </p><p>
                    開発者代表: 木越斎 (itsuki@timetable.icu)
                  </p>
                </section>
            ) : (
                <section>
                  <h3>
                    Try our new app: <a target="_blank" href="https://timetable.icu/"><b>Timetable.icu</b></a>!
                  </h3>
                  <p> Search courses and sync across devices.</p>
                  <p>We continue to debug this site, but new features will not be added.
                    Your kind feedbacks to this app motivated me to create a new (and more wonderful!) one.
                    Thank you for your love to ICU Catalogue♡</p>
                  <p>
                    Lead Developer: Itsuki Kigoshi (itsuki@timetable.icu)
                  </p>
                </section>
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
          <Text fw="bold">Language</Text>
          <SegmentedControl
            data={["E", "J"]}
            fullWidth
            value={props.languageController.language}
            onChange={(value) => props.languageController.setLanguage(value)}
          />
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
