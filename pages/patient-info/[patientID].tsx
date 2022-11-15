import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Patient } from "src/config/interfaces";
import { DetailedPatientInfo } from "src/components/PatientInfo/DetailedPatientInfo";
import styles from "./patient-info.module.css";
import { getPatient } from "src/api/db";

import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const PatientInfo = () => {
  const router = useRouter();
  const { patientID } = router.query;

  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!patientID) {
      return;
    }

    getPatient(patientID as string)
      .then((p) => setPatient(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [patientID]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.Title}>Patient Information</h1>
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patient && !err ? (
          <div>
            <DetailedPatientInfo patientData={patient} />
            <div className={styles.Appointment}>
              <h2>Appointment information</h2>
              WIP
            </div>
          </div>
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PatientInfo;
