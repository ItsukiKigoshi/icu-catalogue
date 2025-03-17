import {Course, Term} from "@/src/type/classic-2024/Types";
import {Carousel} from "@mantine/carousel";
import {ActionIcon, Grid, Image, Modal, Stack, TextInput, Title,} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconClipboard, IconPlus, IconQuestionMark} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import ModalCourseEditor from "@/src/components/classic-2024/ClassicModalCourseEditor";

export default function ClassicAddCourse(props: {
  courses: Course[];
  courseController: {
    addCourse: (course: Course) => void;
    updateCourse: (course: Course) => void;
  };
  selectedTerm?: Term;
}) {
  const [query, setQuery] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // Set the error message to empty when the query is empty
  useEffect(() => {
    if (query === "") {
      setErrorMessage("");
    }
  }, [query]);

  const [modalCourseEditorOpened, { open: editorOpen, close: editorClose }] =
    useDisclosure(false);

  function parseCourseInfo(str: string): Course | undefined {
    // replace "(" or "<" with "," in front of the schedule, and remove ")" and ">" after schedule
    const modifiedStr = str
      .replace(/\((\d\/)/g, "$1")
      .replace(/(M|TU|W|TH|F|SA)>/g, "$1")
      .replace(/(M|TU|W|TH|F|SA)\)/g, "$1")
      .replace(/,\(/g, ",")
      .replace(/,<\)/g, ",")
      .replace(/ or /g, ",")
      .replace(/</g, ",")

      // remove "*", which means "ignoring Super 4"
      .replace(/\*/g, "");

    // Debug Console
    // console.log(`modifiedStr: ${modifiedStr}`);

    const regex =
      /(\d+)\s(\w+)\s(\d+)\s(\[change]\s(\d{4}\/\d{2}\/\d{2})\s)?(\s)?(\w+)\s?([JEO])?(\s\w{1})?\s(.+)?\s?\s(.+?)\s(\d\/[A-Z]+(,\d\/[A-Z]+)*)\s(.+?)?\s?(\((\d+)\))?\s(Online|(Face to Face))?(.+)\s(.+)\s(\d+(\/\d+)*)/;

    const match = modifiedStr.match(regex);

    // Debug Console
    if (match) {
      for (let i = 0; i < match?.length; i++) {
        console.log(`${i}: ${match[i]}`);
      }
    }

    if (match) {
      setErrorMessage("");
      const schedule = match[12]
        .replace(/[<>()]/g, "")
        .split(/,|\sor\s/)
        .map((s) => s.trim())
        .filter((s) => s.match(/\d\/[A-Z]+/));

      let inputUnit: string = match[22];
      let unit: number;

      // Convert "1/3" to 0.3 if the unit is 1/3
      if (inputUnit === "1/3") {
        unit = 0.3;
      } else {
        unit = parseInt(inputUnit);
      }

      return {
        regno: parseInt(match[1]),
        season: match[2],
        ay: parseInt(match[3]),
        no: match[7],
        lang: match[8],
        e: match[10],
        j: match[11],
        schedule: schedule,
        instructor: match[20] + match[21],
        room: "",
        unit: unit,
        modified: new Date(),
        isEnrolled: true,
        note: "",
        color: randomColor(),
      };
    } else if (query !== "") {
      setErrorMessage(`The string does not match the expected format.`);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(query);
    const course = parseCourseInfo(query);

    // Check if the course is already in the list
    function isAlreadyInList(course: Course): boolean {
      let isAlreadyInList = false;
      props.courses.forEach((c) => {
        if (c.regno === course.regno) {
          isAlreadyInList = true;
        }
      });
      return isAlreadyInList;
    }

    if (course !== undefined) {
      if (isAlreadyInList(course)) {
        setErrorMessage(`Already in the List! regno:${course.regno}`);
      } else {
        props.courseController.addCourse(course);
        setQuery("");
      }
    }
  };

  const randomColor = () => {
    return [
      "#868e96",
      "#fa5252",
      "#e64980",
      "#be4bdb",
      "#7950f2",
      "#4c6ef5",
      "#228be6",
      "#15aabf",
      "#12b886",
      "#40c057",
      "#82c91e",
      "#fab005",
      "#fd7e14",
    ][Math.floor(Math.random() * 12)];
  };

  const [
    modalHowToAddCourseOpened,
    { open: howToAddCourseOpen, close: howToAddCourseClose },
  ] = useDisclosure(false);
  const ModalHowToAddCourse: React.FC = () => {
    return (
      <Modal
        opened={modalHowToAddCourseOpened}
        onClose={howToAddCourseClose}
        size="xl"
        title="How to Add a Course"
      >
        <Carousel slideSize="80%" slideGap="xl">
          <Carousel.Slide>
            <Stack>
              <Title order={5}>
                1. Copy Course Info from{" "}
                <a
                  href="https://campus.icu.ac.jp/icumap/ehb/SearchCO.aspx"
                  target="_blank"
                >
                  Course Offerings
                </a>
              </Title>
              <Image
                src="/HowTo-CourseOfferings.gif"
                alt="Copy from Course Offerings"
              />
            </Stack>
          </Carousel.Slide>
          <Carousel.Slide>
            <Stack>
              <Title order={5}>2. Paste Info and Press Enter!</Title>
              <Image
                src="/HowTo-ICUCatalogue.gif"
                alt="Paste it to ICU Catalogue"
              />
            </Stack>
          </Carousel.Slide>
        </Carousel>
      </Modal>
    );
  };
  return (
    <>
      <ModalCourseEditor
        title={"Add Course Manually"}
        course={{
          regno: 10000,
          season: props.selectedTerm?.season || "Spring",
          ay: Number(props.selectedTerm?.ay) || new Date().getFullYear(),
          no: "",
          lang: "E",
          e: "",
          j: "",
          schedule: [],
          unit: 0,
          room: "",
          color: randomColor(),
          isEnrolled: true,
          note: "",
          modified: new Date(),
        }}
        updateCourse={props.courseController.updateCourse}
        modalCourseEditorOpened={modalCourseEditorOpened}
        editorClose={editorClose}
      />
      <ModalHowToAddCourse />
      <Stack gap="1px">
        <Grid align="flex-start">
          <Grid.Col span="content">
            <ActionIcon color="gray" size="lg" onClick={editorOpen}>
              <IconPlus />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span="auto">
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextInput
                m="0"
                placeholder="Paste it!"
                leftSection={<IconClipboard />}
                styles={{ section: { pointerEvents: "none" } }}
                value={query}
                error={errorMessage}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
            </form>
          </Grid.Col>
          <Grid.Col span="content">
            <ActionIcon color="gray" size="lg" onClick={howToAddCourseOpen}>
              <IconQuestionMark />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
