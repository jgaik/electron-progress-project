import React from "react";
import { Button, ButtonGroup, Form, FormGroup, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  updateEdit,
  toggleShowEdit,
  addSkillset,
  updateSkillset,
} from "../../store";
import { ButtonType } from "../../types";
import { FormPopUp } from "../common";
import { SkillList } from "./SkillList";

export const Edit: React.FC = () => {
  const { skillset, isNew, showEdit } = useAppSelector((state) => state.edit);
  const dispatch = useAppDispatch();

  const modalToggle = () => {
    dispatch(toggleShowEdit());
  };

  const buttonOrderHandler = (order: boolean) => {
    dispatch(updateEdit({ isOrdered: order }));
  };

  const popupTitle = isNew ? "Add new skillset" : "Edit skillset";
  const popupSubmit: ButtonType = isNew
    ? {
        name: "Save",
        onClickHandle: () => dispatch(addSkillset(skillset)),
      }
    : {
        name: "Update & Save",
        onClickHandle: () => dispatch(updateSkillset(skillset)),
      };

  const inputNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateEdit({ name: event.target.value }));
  };

  return (
    <FormPopUp
      isShown={showEdit}
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
            onChange={inputNameChangeHandler}
          />
        </FormGroup>
        <FormGroup>
          <ButtonGroup>
            <Button
              onClick={() => buttonOrderHandler(true)}
              active={skillset.isOrdered}
            >
              Ordered
            </Button>
            <Button
              onClick={() => buttonOrderHandler(false)}
              active={!skillset.isOrdered}
            >
              Unordered
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <SkillList />
        </FormGroup>
      </Form>
    </FormPopUp>
  );
};
