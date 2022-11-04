import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Practitioner } from "src/config/interfaces";
import { DetailedPractitionerInfo } from "src/components/PractitionerInfo/DetailedPractitionerInfo";
//import { signInPatient, signInPractitioner } from "src/api/auth";
import styles from "./practitioner-info.module.css";

export const PractitionerInfo = () => {
  const router = useRouter();

  const dummy_practitioner: Practitioner = {
    basicInformation: {
      firstName: "bob",
      lastName: "smith",
      dob: new Date("12/24/2000"),
      healthCardNumber: 1234,
      gender: "male",
    },
    personalContactInformation: {
      email: "bobsmith@test.com",
      // password: new Date("12/24/2000").toLocaleDateString("en-US"),
      phoneNumber: "123-456-7890",
      homeAddress: "350 victoria st",
    },
    emergencyContactInformation: {
      name: "john",
      relationshipToPatient: "sugar daddy",
      phoneNumber: "911",
      email: "john@pornhub.com",
    },
    fieldSpecialty: "Registered Nurse",
  };

  const { practitionerID } = router.query;

  useEffect(() => {
    if (!practitionerID) {
      return;
    }
    // const fetchSomethingById = async () => {
    //   const response = await fetch(`/api/something/${patientID}`);
    // };
    // fetchSomethingById();
    console.log(practitionerID);
  }, [practitionerID]);

  // console.log(patientID);
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.Title}>Practitioner's Information {practitionerID}</h1>
      <div>
        <DetailedPractitionerInfo practitionerData={dummy_practitioner}></DetailedPractitionerInfo>
      </div>
    </ThemeProvider>
  );
};

export default PractitionerInfo;
