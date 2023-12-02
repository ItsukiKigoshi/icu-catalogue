import { Course } from "@/src/type/Types";
import { Flex, Text, UnstyledButton } from "@mantine/core";
import classes from "./CourseCard.module.css";

export default function CourseCard(props: {
  course: Course;
  toggleIsEnrolled: (regno: number) => () => void;
}) {
  return (
    <UnstyledButton key={props.course.regno} className={classes.button} mb={8}>
      <Flex align="center">
        {/* <ActionIcon
          variant="default"
          onClick={props.toggleIsEnrolled(props.course.regno)}
          mr="xl"
        >
          {props.course.isEnrolled ? <IconMinus /> : <IconPlus />}
        </ActionIcon> */}
        <input
          type="checkbox"
          checked={props.course.isEnrolled}
          onChange={props.toggleIsEnrolled(props.course.regno)}
        />
        <div>
          <Text fz="sm" mt={2} lh={1}>
            {props.course.e}
          </Text>
        </div>
      </Flex>
    </UnstyledButton>
  );
}
