import React from "react";
import { useAppSelector } from "../hooks";
import { Skillset } from "./Skillsets";

export const Dashboard: React.FC = () => {
  const skillsets = useAppSelector((state) => state.skillsets.skillsets);
  return (
    <>
      {skillsets.map((skillset) => (
        <Skillset key={skillset.id} skillset={skillset} />
      ))}
    </>
  );
};
