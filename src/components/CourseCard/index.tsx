import ModalConfirm from "@/src/components/ModalConfirm";
import { Course } from "@/src/type/Types";
import {
  ActionIcon,
  Card,
  Checkbox,
  Flex,
  Grid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import classes from "./CourseCard.module.css";

export default function CourseCard(props: {
  course: Course;
  toggleIsEnrolled: (regno: number) => void;
  deleteCourse: (regno: number) => void;
}) {
  const [modalOpened, { open, close }] = useDisclosure(false);

  return (
    <Card key={props.course.regno} mb={8} className={classes.button}>
      <Grid align="center">
        <Grid.Col span="auto">
          <UnstyledButton
            onClick={() => {
              props.toggleIsEnrolled(props.course.regno);
            }}
          >
            <Flex align="center">
              <Checkbox
                checked={props.course.isEnrolled}
                onChange={() => {
                  props.toggleIsEnrolled(props.course.regno);
                }}
                variant="default"
                mr="xl"
              />
              <div>
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
              </div>
            </Flex>
          </UnstyledButton>
        </Grid.Col>
        <Grid.Col span="content">
          <Flex align="center">
            <ActionIcon size="sm" onClick={open} color="red">
              <IconTrash />
            </ActionIcon>
          </Flex>
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
