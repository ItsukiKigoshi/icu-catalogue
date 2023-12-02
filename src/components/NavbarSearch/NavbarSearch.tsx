import { Flex, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { Course, CourseWithCheck } from "@/src/type/Types";
import CourseCard from "../CourseCard/CourseCard";
import classes from "./NavbarSearch.module.css";
import SearchCourses from "./SearchCourses";

export function NavbarSearch() {
  const [section, setSection] = useState<"addNew" | "myList">("addNew");

  const [addNewItems, setAddNewItems] = useState<CourseWithCheck[]>([]);
  const [myListItems, setMyListItems] = useState<CourseWithCheck[]>([]);

  useEffect(() => {
    const getAddNewItems = async () => {
      const response = await fetch("/api/courses");
      const addNewResponses = await response.json();

      const addNewResponsesWithCheck = addNewResponses.map((item: Course) => {
        return { ...item, checked: false };
      });
      setAddNewItems(addNewResponsesWithCheck);
    };

    getAddNewItems();
  }, []);

  const toggleCheck = (regno: number) => {
    return () => {
      setAddNewItems(
        addNewItems.map((item) => {
          if (item.regno === regno) {
            console.log(`${item.regno}: ${item.checked}`);
            return { ...item, checked: !item.checked };
          } else {
            return item;
          }
        })
      );
    };
  };

  useEffect(() => {
    const getMyListItems = async () => {
      // Only get the courses that are checked
      const response = addNewItems.filter((item) => item.checked === true);
      setMyListItems(response);
    };

    getMyListItems();
  }, [addNewItems]);

  const tabs = {
    addNew: addNewItems,
    myList: myListItems,
  };

  const [currentQuery, setCurrentQuery] = useState("");

  // Show the courses in the selected tab, and if there are no courses, show "No Results"
  const courses =
    tabs[section].length > 0 || currentQuery === "" ? (
      <>
        {/* How to handle the state (currentQuery === "")?  */}
        {currentQuery !== "" ? (
          <Text>
            {tabs[section].length} Results for "{currentQuery}"
          </Text>
        ) : (
          <></>
        )}
        {tabs[section].map((item) => (
          <CourseCard item={item} toggleCheck={toggleCheck} />
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
        getSearchResults={(results: CourseWithCheck[]) =>
          setAddNewItems(results)
        }
        getCurrentQuery={(currentQuery: string) =>
          setCurrentQuery(currentQuery)
        }
      />

      {/* <div>
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
      </div> */}

      <ScrollArea>
        <div className={classes.navbarMain}>{courses}</div>
      </ScrollArea>
    </nav>
  );
}
