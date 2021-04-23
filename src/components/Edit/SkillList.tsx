import { Add, Close } from "@material-ui/icons";
import React, { useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import {
  createIndexString,
  extractParent,
  getLevel,
  getLevelLimits,
  shiftLevel,
} from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSkill, setCurrentId } from "../../store";
import { SkillListItem } from "./SkillListItem";

interface SkillListProps {
  parent?: string;
  expand?: boolean;
}

export const SkillList: React.FC<SkillListProps> = ({
  parent = null,
  expand = true,
}) => {
  const currentId = useAppSelector((state) => state.edit.currentId);
  const levels = useAppSelector((state) => state.edit.skillset.levels);

  const level = parent ? getLevel(parent) + 1 : 0;
  const levelLimits = getLevelLimits(levels, level);
  const skills = useAppSelector((state) => {
    const levelSkills = state.edit.skillset.skills.slice(
      levelLimits.start,
      levelLimits.end
    );
    return parent
      ? levelSkills.filter((skill) => extractParent(skill.id) === parent)
      : levelSkills;
  });
  const isOrdered = useAppSelector((state) => {
    return parent
      ? state.edit.skillset.skills.find((skill) => skill.id === parent)!
          .isOrdered
      : state.edit.skillset.isOrdered;
  });
  const elements = skills.map((skill) => (
    <li key={skill.id}>
      <SkillListItem skill={skill} />
      <SkillList parent={skill.id} expand={skill.expandChildren} />
    </li>
  ));

  const dispatch = useAppDispatch();
  const [skillNew, setSkillNew] = useState<string>("");

  const buttonAddHandler = () => {
    if (skillNew.trim().length > 0) {
      if (skills.length === 0) {
        dispatch(
          addSkill({
            id: createIndexString({ index: 0, parent }),
            name: skillNew,
            isOrdered,
            expandChildren: false,
          })
        );
      } else {
        const otherSkill = skills[skills.length - 1];
        dispatch(
          addSkill({
            id: shiftLevel(otherSkill.id, 1),
            name: skillNew,
            isOrdered,
            expandChildren: false,
          })
        );
      }
      setSkillNew("");
      if (!parent) {
        dispatch(setCurrentId(""));
      }
    }
  };

  const buttonCloseHandler = () => {
    if (skillNew.trim().length === 0) {
      dispatch(setCurrentId(""));
    }
  };

  const inputAddChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkillNew(event.target.value);
  };

  const addItemButtons = (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <Button onClick={buttonAddHandler}>
          <Add />
        </Button>
      </InputGroupAddon>
      <Input
        placeholder="Skill name"
        value={skillNew}
        onChange={inputAddChangeHandler}
      />
      {parent && (
        <InputGroupAddon addonType="append">
          <Button onClick={buttonCloseHandler}>
            <Close />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );

  return (
    <div>
      {skills.length > 0 &&
        expand &&
        (isOrdered ? <ol>{elements}</ol> : <ul>{elements}</ul>)}
      {parent ? currentId === parent && addItemButtons : addItemButtons}
    </div>
  );
};
