import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Patient } from "src/config/interfaces";
import { PatientDash } from "src/components/dashboards/PatientDash";
import { getPatient } from "src/api/db";

import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";

export const PatientInfo = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!loading) {
      //Perform these checks when done loading
      console.log("hello from patient dashboard!");
      console.log(authUser, authUserType, loading);
      if (!authUser || (authUser && authUserType && authUserType !== "patient")) {
        //If user not logged in or not the right user type, we redirect
        console.log("redirecting from patient dashboard!");
        router.push("/login");
      } else if (authUser && authUserType === "patient") {
        //Fetch data if user is logged in and is the right account type
        const getAndSetPatient = async () => {
          await getPatient(authUser.uid as string)
            .then((p) => setPatient(p))
            .catch((e) => {
              console.error(e);
              setErr(e);
            });
        };
        if (!authUser) return;
        getAndSetPatient();
      }
    }
  }, [loading, authUser, authUserType]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patient && !err ? (
          <div>
            <PatientDash patientData={patient} />
          </div>
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PatientInfo;
