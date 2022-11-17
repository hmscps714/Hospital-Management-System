import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import { useState, useEffect } from "react";
import { getAllPatients } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import styles from "./patients.module.css";

export const PatientList = () => {
    const [patientList, setPatientList] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
      if (!patientList) {
        getAllPatients()
        .then(x => setPatientList(x))
        .catch(e => {
          console.error(e);
          setErr(e)
        })
      }
    }, [patientList])

    const extractInfo = () => {
      const getName = (patientData) => {
        const basicInfo = patientData['basicInformation']
        return basicInfo['firstName'] + " " + basicInfo['lastName']
      }

      const getEmail = (patientData) => {
        return patientData['personalContactInformation']['email']
      }

      const getPhone = (patientData) => {
        return patientData['personalContactInformation']['phoneNumber']
      }

      const getUID = (patientData) => {
        return patientData['uid']
      }

      return patientList.map(p => {
        const patientObj = {
          "name": getName(p),
          "email": getEmail(p),
          "phone": getPhone(p),
          "uid": getUID(p)
        }
        return patientObj
      })
    }

    return (
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <h1 className={styles.heading} style={{textAlign: "center"}}>Patients List</h1>
        { err ? <div className="errorMessage" >{err.toString()}</div> : patientList ?  
        <Table buttonLabel={'Add Patient'} tableData={extractInfo()} routePath={'/patient-info/'} />  : <CustomLoader/>}
      </ThemeProvider>
      
    );
  };
  
  export default PatientList;
  