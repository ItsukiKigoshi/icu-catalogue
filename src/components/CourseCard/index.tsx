import ModalConfirm from "@/src/components/ModalConfirm";
import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Card,
  Divider,
  Grid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";

export default function CourseCard(props: {
  course: Course;
  toggleIsEnrolled: (regno: number) => void;
  deleteCourse: (regno: number) => void;
}) {
  const [modalOpened, { open, close }] = useDisclosure(false);

  return (
    <Card p={0}>
      <Grid>
        <Grid.Col span="auto">
          <UnstyledButton
            onClick={() => {
              props.toggleIsEnrolled(props.course.regno);
            }}
            key={props.course.regno}
            w="100%"
            p="md"
          >
            <Text size="xs" c="dimmed">
              {props.course.no} ･ {props.course.unit}
            </Text>
            <Text size="sm" lh={1} py={4}>
              {props.course.e} ({props.course.lang})
            </Text>
            <Text size="xs" c="dimmed">
              {props.course.schedule?.map((s, i) =>
                i === props.course.schedule!.length - 1 ? s : s + ", "
              )}
            </Text>
          </UnstyledButton>
        </Grid.Col>
        <Divider orientation="vertical" my="md" mx={0} />
        <Grid.Col span="content" p="md">
          <Stack align="center">
            <ActionIcon
              onClick={() => {
                props.toggleIsEnrolled(props.course.regno);
              }}
              color="gray"
            >
              {props.course.isEnrolled ? <IconEye /> : <IconEyeOff />}
            </ActionIcon>

            <ActionIcon size="sm" onClick={open} color="red">
              <IconTrash />
            </ActionIcon>
          </Stack>
        </Grid.Col>
      </Grid>
      <ModalConfirm
        course={props.course}
        deleteCourse={props.deleteCourse}
        modalOpened={modalOpened}
        close={close}
      />
    </Card>
  );
}
