import React from "react";
import { Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { OrderEnum, SkillType } from "../../types";
import { OrderedList } from "./OrderedList";
import { UnorderedList } from "./UnorderedList";

interface SkillListProps {
  levels: number;
  skills: SkillType[];
  orderType: OrderEnum;
}

export const SkillList: React.FC<SkillListProps> = ({
  levels,
  skills,
  orderType,
}) => {
  const listCreator = () => {
    switch (orderType) {
      case OrderEnum.Ordered:
        return (
          <OrderedList
            items={skills.map((skill) => ({
              key: skill.id.toString(),
              value: skill.name,
            }))}
          />
        );
      case OrderEnum.Unordered:
        return (
          <UnorderedList
            items={skills.map((skill) => ({
              key: skill.id.toString(),
              value: skill.name,
            }))}
          />
        );
      default:
        return <div />;
    }
  };
  return (
    <div>
      {listCreator()}
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <Button>Add item</Button>
        </InputGroupAddon>
        <Input />
      </InputGroup>
    </div>
  );
};
