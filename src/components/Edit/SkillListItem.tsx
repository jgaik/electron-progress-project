import React, { useState } from "react";
import { ButtonGroup, Button, Input } from "reactstrap";
import { useAppDispatch } from "../../hooks";
import { setCurrentId, deleteSkill, updateSkill } from "../../store";
import { SkillType } from "../../types";
import {
  Add,
  Delete,
  Edit,
  FormatListBulleted,
  FormatListNumbered,
  Save,
} from "@material-ui/icons";

interface SkillListItemProps {
  skill: SkillType;
}

export const SkillListItem: React.FC<SkillListItemProps> = ({ skill }) => {
  const dispatch = useAppDispatch();
  const [skillState, setSkillState] = useState({
    label: skill.name,
    editMode: false,
    showControls: false,
  });

  const buttonAddHandler = () => {
    dispatch(updateSkill({ ...skill, expandChildren: true }));
    dispatch(setCurrentId(skill.id));
  };

  const inputEditChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkillState({ ...skillState, label: event.target.value });
  };

  const toggleEditable = () => {
    if (skillState.editMode) {
      dispatch(updateSkill({ ...skill, name: skillState.label }));
    }
    setSkillState({ ...skillState, editMode: !skillState.editMode });
  };

  const toggleOrder = () => {
    dispatch(updateSkill({ ...skill, isOrdered: !skill.isOrdered }));
  };

  const buttonDeleteHandler = () => {
    dispatch(deleteSkill(skill));
  };

  const buttonLabelEnterHandler = () => {
    setSkillState({ ...skillState, showControls: true });
  };

  const buttonLabelLeaveHandler = () => {
    setSkillState({ ...skillState, showControls: false });
  };

  const buttonLabelHandler = () => {
    if (skill.expandChildren) {
      dispatch(setCurrentId(""));
    }
    dispatch(updateSkill({ ...skill, expandChildren: !skill.expandChildren }));
  };

  const labelButton = skillState.editMode ? (
    <Input value={skillState.label} onChange={inputEditChangeHandler} />
  ) : (
    <Button onClick={buttonLabelHandler}>{skillState.label}</Button>
  );

  const controlButtons = (
    <>
      <Button onClick={toggleEditable}>
        {skillState.editMode ? <Save /> : <Edit />}
      </Button>
      {skill.expandChildren && (
        <Button onClick={toggleOrder}>
          {skill.isOrdered ? <FormatListNumbered /> : <FormatListBulleted />}
        </Button>
      )}

      <Button onClick={buttonDeleteHandler}>
        <Delete />
      </Button>
      <Button onClick={buttonAddHandler}>
        <Add />
      </Button>
    </>
  );

  return (
    <ButtonGroup
      onMouseEnter={buttonLabelEnterHandler}
      onMouseLeave={buttonLabelLeaveHandler}
    >
      {labelButton}
      {skillState.showControls && controlButtons}
    </ButtonGroup>
  );
};
