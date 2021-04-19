import React, { useState } from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import {
  createIndexString,
  createSkillset,
  extractIndex,
  extractParent,
} from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSkillset, setCurrentId } from "../../store";
import { SkillsetType } from "../../types";
import { SkillsetListItem } from "./SkillsetListItem";

interface SkillsetListProps {
  skillset: SkillsetType;
  hasParent?: boolean;
}

export const SkillsetList: React.FC<SkillsetListProps> = ({
  skillset,
  hasParent = false,
}) => {
  const currentId = useAppSelector((state) => state.edit.currentId);
  const skillsets = skillset.skillsets;
  const elements = (skillsets: SkillsetType[]) =>
    skillsets.map((skillset) => (
      <li key={skillset.id}>
        <SkillsetListItem id={skillset.id} name={skillset.name} />
        <SkillsetList hasParent={true} skillset={skillset} />
      </li>
    ));

  const dispatch = useAppDispatch();
  const [skillNew, setSkillNew] = useState<string>("");

  const buttonAddHandler = () => {
    if (skillNew.trim().length > 0) {
      if (skillsets.length === 0) {
        dispatch(
          addSkillset(
            createSkillset(
              createIndexString(0, hasParent ? skillset.id : null),
              skillNew,
              skillset.isOrdered
            )
          )
        );
      } else {
        const otherSkillset = skillsets[skillsets.length - 1];
        dispatch(
          addSkillset(
            createSkillset(
              createIndexString(
                extractIndex(otherSkillset.id) + 1,
                extractParent(otherSkillset.id)
              ),
              skillNew,
              otherSkillset.isOrdered
            )
          )
        );
      }
      setSkillNew("");
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
        <Button onClick={buttonAddHandler}>+</Button>
      </InputGroupAddon>
      <Input
        placeholder="Skill name"
        value={skillNew}
        onChange={inputAddChangeHandler}
      />
      {hasParent && (
        <InputGroupAddon addonType="append">
          <Button onClick={buttonCloseHandler}>x</Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );

  return (
    <div>
      {skillsets.length > 0 &&
        (skillset.isOrdered ? (
          <ol>{elements(skillsets)}</ol>
        ) : (
          <ul>{elements(skillsets)}</ul>
        ))}
      {hasParent ? currentId === skillset.id && addItemButtons : addItemButtons}
    </div>
  );
};
