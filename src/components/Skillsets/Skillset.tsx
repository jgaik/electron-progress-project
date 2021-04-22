import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button, CardGroup, Collapse } from "reactstrap";
import { SkillsetType } from "../../types";
import { Skill } from ".";

export interface SkillsetProps {
  skillset: SkillsetType;
}

export const Skillset: React.FC<SkillsetProps> = ({ skillset }) => {
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const progressText = `${Math.round(skillset.progress * 100)} %`;

  const handleButtonClick = () => setShowSkills(!showSkills);

  return (
    <div className="skillset">
      <div className="skillset-bar">
        <Button onClick={handleButtonClick}> {skillset.name} </Button>
        <CircularProgressbar value={skillset.progress} text={progressText} />
        {showSkills && <Button>Edit skillset</Button>}
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
