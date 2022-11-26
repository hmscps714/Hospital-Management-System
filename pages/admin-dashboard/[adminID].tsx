import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AdminDash } from "src/components/dashboards/AdminDash";
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
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patient && !err ? (
          <div>
            <AdminDash/>
          </div>
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PatientInfo;
