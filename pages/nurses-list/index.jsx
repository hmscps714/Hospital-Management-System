import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table";
import { useState, useEffect } from "react";
import { getAllNurses } from "src/api/db";
import { useRouter } from "next/router";
import { userIsAdmin } from "src/api/auth";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const NursesList = () => {
  const router = useRouter();

  const [userIsAuthenticated, setUserIsAuthenticated] = useState(null);
  const [nursesList, setNursesList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!nursesList) {
      getAllNurses()
        .then((x) => {
          setNursesList(x);
        })
        .catch((e) => {
          console.error(e);
          setErr(e);
        });
    }

    if (userIsAuthenticated === null) {
      userIsAdmin().then((x) => setUserIsAuthenticated(x));
    }
  }, [nursesList, userIsAuthenticated]);

  const extractInfo = () => {
    const getName = (nurseData) => {
      const basicInfo = nurseData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (nurseData) => {
      return nurseData["personalContactInformation"]["email"];
    };

    const getPhone = (nurseData) => {
      return nurseData["personalContactInformation"]["phoneNumber"];
    };

    const getUID = (nurseData) => {
      return nurseData["uid"];
    };

    return nursesList.map((p) => {
      const nurseObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return nurseObj;
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
        ) : nursesList ? (
          <Table
            buttonLabel={"Add Nurse"}
            tableData={extractInfo()}
            routePath={"/practitioner-info/"}
            tableHeadings={"Nurses List"}
          />
        ) : (
          <CustomLoader />
        ))}
    </ThemeProvider>
  );
};

export default NursesList;
