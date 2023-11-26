import {
  Checkbox,
  Flex,
  ScrollArea,
  SegmentedControl,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";

import getLectures from "@/src/libs/getLectures";
import { Lecture } from "@/src/type/Lecture";
import { IconSearch } from "@tabler/icons-react";
import classes from "./NavbarSearch.module.css";

export function NavbarSearch() {
  const [section, setSection] = useState<"addNew" | "myItems">("addNew");
  const [value, onChange] = useState(false);
  const [addNews, setAddNews] = useState<Lecture[]>([]);
  const [myItems, setMyItems] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const result = await getLectures("microeconomics");
      setAddNews(result);
    };

    fetchLectures();
  }, []);

  useEffect(() => {
    const fetchLectures = async () => {
      const result = await getLectures("calculus");
      setMyItems(result);
    };

    fetchLectures();
  }, []);

  const tabs = {
    addNew: addNews,
    myItems: myItems,
  };

  const courses = tabs[section].map((item) => (
    <UnstyledButton
      key={item.regno}
      onClick={() => onChange(!value)}
      className={classes.button}
      mb={8}
    >
      <Flex align="center">
        <Checkbox
          checked={value}
          onChange={() => {}}
          tabIndex={-1}
          size="md"
          mr="xl"
          aria-hidden
        />
        <div>
          <Text fz="sm" c="dimmed">
            {item.cno}
          </Text>
          <Text fz="sm" mt={2} lh={1}>
            {item.title_e}
          </Text>
        </div>
      </Flex>
    </UnstyledButton>
  ));

  return (
    <nav className={classes.navbar}>
      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        styles={{ section: { pointerEvents: "none" } }}
        mb="sm"
      />

      <div>
        <SegmentedControl
          value={section}
          onChange={(value: any) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Add New", value: "addNew" },
            { label: "My List", value: "myItems" },
          ]}
          mb="0"
        />
      </div>

      <ScrollArea>
        <div className={classes.navbarMain}>{courses}</div>
      </ScrollArea>
    </nav>
  );
}
