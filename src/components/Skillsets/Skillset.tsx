import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button, ButtonGroup, CardGroup, Collapse } from "reactstrap";
import { SkillsetType } from "../../types";
import { Skill } from ".";
import { useAppDispatch } from "../../hooks";
import { toggleShowEdit } from "../../store";
import { MoreVert } from "@material-ui/icons";

import "react-circular-progressbar/dist/styles.css";

export interface SkillsetProps {
  skillset: SkillsetType;
}

export const Skillset: React.FC<SkillsetProps> = ({ skillset }) => {
  const dispatch = useAppDispatch();
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const progress = Math.round(skillset.progress * 100);
  const progressText = `${progress} %`;

  const buttonNameHandler = () => setShowSkills(!showSkills);
  const buttonEditHandler = () => {
    dispatch(toggleShowEdit(skillset));
  };

  return (
    <div className="skillset">
      <div className="skillset-bar">
        <ButtonGroup>
          <Button onClick={buttonNameHandler}> {skillset.name} </Button>
          <CircularProgressbar value={progress} text={progressText} />
          {showSkills && (
            <Button onClick={buttonEditHandler}>
              <MoreVert />
            </Button>
          )}
        </ButtonGroup>
      </div>
      <Collapse isOpen={showSkills}>
        <CardGroup className="skills">
          {skillset.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} />
          ))}
        </CardGroup>
      </Collapse>
    </div>
  );
};
