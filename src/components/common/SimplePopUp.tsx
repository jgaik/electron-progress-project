import React from "react";
import { ButtonType } from "../../types";
import { PopUp } from "./PopUp";

interface SimplePopUpProps {
  title: string;
  isShown: boolean;
  showToggle: () => void;
}

export const SimplePopUp: React.FC<SimplePopUpProps> = ({
  title,
  isShown,
  showToggle,
  children,
}) => {
  const buttonClose: ButtonType = { name: "Close" };

  return (
    <PopUp
      title={title}
      isShown={isShown}
      showToggle={showToggle}
      buttonPrimary={buttonClose}
    ></PopUp>
  );
};
