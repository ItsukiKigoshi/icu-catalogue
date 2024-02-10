import { Course } from "@/src/type/Types";
import {
  Accordion,
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm";
import ModalCourseEditor from "../ModalCourseEditor";

export default function ModalDetail(props: {
  courses: Course[];
  modalDetailOpened: boolean;
  modalDetailClose: () => void;
  courseController: {
    toggleIsEnrolled: (regno: number) => void;
    updateCourse: (course: Course) => void;
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

    // TODO - Should these types in React function component actually be stated twice?
    courseController: {
      toggleIsEnrolled: (regno: number) => void;
      updateCourse: (course: Course) => void;
      deleteCourse: (regno: number) => void;
    };
    modalDetailClose: () => void;
  }> = (props: {
    course: Course;
    courseController: {
      toggleIsEnrolled: (regno: number) => void;
      updateCourse: (course: Course) => void;
      deleteCourse: (regno: number) => void;
    };
    modalDetailClose: () => void;
  }) => {
    const [modalConfirmOpened, { open: confirmOpen, close: confirmClose }] =
      useDisclosure(false);
    const [modalCourseEditorOpened, { open: editorOpen, close: editorClose }] =
      useDisclosure(false);

    const [note, setNote] = useState(props.course.note);

    const handleBlur = () => {
      props.course.note = note;
      props.course.modified = new Date();
      props.courseController.updateCourse(props.course);
    };

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
        <Textarea
          description="Note"
          placeholder="Add a note"
          value={note}
          onChange={(event) => setNote(event.currentTarget.value)}
          onBlur={handleBlur}
        />
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
            leftSection={<IconEdit />}
            color="gray"
            onClick={() => {
              editorOpen();
            }}
          >
            Edit
          </Button>
          <Group grow>
            <ActionIcon
              color="gray"
              size="lg"
              onClick={() => {
                props.courseController.toggleIsEnrolled(props.course.regno);
                props.modalDetailClose();
              }}
            >
              {props.course.isEnrolled ? <IconEyeOff /> : <IconEye />}
            </ActionIcon>

            <ActionIcon
              color="red"
              size="lg"
              onClick={() => {
                confirmOpen();
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Group>
        </Group>
        <ModalConfirm
          course={props.course}
          deleteCourse={props.courseController.deleteCourse}
          modalConfirmOpened={modalConfirmOpened}
          close={confirmClose}
          modalDetailClose={props.modalDetailClose}
        />
        <ModalCourseEditor
          title="Edit Course"
          course={props.course}
          updateCourse={props.courseController.updateCourse}
          modalCourseEditorOpened={modalCourseEditorOpened}
          editorClose={editorClose}
          modalDetailClose={props.modalDetailClose}
        />
      </Stack>
    );
  };

  return (
    <Modal.Root
      opened={props.modalDetailOpened}
      onClose={props.modalDetailClose}
      centered
    >
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
              modalDetailClose={props.modalDetailClose}
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
                      modalDetailClose={props.modalDetailClose}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          <Group justify="center" grow py="xs">
            <Button
              leftSection={<IconX />}
              onClick={props.modalDetailClose}
              color="gray"
            >
              Close
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
