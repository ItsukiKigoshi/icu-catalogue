import { Course } from "@/src/type/Types";
import { Accordion, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import ModalConfirm from "../ModalConfirm";

export default function ModalDetail(props: {
  courses: Course[];
  modalDetailOpened: boolean;
  close: () => void;
  courseController: {
    toggleIsEnrolled: (regno: number) => void;
    deleteCourse: (regno: number) => void;
  };
}) {
  const seasonToNumber = (season: string) => {
    switch (season) {
      case "Spring":
        return 1;
      case "Autumn":
        return 2;
      case "Winter":
        return 3;
      default:
        return 0;
    }
  };

  const CourseTitle: React.FC<{ course: Course }> = (props: {
    course: Course;
  }) => {
    return (
      <Stack gap="0">
        <Text fw="bold">
          {props.course.no} ･ {props.course.e} ({props.course.lang})
        </Text>
        <Group>
          <Text size="sm" c="dimmed">
            {props.course.instructor}
          </Text>
          <Text size="sm" c="dimmed">
            {props.course?.room}
          </Text>
        </Group>
      </Stack>
    );
  };

  const CourseInfo: React.FC<{
    course: Course;
    courseController: {
      toggleIsEnrolled: (regno: number) => void;
      deleteCourse: (regno: number) => void;
    };
    modalDetailClose: () => void;
  }> = (props: {
    course: Course;
    courseController: {
      toggleIsEnrolled: (regno: number) => void;
      deleteCourse: (regno: number) => void;
    };
    modalDetailClose: () => void;
  }) => {
    const [modalConfirmOpened, { open, close }] = useDisclosure(false);
    return (
      <Stack gap="xs" p="xs" key={props.course.regno}>
        <Group>
          <Text size="sm">
            {props.course?.schedule?.map((s, i) =>
              i === props.course?.schedule!.length - 1 ? s : s + ", "
            )}
          </Text>
          <Text size="sm">({props.course?.unit} Units)</Text>
        </Group>
        <Text size="sm">
          {props.course.season} {props.course.ay}
        </Text>
        <Group justify="center" grow>
          <Button
            leftSection={<IconExternalLink />}
            component="a"
            href={`https://campus.icu.ac.jp/public/ehandbook/PreviewSyllabus.aspx?regno=${
              props.course.regno
            }&year=${props.course.ay}&term=${seasonToNumber(
              props.course.season
            )}`}
            target="_blank"
          >
            Syllabus
          </Button>
        </Group>
        <Group justify="center" grow>
          <Button
            leftSection={props.course.isEnrolled ? <IconEyeOff /> : <IconEye />}
            color="gray"
            onClick={() => {
              props.courseController.toggleIsEnrolled(props.course.regno);
              props.modalDetailClose();
            }}
          >
            {props.course.isEnrolled ? "Hide" : "Show"}
          </Button>
          <Button leftSection={<IconTrash />} color="red" onClick={open}>
            Delete
          </Button>
        </Group>
        <ModalConfirm
          course={props.course}
          deleteCourse={props.courseController.deleteCourse}
          modalConfirmOpened={modalConfirmOpened}
          close={close}
          modalDetailClose={props.modalDetailClose}
        />
      </Stack>
    );
  };

  return (
    <Modal.Root opened={props.modalDetailOpened} onClose={props.close} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {props.courses?.length === 1 ? (
              <CourseTitle course={props.courses?.[0]} />
            ) : (
              <Text c="red" fw="bold">
                {props.courses.length} Courses Conflicted!
              </Text>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.courses?.length === 1 ? (
            <CourseInfo
              course={props.courses?.[0]}
              courseController={props.courseController}
              modalDetailClose={props.close}
            />
          ) : (
            <Accordion>
              {props.courses?.map((course) => (
                <Accordion.Item key={course.regno} value={course.e}>
                  <Accordion.Control>
                    <CourseTitle course={course} />
                  </Accordion.Control>
                  <Accordion.Panel>
                    <CourseInfo
                      course={course}
                      courseController={props.courseController}
                      modalDetailClose={props.close}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <Group justify="center" grow py="xs">
            <Button leftSection={<IconX />} onClick={props.close} color="gray">
              Close
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
