import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button, CardGroup, Collapse } from "reactstrap";
import { SkillsetType } from "../../types";
import { Skill } from ".";

interface SkillsetProps {
  skillset: SkillsetType;
}

export const Skillset: React.FC<SkillsetProps> = ({ skillset }) => {
  const [showSkills, setShowSkills] = useState<boolean>(false);

  const progress = skillset.skills.filter((skill) => skill.isDone).length * 100;
  const progressText =
    skillset.skills.length > 0 ? `${progress / skillset.skills.length}%` : "0%";

  const handleButtonClick = () => setShowSkills(!showSkills);

  return (
    <div className="skillset">
      <div className="skillset-bar">
        <Button onClick={handleButtonClick}> {skillset.name} </Button>
        <CircularProgressbar value={progress} text={progressText} />
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
