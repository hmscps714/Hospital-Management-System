import React from "react";
import { registerPatient } from "src/api/auth";
import { getAllPatients } from "src/api/db";
import { patient, patient2 } from "src/config/dummy";

import { Practitioner } from "src/config/interfaces";
import { Login } from "src/config/interfaces";
import { registerPractitioner } from "src/api/auth";

export const Test = () => {
  // async function asdf() {
  //   const patients = await getAllPatients();
  //   console.log(patients);
  // }

  const addDummyPractitioner = () => {
    const dummy_practitioner: Practitioner = {
      basicInformation: {
        firstName: "james",
        lastName: "charles",
        dob: new Date("11/11/2000"),
        healthCardNumber: 1230,
        gender: "male",
      },
      personalContactInformation: {
        email: "jejejej@test.com",
        phoneNumber: "2309429348092384",
        homeAddress: "sdfoiaiowejioj st ",
      },
      emergencyContactInformation: {
        name: "xnfke",
        relationshipToPatient: "sugar daddy",
        phoneNumber: "11123123123",
        email: "hohohohohohohoh@gmail.com",
      },
      fieldSpecialty: "doctor",
    };

    const dummy_login: Login = {
      email: "jejejej@test.com",
      password: "password",
    };

    registerPractitioner(dummy_login, dummy_practitioner)
      .then((x) => console.log(x))
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>hello world</h1>
      <button onClick={addDummyPractitioner}>test</button>
    </div>
  );
};

export default Test;
