import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import Table from 'src/components/Tables/Table.js';
import { useState, useEffect } from "react";
import { getAllPatients } from "src/api/db";
import { CustomLoader } from "../../src/components/CustomLoader/CustomLoader";


export const PatientList = () => {
    const [patientList, setPatientList] = useState(null)

    // const getAndSetPatientList = async () => {
    //   const l = await getAllPatients();
    //   setPatientList(l);
    // }

    useEffect(() => {
      if (!patientList) {
        getAllPatients().then(x => setPatientList(x)).catch(e => console.log(e))
      }
    }, [patientList])

    const extractInfo = () => {
      // const columns = Object.keys(patientList).map((key, id)=>{
      //   return {
      //     Header: key,
      //     accessor: key
      //   }
      // })

      const getName = (patientData) => {
        const basicInfo = patientData['basicInformation']
        return basicInfo['firstName'] + " " + basicInfo['lastName']
      }

      const getEmail = (patientData) => {
        return patientData['emergencyContactInformation']['email']
      }

      const getPhone = (patientData) => {
        return patientData['emergencyContactInformation']['phoneNumber']
      }

      return patientList.map(p => {
        const patientObj = {
          "name": getName(p),
          "email": getEmail(p),
          "phone": getPhone(p)
        }
        return patientObj
      })
    }

    return (
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <h1 style={{textAlign: "center"}}>Patients List</h1>
        {patientList ?  <Table tableData={extractInfo()}/>  : <CustomLoader/>}
        {console.log(patientList)}
      </ThemeProvider>
      
    );
  };
  
  export default PatientList;
  