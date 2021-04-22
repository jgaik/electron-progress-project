import React from "react";
import "../styles/App.css";
import { ControlBar, Dashboard } from ".";
import { Edit } from "./Edit";

export const App: React.FC = () => {
  return (
    <div>
      <ControlBar />
      <Dashboard />
      <Edit />
    </div>
  );
};
