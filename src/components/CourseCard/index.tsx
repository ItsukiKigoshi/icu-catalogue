import ModalConfirm from "@/src/components/ModalConfirm";
import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Card,
  Divider,
  Flex,
  Grid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";

export default function CourseCard(props: {
  course: Course;
  open: () => void;
  toggleIsEnrolled: (regno: number) => void;
  deleteCourse: (regno: number) => void;
}) {
  const [modalConfirmOpened, { open, close }] = useDisclosure(false);

  return (
    <Card p={0} m="sm" withBorder>
      <Grid>
        <Grid.Col span="auto">
          <UnstyledButton
            onClick={() => {
              props.open();
            }}
            key={props.course.regno}
            w="100%"
            p="md"
          >
            <Flex gap="xs">
              <Divider
                color={props.course.color}
                size="xl"
                w="2px"
                orientation="vertical"
              />
              <Stack h="100%" gap="sm">
                <Text size="xs" c="dimmed">
                  {props.course.no} ･ {props.course.unit}
                </Text>
                <Text size="sm" lh={1}>
                  {props.course.e} ({props.course.lang})
                </Text>
                <Text size="xs" c="dimmed">
                  {props.course.schedule?.map((s, i) =>
                    i === props.course.schedule!.length - 1 ? s : s + ", "
                  )}
                </Text>
              </Stack>
            </Flex>
          </UnstyledButton>
        </Grid.Col>
        <Divider orientation="vertical" my="md" mx={0} />
        <Grid.Col span="content">
          <Stack align="center" h="100%" p="md">
            <ActionIcon
              onClick={() => {
                props.toggleIsEnrolled(props.course.regno);
              }}
              color="gray"
            >
              {props.course.isEnrolled ? <IconEye /> : <IconEyeOff />}
            </ActionIcon>

            <ActionIcon onClick={open} color="red">
              <IconTrash />
            </ActionIcon>
          </Stack>
        </Grid.Col>
      </Grid>
      <ModalConfirm
        course={props.course}
        deleteCourse={props.deleteCourse}
        modalConfirmOpened={modalConfirmOpened}
        close={close}
      />
    </Card>
  );
}
