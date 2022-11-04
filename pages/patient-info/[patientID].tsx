import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
import styles from "./patient-info.module.css";
import { getPatient } from "src/api/db";

export const PatientInfo = () => {
  const router = useRouter();
  const { patientID } = router.query;

  const [patient, setPatient] = useState<Patient>(null);

  const getAndSetPatient = async () => {
    const p = await getPatient(patientID as string);
    setPatient(p);
  };

  useEffect(() => {
    if (!patientID) {
      return;
    }

    getAndSetPatient();
  }, [patientID]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.Title}>Patient's Information {patientID}</h1>
      <div>
        {patient ? <DetailedPatientInfo patientData={patient} /> : <h6>loading</h6>}
        <div className={styles.Appointment}>
          <h2>Appointment information</h2>
          WIP
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PatientInfo;
