import React, { useState } from "react";
import { ButtonGroup, Button, Input, Label } from "reactstrap";
import { useAppDispatch } from "../../hooks";
import { setCurrentId, deleteSkill, updateSkill } from "../../store";
import { SkillType } from "../../types";

interface SkillListItemProps {
  skill: SkillType;
}

export const SkillListItem: React.FC<SkillListItemProps> = ({ skill }) => {
  const dispatch = useAppDispatch();
  const [editable, setEditable] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(skill.name);

  const buttonAddHandler = () => {
    dispatch(setCurrentId(skill.id));
  };

  const inputEditChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLabel(event.target.value);
  };

  const toggleEditable = () => {
    if (editable) {
      dispatch(updateSkill({ ...skill, name: label }));
    }
    setEditable(!editable);
  };

  const toggleOrder = () => {
    dispatch(updateSkill({ ...skill, isOrdered: !skill.isOrdered }));
  };

  const buttonDeleteHandler = () => {
    dispatch(deleteSkill(skill));
  };

  return (
    <ButtonGroup>
      {editable ? (
        <Input value={label} onChange={inputEditChangeHandler} />
      ) : (
        <Label>{label}</Label>
      )}
      <Button onClick={toggleEditable}>{editable ? "s" : "e"}</Button>
      <Button onClick={toggleOrder}>{skill.isOrdered ? "1" : "*"}</Button>
      <Button onClick={buttonDeleteHandler}>X</Button>
      <Button onClick={buttonAddHandler}>+</Button>
    </ButtonGroup>
  );
};
