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
import ButtonList from "src/components/ButtonList/ButtonList";

export const DoctorInfo = () => {
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
    <>
      <ButtonList />
      {err ? (
        <div className="errorMessage">{err.toString()}</div>
      ) : practitioner && !err ? (
        <DoctorDash doctorData={practitioner} />
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default DoctorInfo;
