import { Button, Group, Modal } from "@mantine/core";

export default function ModalConfirm(props: {
  title: string;
  confirmLabel: string;
  modalConfirmOpened: boolean;
  onConfirm: () => void;
  close: () => void;
}) {
  return (
    <Modal
      opened={props.modalConfirmOpened}
      onClose={props.close}
      title={props.title}
      centered
    >
      <Group justify="center">
        <Button
          onClick={() => {
            props.onConfirm();
            props.close();
          }}
          color="red"
        >
          {props.confirmLabel}
        </Button>
        <Button onClick={props.close} color="gray">
          No, Cancel
        </Button>
      </Group>
    </Modal>
  );
}
