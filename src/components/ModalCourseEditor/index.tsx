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
import { useState } from "react";

export default function ModalCourseEditor(props: {
  title: string;
  course: Course;
  updateCourse: (course: Course) => void;
  modalCourseEditorOpened: boolean;
  editorClose: () => void;
  modalDetailClose: () => void;
}) {
  const [editedCourse, setEditedCourse] = useState<Course>(props.course);

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
    props.modalDetailClose();
  };

  return (
    <Modal
      opened={props.modalCourseEditorOpened}
      onClose={() => {
        props.editorClose();
        props.modalDetailClose();
      }}
      title={props.title}
      centered
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="xs" pb="xs">
          <Group grow>
            <TextInput
              label="Registration Number"
              withAsterisk
              disabled
              placeholder={props.course.regno.toString()}
              name="regno"
              value={editedCourse.regno.toString()}
              onChange={handleInputChange}
            />
            <TextInput
              label="Course Number"
              withAsterisk
              placeholder={props.course.no}
              name="no"
              value={editedCourse.no}
              onChange={handleInputChange}
            />
          </Group>

          <TextInput
            label="English Title"
            withAsterisk
            placeholder={props.course.e}
            name="e"
            value={editedCourse.e}
            onChange={handleInputChange}
          />
          <TextInput
            label="Japanese Title"
            withAsterisk
            placeholder={props.course.j}
            name="j"
            value={editedCourse.j}
            onChange={handleInputChange}
          />

          <TagsInput
            label="Schedule (e.g. 3/M)"
            withAsterisk
            defaultValue={props.course.schedule}
            name="schedule"
            value={editedCourse.schedule}
            onChange={(value: string[]) => {
              const scheduleArray = value.map((item) => item.trim());
              const validScheduleArray = scheduleArray.filter((item) =>
                /^[1-7]+\/[M|TU|W|TH|F|SA]+$/.test(item)
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
              placeholder={props.course.room}
              name="room"
              value={editedCourse.room}
              onChange={handleInputChange}
            />
            <TextInput
              label="Instructor"
              placeholder={props.course.instructor}
              name="instructor"
              value={editedCourse.instructor}
              onChange={handleInputChange}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Language (E/J/O)"
              withAsterisk
              placeholder={props.course.lang}
              name="lang"
              value={editedCourse.lang}
              onChange={handleInputChange}
            />
            <NumberInput
              label="Unit"
              withAsterisk
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
              placeholder={props.course.ay.toString()}
              name="ay"
              value={editedCourse.ay.toString()}
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
            placeholder={props.course.color}
            name="color"
            value={editedCourse.color}
            onChange={
              editedCourse.color
                ? (value) =>
                    setEditedCourse((prevCourse) => ({
                      ...prevCourse,
                      color: value,
                    }))
                : () =>
                    setEditedCourse((prevCourse) => ({
                      ...prevCourse,
                      color: "#2e2e2e",
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
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
}
