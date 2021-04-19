import React from "react";
import { Button } from "reactstrap";
import { useAppDispatch } from "../hooks";
import { toggleShowEdit } from "../store";
import "../styles/App.css";
import { Edit } from "./Edit";

export const App = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(toggleShowEdit())} />
      <Edit />
    </div>
  );
};
