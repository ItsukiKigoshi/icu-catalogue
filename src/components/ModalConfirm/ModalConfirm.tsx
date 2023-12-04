import { Course } from "@/src/type/Types";
import { Button, Group, Modal } from "@mantine/core";

export default function ModalConfirm(props: {
  course: Course;
  deleteCourse: (regno: number) => void;
  modalOpened: boolean;
  close: () => void;
}) {
  return (
    <Modal
      opened={props.modalOpened}
      onClose={props.close}
      title={`Are you sure to delete "${props.course.e}"?`}
      centered
    >
      <Group justify="center">
        <Button
          onClick={() => {
            props.deleteCourse(props.course.regno);
            props.close();
          }}
          color="red"
        >
          Yes, Delete
        </Button>
        <Button onClick={props.close} color="gray">
          No, Cancel
        </Button>
      </Group>
    </Modal>
  );
}
