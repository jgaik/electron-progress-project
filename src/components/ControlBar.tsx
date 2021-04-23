import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch } from "../hooks";
import { toggleShowEdit } from "../store";

export const ControlBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const buttonAddHandler = () => {
    dispatch(toggleShowEdit());
  };

  return (
    <>
      <Button onClick={buttonAddHandler}>Add skillset</Button>
      <Button>Update skill</Button>
    </>
  );
};
