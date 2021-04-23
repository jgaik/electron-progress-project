import { FormatListBulleted, FormatListNumbered } from "@material-ui/icons";
import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
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
        <Row form>
          <Col>
            <FormGroup>
              <Input
                placeholder="Skillset name"
                type="text"
                value={skillset.name}
                onChange={inputNameChangeHandler}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <ButtonGroup>
                <Button
                  onClick={() => buttonOrderHandler(true)}
                  active={skillset.isOrdered}
                >
                  <FormatListNumbered />
                </Button>
                <Button
                  onClick={() => buttonOrderHandler(false)}
                  active={!skillset.isOrdered}
                >
                  <FormatListBulleted />
                </Button>
              </ButtonGroup>
            </FormGroup>
          </Col>
        </Row>
        <SkillList />
      </Form>
    </FormPopUp>
  );
};
