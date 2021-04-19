import React, { useState } from "react";
import { ButtonGroup, Button, Input } from "reactstrap";
import { useAppDispatch } from "../../hooks";
import { setCurrentId, updateSkillset, deleteSkillset } from "../../store";

interface SkillsetListItemProps {
  name: string;
  id: string;
}

export const SkillsetListItem: React.FC<SkillsetListItemProps> = ({
  name,
  id,
}) => {
  const dispatch = useAppDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(name);

  const buttonAddHandler = () => {
    dispatch(setCurrentId(id));
  };

  const inputEditChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLabel(event.target.value);
  };

  const toggleEditable = () => {
    if (editable) {
      dispatch(updateSkillset({ id: id, name: label }));
    }
    setEditable(!editable);
  };

  const buttonDeleteHandler = () => {
    dispatch(deleteSkillset(id));
  };

  return (
    <ButtonGroup>
      {editable ? (
        <Input value={label} onChange={inputEditChangeHandler} />
      ) : (
        label
      )}
      <Button onClick={toggleEditable}>{editable ? "s" : "e"}</Button>
      <Button onClick={buttonDeleteHandler}>X</Button>
      <Button onClick={buttonAddHandler}>+</Button>
    </ButtonGroup>
  );
};
