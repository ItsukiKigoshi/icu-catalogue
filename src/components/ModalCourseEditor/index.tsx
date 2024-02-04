import { Course } from "@/src/type/Types";
import {
  Button,
  ColorInput,
  Group,
  Modal,
  NativeSelect,
  NumberInput,
  Stack,
  TagsInput,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function ModalCourseEditor(props: {
  title: string;
  course: Course;
  updateCourse: (course: Course) => void;
  modalCourseEditorOpened: boolean;
  editorClose: () => void;
  modalDetailClose?: () => void;
}) {
  const [editedCourse, setEditedCourse] = useState<Course>(props.course);
  // Reset the edited course when the props.course is changed
  useEffect(() => {
    setEditedCourse(props.course);
  }, [props.course]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.updateCourse(editedCourse);
    props.editorClose();
    props?.modalDetailClose?.();
  };

  const scheduleSelectData = ["M", "TU", "W", "TH", "F", "SA"].map((day) => ({
    group: day,
    items: ["1", "2", "3", "4", "5", "6", "7"].map(
      (period) => `${period}/${day}`
    ),
  }));

  return (
    <Modal
      opened={props.modalCourseEditorOpened}
      onClose={() => {
        props.editorClose();
        props?.modalDetailClose?.();
      }}
      title={props.title}
      centered
      closeOnClickOutside={false}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="xs" pb="xs">
          <Group grow>
            <NumberInput
              label="Registration Number"
              withAsterisk
              required
              placeholder={"18807"}
              name="regno"
              value={editedCourse.regno}
              min={10000}
              max={99999}
              onChange={(value) =>
                setEditedCourse((prevCourse) => ({
                  ...prevCourse,
                  regno: Number(value),
                }))
              }
            />
            <TextInput
              label="Course Number"
              data-autofocus
              withAsterisk
              required
              placeholder={"WTS101"}
              name="no"
              value={editedCourse.no}
              onChange={handleInputChange}
            />
          </Group>
          <TextInput
            label="English Title"
            withAsterisk
            required
            placeholder={"Introductory Unsolved Cases"}
            name="e"
            value={editedCourse.e}
            onChange={handleInputChange}
          />
          <TextInput
            label="Japanese Title"
            withAsterisk
            required
            placeholder={"未解決事件入門"}
            name="j"
            value={editedCourse.j}
            onChange={handleInputChange}
          />

          <TagsInput
            label="Schedule (e.g. 3/TH)"
            placeholder="4/W, 3/TH, 5/F, ..."
            withAsterisk
            required
            defaultValue={props.course.schedule}
            name="schedule"
            value={editedCourse.schedule}
            data={scheduleSelectData}
            onChange={(value: string[]) => {
              const scheduleArray = value.map((item) => item.trim());
              const validScheduleArray = scheduleArray.filter((item) =>
                /^[1-7]+\/(M|TU|W|TH|F|SA)$/.test(item)
              );
              setEditedCourse((prevCourse) => ({
                ...prevCourse,
                schedule: validScheduleArray,
              }));
            }}
          />
          <Group grow>
            <TextInput
              label="Room"
              placeholder={"B-221B"}
              name="room"
              value={editedCourse.room}
              onChange={handleInputChange}
            />
            <TextInput
              label="Instructor"
              placeholder={"Sherlock Holmes"}
              name="instructor"
              value={editedCourse.instructor}
              onChange={handleInputChange}
            />
          </Group>

          <Group grow>
            <NativeSelect
              label="Language"
              withAsterisk
              required
              name="lang"
              value={editedCourse.lang}
              onChange={(event) =>
                setEditedCourse((prevCourse) => ({
                  ...prevCourse,
                  lang: event?.currentTarget?.value || editedCourse.lang,
                }))
              }
              data={[
                { value: "E", label: "English" },
                { value: "J", label: "Japanese" },
                { value: "O", label: "Other" },
              ]}
            />
            <NumberInput
              label="Unit"
              withAsterisk
              required
              placeholder={props.course.unit.toString()}
              name="unit"
              value={editedCourse.unit}
              min={0}
              onChange={(value) =>
                setEditedCourse((prevCourse) => ({
                  ...prevCourse,
                  unit: Number(value),
                }))
              }
            />
          </Group>
          <Group grow>
            <NativeSelect
              label="Season"
              withAsterisk
              required
              defaultValue={props.course.season}
              name="season"
              value={editedCourse.season}
              onChange={(event) =>
                setEditedCourse((prevCourse) => ({
                  ...prevCourse,
                  season: event?.currentTarget?.value || editedCourse.season,
                }))
              }
              data={[
                { value: "Spring", label: "Spring" },
                { value: "Autumn", label: "Autumn" },
                { value: "Winter", label: "Winter" },
              ]}
            />
            <NumberInput
              label="Academic Year"
              withAsterisk
              required
              placeholder={props.course.ay.toString()}
              name="ay"
              value={editedCourse.ay.toString()}
              min={2000}
              onChange={(value) =>
                setEditedCourse((prevCourse) => ({
                  ...prevCourse,
                  ay: Number(value),
                }))
              }
            />
          </Group>
          <ColorInput
            label="Color"
            closeOnColorSwatchClick
            withAsterisk
            required
            placeholder={props.course.color}
            name="color"
            value={editedCourse.color}
            onChange={(value) =>
              setEditedCourse((prevCourse) => ({
                ...prevCourse,
                color: value,
              }))
            }
            format="hex"
            withPicker={false}
            swatches={[
              "#2e2e2e",
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
            ]}
          />
        </Stack>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
}
