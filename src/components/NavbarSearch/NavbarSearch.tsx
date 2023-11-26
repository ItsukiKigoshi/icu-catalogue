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
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const result = await getLectures();
      setLectures(result);
    };

    fetchLectures();
  }, []);

  const tabs = {
    addNew: lectures,
    myItems: lectures,
  };

  const courses = tabs[section].map((item) => (
    <UnstyledButton
      key={item.title_e}
      onClick={() => onChange(!value)}
      className={classes.button}
      my={10}
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
          <Text fz="sm" mt={7} lh={1}>
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
        />
      </div>

      <ScrollArea h={"100vh"}>
        <div className={classes.navbarMain}>{courses}</div>
      </ScrollArea>
    </nav>
  );
}
