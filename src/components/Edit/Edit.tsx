import React from "react";
import { Button, ButtonGroup, Form, FormGroup, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateSkillset, toggleShowEdit } from "../../store";
import { ButtonType } from "../../types";
import { FormPopUp } from "../common";
import { SkillsetList } from "./SkillsetList";

export const Edit: React.FC = () => {
  const { skillset, isNew, showEdit } = useAppSelector((state) => state.edit);
  const dispatch = useAppDispatch();

  const modalToggle = () => {
    dispatch(toggleShowEdit());
  };

  const buttonOrderHandler = (order: boolean) => {
    dispatch(updateSkillset({ isOrdered: order }));
  };

  const popupTitle = isNew ? "Add new skillset" : "Edit skillset";
  const popupSubmit: ButtonType = isNew
    ? { name: "Save" }
    : { name: "Update & Save" };

  const inputNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateSkillset({ name: event.target.value }));
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
          <SkillsetList key="" skillset={skillset} />
        </FormGroup>
      </Form>
    </FormPopUp>
  );
};
