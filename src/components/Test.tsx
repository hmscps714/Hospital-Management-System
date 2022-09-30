import React from "react";
import Button from "@mui/material/Button";

interface TestProps {
  name: string;
  heightInCm: number;
}

export const Test = (props: TestProps) => {
  return (
    <div>
      <h1>Hello Worlddfgfgfgfg</h1>
      <Button variant="contained">Hello Button</Button>
    </div>
  );
};
