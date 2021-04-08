import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setShowAdd } from "../../store";
import { OrderEnum, SkillsetType } from "../../types";

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
        }
  );

  const buttonOrderHandler = (order: OrderEnum) => {
    setSkillset({ ...skillset, order });
  };

  return (
    <Modal isOpen={showAdd} toggle={modalToggle}>
      <ModalHeader toggle={modalToggle}>Skillset</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input
              placeholder="Skillset name"
              type="text"
              invalid={skillset.name.trim().length === 0}
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button>ok</Button>
      </ModalFooter>
    </Modal>
  );
};
