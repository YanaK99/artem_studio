import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

import s from "./modal.module.css";

export const ModalFC: FC<Props> = ({
  onHide,
  show,
  title,
  children,
  onDecline,
  onAgree,
}) => {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className={s.buttons}>
        <div className={s.buttonWrapper}>
          <Button variant="outline-primary" onClick={onAgree} className={s.button}>
            Save
          </Button>
        </div>
        <div className={s.buttonWrapper}>
          <Button variant="outline-danger" onClick={onDecline} className={s.button}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

type Props = {
  show: boolean;
  title: string;
  onHide: () => void;
  onAgree: () => void;
  onDecline: () => void;
};
