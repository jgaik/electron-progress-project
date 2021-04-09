import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ButtonType } from "../../types";

interface PopUpProps {
  isShown: boolean;
  showToggle: () => void;
  title: string;
  buttonPrimary?: ButtonType;
  buttonSecondary?: ButtonType;
}

export const PopUp: React.FC<PopUpProps> = ({
  isShown,
  showToggle,
  title,
  buttonPrimary,
  buttonSecondary,
  children,
}) => {
  const isFooter = buttonPrimary || buttonSecondary;

  const primaryToggle = () => {
    showToggle();
    if (buttonPrimary && buttonPrimary.onClickHandle)
      buttonPrimary.onClickHandle();
  };
  const secondaryToggle = () => {
    showToggle();
    if (buttonSecondary && buttonSecondary.onClickHandle)
      buttonSecondary.onClickHandle();
  };

  return (
    <Modal isOpen={isShown} toggle={showToggle}>
      <ModalHeader toggle={showToggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {isFooter && (
        <ModalFooter>
          {buttonPrimary && (
            <Button onClick={primaryToggle}>{buttonPrimary.name}</Button>
          )}
          {buttonSecondary && (
            <Button onClick={secondaryToggle}>{buttonSecondary.name}</Button>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};
