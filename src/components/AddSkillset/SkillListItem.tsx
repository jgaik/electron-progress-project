import React from "react";
import { ButtonGroup, Button } from "reactstrap";

interface SkillListItemProps {
  label: string;
  enableAdd?: boolean;
}

export const SkillListItem: React.FC<SkillListItemProps> = ({
  label,
  enableAdd = false,
}) => {
  return (
    <ButtonGroup>
      <Button>{label}</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
      {enableAdd && <Button>Add level</Button>}
    </ButtonGroup>
  );
};
