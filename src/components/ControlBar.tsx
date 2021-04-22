import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch } from "../hooks";
import { clearSkillset, toggleShowEdit } from "../store";

export const ControlBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const buttonAddHandler = () => {
    dispatch(clearSkillset());
    dispatch(toggleShowEdit());
  };

  return (
    <>
      <Button onClick={buttonAddHandler}>Add skillset</Button>
      <Button>Update skill</Button>
    </>
  );
};
