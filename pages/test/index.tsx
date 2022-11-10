import React from "react";
import { registerPatient } from "src/api/auth";
import { getAllPatients } from "src/api/db";
import { patient, patient2 } from "src/config/dummy";

export const Test = () => {
  async function asdf() {
    const patients = await getAllPatients();
    console.log(patients);
  }

  return (
    <div>
      <h1>hello world</h1>
      <button onClick={asdf}>test</button>
    </div>
  );
};

export default Test;
