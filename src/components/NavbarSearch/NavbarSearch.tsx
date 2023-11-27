import {
  Checkbox,
  Flex,
  ScrollArea,
  SegmentedControl,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { Course } from "@/src/type/Course";
import classes from "./NavbarSearch.module.css";
import SearchCourses from "./SearchCourses";

export function NavbarSearch() {
  const [section, setSection] = useState<"addNew" | "myList">("addNew");
  const [value, onChange] = useState(false);

  const [addNewItems, setAddNewItems] = useState<Course[]>([]);
  const [myListItems, setMyListItems] = useState<Course[]>([]);

  useEffect(() => {
    const getAddNewItems = async () => {
      const response = await fetch("/api/courses");
      const addNewResponses = await response.json();
      setAddNewItems(addNewResponses);
    };

    getAddNewItems();
  }, []);

  // useEffect(() => {
  //   const getMyListItems = async () => {
  //     const response = await fetch("/api/courses");
  //     const myListResponses = await response.json();
  //     setMyListItems(myListResponses);
  //   };

  //   getMyListItems();
  // }, []);

  const tabs = {
    addNew: addNewItems,
    myList: myListItems,
  };

  const [currentQuery, setCurrentQuery] = useState("");
  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const courses =
    tabs[section].length > 0 || currentQuery === "" ? (
      <>
        <Text>
          {tabs[section].length} Results for "{currentQuery}"
        </Text>

        {tabs[section].map((item) => (
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
        ))}
      </>
    ) : (
      <Flex justify="center">
        <Text>No Results for "{currentQuery}"</Text>
      </Flex>
    );

  return (
    <nav className={classes.navbar}>
      {/* Search Feature is now only available for AddNewItems */}
      <SearchCourses
        getSearchResults={(results: Course[]) => setAddNewItems(results)}
        getCurrentQuery={(currentQuery: string) =>
          setCurrentQuery(currentQuery)
        }
      />

      <div>
        <SegmentedControl
          value={section}
          onChange={(value: any) => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Add New", value: "addNew" },
            { label: "My List", value: "myList" },
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
