import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
//import { signInPatient, signInPractitioner } from "src/api/auth";

export const PatientInfo = () => {
  const router = useRouter();

  const dummy_patient: Patient = {
    basicInformation: {
      firstName: "bob",
      lastName: "smith",
      dob: new Date("12/24/2000"),
      healthCardNumber: 1234,
      gender: "male",
    },
    personalContactInformation: {
      email: "bobsmith@test.com",
      password: new Date("12/24/2000").toLocaleDateString("en-US"),
      phoneNumber: "123-456-7890",
      homeAddress: "350 victoria st",
    },
    emergencyContactInformation: {
      name: "john",
      relationshipToPatient: "sugar daddy",
      phoneNumber: "911",
      email: "john@pornhub.com",
    },
    physicianInformation: {
      physicianName: "johnny sins",
      clinicName: "redtube",
      clinicAddress: "idk",
      clinicPhone: "987-654-3210",
    },
  };

  const { patientID } = router.query;

  useEffect(() => {
    if (!patientID) {
      return;
    }
    // const fetchSomethingById = async () => {
    //   const response = await fetch(`/api/something/${patientID}`);
    // };
    // fetchSomethingById();
    console.log(patientID);
  }, [patientID]);

  // console.log(patientID);
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      The id is {patientID}
      <DetailedPatientInfo patientData={dummy_patient}></DetailedPatientInfo>
    </ThemeProvider>
  );
};

export default PatientInfo;
