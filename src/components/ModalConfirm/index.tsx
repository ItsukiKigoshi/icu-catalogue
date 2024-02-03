import { Course } from "@/src/type/Types";
import { Button, Group, Modal } from "@mantine/core";

export default function ModalConfirm(props: {
  course: Course;
  deleteCourse: (regno: number) => void;
  modalConfirmOpened: boolean;
  close: () => void;
  modalDetailClose?: () => void;
}) {
  return (
    <Modal
      opened={props.modalConfirmOpened}
      onClose={props.close}
      title={`Are you sure to delete "${props.course.e}"?`}
      centered
    >
      <Group justify="center">
        <Button
          onClick={() => {
            props.deleteCourse(props.course.regno);
            if (props.modalDetailClose) {
              props.modalDetailClose();
            }
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
