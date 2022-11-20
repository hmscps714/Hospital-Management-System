import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table";
import { useState, useEffect } from "react";
import { getAllPatients } from "src/api/db";
import { userIsPractitioner, userIsAdmin } from "src/api/auth";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import { useRouter } from "next/router";

export const PatientList = () => {
  const router = useRouter();

  const [userIsAuthenticated, setUserIsAuthenticated] = useState(null);
  const [patientList, setPatientList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!patientList) {
      getAllPatients()
        .then((x) => setPatientList(x))
        .catch((e) => {
          console.error(e);
          setErr(e);
        });
    }

    if (userIsAuthenticated === null) {
      const adminPromise = userIsAdmin();
      const practitionerPromise = userIsPractitioner();

      Promise.all([adminPromise, practitionerPromise]).then((values) =>
        setUserIsAuthenticated(values[0] || values[1])
      );
    }
  }, [patientList, userIsAuthenticated]);

  const extractInfo = () => {
    const getName = (patientData) => {
      const basicInfo = patientData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (patientData) => {
      return patientData["personalContactInformation"]["email"];
    };

    const getPhone = (patientData) => {
      return patientData["personalContactInformation"]["phoneNumber"];
    };

    const getUID = (patientData) => {
      return patientData["uid"];
    };

    return patientList.map((p) => {
      const patientObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return patientObj;
    });
  };

  if (userIsAuthenticated === false) router.push("/not-autheticated");

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      {!userIsAuthenticated && <CustomLoader />}
      {userIsAuthenticated &&
        (err ? (
          <div className="errorMessage">{err.toString()}</div>
        ) : patientList ? (
          <Table
            buttonLabel={"Add Patient"}
            tableData={extractInfo()}
            routePath={"/patient-info/"}
            tableHeadings={"Patients List"}
          />
        ) : (
          <CustomLoader />
        ))}
    </ThemeProvider>
  );
};

export default PatientList;
