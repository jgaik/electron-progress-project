import React from "react";
import { Modal, ModalBody } from "reactstrap";

interface PopUpProps {
  isShown: boolean;
  showHandler: (isShown: boolean) => void;
  submitHandler: () => void;
}

export const PopUp: React.FC<PopUpProps> = ({
  isShown,
  showHandler,
  children,
}) => {
  const toggle = () => showHandler(!isShown);

  return (
    <Modal isOpen={isShown} toggle={toggle}>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
