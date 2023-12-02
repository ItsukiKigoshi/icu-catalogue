import { Course } from "@/src/type/Types";
import { Checkbox, Flex, Text, UnstyledButton } from "@mantine/core";
import classes from "./CourseCard.module.css";

export default function CourseCard(props: {
  course: Course;
  toggleIsEnrolled: (regno: number) => () => void;
}) {
  return (
    <UnstyledButton
      key={props.course.regno}
      className={classes.button}
      mb={8}
      onClick={props.toggleIsEnrolled(props.course.regno)}
    >
      <Flex align="center">
        <Checkbox checked={props.course.isEnrolled} variant="default" mr="xl" />
        <div>
          <Text size="sm" mt={2} lh={1}>
            {props.course.e}
          </Text>
          <Text size="xs" c="dimmed">
            {props.course.instructor}
          </Text>
        </div>
      </Flex>
    </UnstyledButton>
  );
}
