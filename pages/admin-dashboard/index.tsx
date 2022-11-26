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

export const AdminDashboard = () => {
  const { authUser, loading, authUserType } = useAuth();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (loading) return;
    if (!authUser || authUserType !== "admin") {
      router.push("/401");
      return;
    }

    //Todo fetch admin data??
    // getPatient(authUser.uid as string)
    //   .then((p) => setPatient(p))
    //   .catch((e) => {
    //     console.error(e);
    //     setErr(e);
    //   });
  }, [loading, authUser, authUserType]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <div>
        <h1>Admin dash</h1>
        {/* {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patient && !err ? (
          <div>
            <PatientDash patientData={patient} />
          </div>
        ) : (
          <CustomLoader />
        )} */}
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;
