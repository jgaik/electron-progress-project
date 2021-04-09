import React, { useState } from "react";
import { Button, ButtonGroup, Form, FormGroup, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setShowAdd } from "../../store";
import { ButtonType, OrderEnum, SkillsetType } from "../../types";
import { FormPopUp } from "../common";

export const AddSkillset: React.FC = () => {
  const showAdd = useAppSelector((state) => state.skillsets.showAdd);
  const skillsetsCount = useAppSelector((state) => state.skillsets.count);
  const updateSkillset = useAppSelector((state) => state.update.skillset);
  const dispatch = useAppDispatch();

  const modalToggle = () => {
    dispatch(setShowAdd(!showAdd));
  };

  const [skillset, setSkillset] = useState<SkillsetType>(
    updateSkillset
      ? updateSkillset
      : {
          id: skillsetsCount,
          name: "",
          skills: [],
          progress: 0,
          order: OrderEnum.Ordered,
          levels: 0,
        }
  );

  const buttonOrderHandler = (order: OrderEnum) => {
    setSkillset({ ...skillset, order });
  };

  const popupTitle = updateSkillset ? "Edit skillset" : "Add new skillset";
  const popupSubmit: ButtonType = updateSkillset
    ? { name: "Update & Save" }
    : { name: "Save" };

  return (
    <FormPopUp
      isShown={showAdd}
      showToggle={modalToggle}
      title={popupTitle}
      buttonSubmit={popupSubmit}
    >
      <Form>
        <FormGroup>
          <Input
            placeholder="Skillset name"
            type="text"
            value={skillset.name}
          />
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              onClick={() => buttonOrderHandler(OrderEnum.Ordered)}
              active={skillset.order === OrderEnum.Ordered}
            >
              {OrderEnum.Ordered}
            </Button>
            <Button
              onClick={() => buttonOrderHandler(OrderEnum.Unordered)}
              active={skillset.order === OrderEnum.Unordered}
            >
              {OrderEnum.Unordered}
            </Button>
            <Button
              onClick={() => buttonOrderHandler(OrderEnum.Hierarchy)}
              active={skillset.order === OrderEnum.Hierarchy}
            >
              {OrderEnum.Hierarchy}
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup></FormGroup>
      </Form>
    </FormPopUp>
  );
};
