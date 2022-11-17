import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import { useState, useEffect } from "react"
import { getAllNurses } from "src/api/db"
import {CustomLoader} from "src/components/CustomLoader/CustomLoader"
import styles from "./nurses.module.css";

export const NursesList = () => {
  const [nursesList, setNursesList] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!nursesList) {
      getAllNurses()
      .then(x => {
        setNursesList(x);
      })
      .catch(e => {
        console.error(e);
        setErr(e);
      })
    }
  }, [nursesList])

  const extractInfo = () => {
    const getName = (nurseData) => {
      const basicInfo = nurseData['basicInformation']
      return basicInfo['firstName'] + " " + basicInfo['lastName']
    }

    const getEmail = (nurseData) => {
      return nurseData['personalContactInformation']['email']
    }

    const getPhone = (nurseData) => {
      return nurseData['personalContactInformation']['phoneNumber']
    }

    const getUID = (nurseData) => {
      return nurseData['uid']
    }    

    return nursesList.map(p => {
      const nurseObj = {
        "name": getName(p),
        "email": getEmail(p),
        "phone": getPhone(p),
        "uid": getUID(p)
      }
      return nurseObj
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.heading} style={{textAlign: "center"}}>Nurses List</h1>
      { err ? <div className="errorMessage">{err.toString()}</div>: nursesList ? 
      <Table buttonLabel={'Add Nurse'} tableData={extractInfo()} routePath={'/practitioner-info/'} /> : <CustomLoader/>}
    </ThemeProvider>
  );
};

export default NursesList;