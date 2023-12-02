import { CourseWithAdded } from "@/src/type/Types";
import { ActionIcon, Flex, Text, UnstyledButton } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import classes from "./CourseCard.module.css";

export default function CourseCard(props: {
  item: CourseWithAdded;
  toggleCheck: (regno: number) => () => void;
}) {
  return (
    <UnstyledButton key={props.item.regno} className={classes.button} mb={8}>
      <Flex align="center">
        <ActionIcon
          variant="default"
          onClick={props.toggleCheck(props.item.regno)}
          mr="xl"
        >
          {props.item.added ? <IconMinus /> : <IconPlus />}
        </ActionIcon>
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
