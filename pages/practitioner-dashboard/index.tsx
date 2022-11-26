import React, { useState } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Practitioner } from "src/config/interfaces";
import { DoctorDash } from "src/components/dashboards/DoctorDash";
import { getPractitioner } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useAuth } from "src/context/AuthUserContext";

export const DoctorInfo = () => {
  const router = useRouter();
  const { authUser, loading, authUserType } = useAuth();
  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!loading) {
      //Perform these checks when done loading
      console.log("hello from practitioner dashboard!");
      console.log(authUser, authUserType, loading);
      if (!authUser || (authUser && authUserType && authUserType !== "practitioner")) {
        //If user not logged in or not the right user type, we redirect
        console.log("redirecting from practitioner dashboard!");
        router.push("/login");
      } else if (authUser && authUserType === "practitioner") {
        //Fetch data if user is logged in and is the right account type
        const getAndSetPractitioner = async () => {
          await getPractitioner(authUser.uid as string)
            .then((p) => setPractitioner(p))
            .catch((e) => {
              console.error(e);
              setErr(e);
            });
        };
        if (!authUser) return;
        getAndSetPractitioner();
      }
    }
  }, [loading, authUser, authUserType]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : practitioner && !err ? (
          <DoctorDash doctorData={practitioner} />
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default DoctorInfo;
