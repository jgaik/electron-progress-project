import React from "react";
import { ButtonType } from "../../types";
import { PopUp } from "./PopUp";

interface FormPopUpProps {
  title: string;
  isShown: boolean;
  showToggle: () => void;
  buttonSubmit: ButtonType;
}

export const FormPopUp: React.FC<FormPopUpProps> = ({
  title,
  isShown,
  showToggle,
  buttonSubmit,
  children,
}) => {
  const buttonCancel: ButtonType = { name: "Cancel" };
  return (
    <PopUp
      isShown={isShown}
      showToggle={showToggle}
      title={title}
      buttonPrimary={buttonSubmit}
      buttonSecondary={buttonCancel}
    >
      {children}
    </PopUp>
  );
};
