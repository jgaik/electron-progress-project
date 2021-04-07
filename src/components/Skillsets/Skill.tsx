import React from "react";
import { Button, Card, CardBody, CardText, CardTitle, Media } from "reactstrap";
import { SkillType } from "../../types";

interface SkillProps {
  skill: SkillType;
}

export const Skill: React.FC<SkillProps> = ({ skill }) => {
  return (
    <Card className="skill">
      {skill.isDone ? (
        <>
          <CardBody>
            <CardTitle>{skill.name}</CardTitle>
          </CardBody>
          <Media
            object
            data-src={skill.media}
            alt={`${skill.name} media file`}
          />
          <CardBody>
            <CardText> Last updated: {skill.lastDate.getDate()}</CardText>
          </CardBody>
        </>
      ) : (
        <>
          <CardBody>
            <CardTitle>{skill.name}</CardTitle>
          </CardBody>
          <CardBody>
            <CardText> Not completed yet </CardText>
          </CardBody>
        </>
      )}
      <Button>Update</Button>
    </Card>
  );
};
