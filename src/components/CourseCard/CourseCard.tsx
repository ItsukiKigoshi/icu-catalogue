import { CourseWithCheck } from "@/src/type/Course";
import { Checkbox, Flex, Text, UnstyledButton } from "@mantine/core";
import classes from "./CourseCard.module.css";

export default function CourseCard(props: { item: CourseWithCheck }) {
  return (
    <UnstyledButton key={props.item.regno} className={classes.button} mb={8}>
      <Flex align="center">
        <Checkbox
          checked={props.item.checked}
          tabIndex={-1}
          size="md"
          mr="xl"
          aria-hidden
        />
        <div>
          <Text fz="sm" c="dimmed">
            {props.item.cno}
          </Text>
          <Text fz="sm" mt={2} lh={1}>
            {props.item.title_e}
          </Text>
        </div>
      </Flex>
    </UnstyledButton>
  );
}
