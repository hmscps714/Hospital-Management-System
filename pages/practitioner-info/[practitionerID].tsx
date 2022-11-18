import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";

import { Practitioner } from "src/config/interfaces";
import { DetailedPractitionerInfo } from "src/components/PractitionerInfo/DetailedPractitionerInfo";
import styles from "./practitioner-info.module.css";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { getPractitioner } from "src/api/db";

export const PractitionerInfo = () => {
  const router = useRouter();
  const { practitionerID } = router.query;
  const [practitioner, setPractitioner] = useState<Practitioner>(null);
  const [err, setErr] = useState<Error>(null);

  useEffect(() => {
    if (!practitionerID) {
      return;
    }
    getPractitioner(practitionerID as string)
      .then((p) => setPractitioner(p))
      .catch((e) => {
        console.error(e);
        setErr(e);
      });
  }, [practitionerID]);

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.Title}>Practitioner Information</h1>
      <div>
        {err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : practitioner && !err ? (
          <DetailedPractitionerInfo practitionerData={practitioner}></DetailedPractitionerInfo>
        ) : (
          <CustomLoader />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PractitionerInfo;
