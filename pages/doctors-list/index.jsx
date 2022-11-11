import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import { useState, useEffect } from "react";
import { getAllDoctors } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";



export const DoctorsList = () => {

  const [doctorsList, setdoctorsList] = useState(null)

  // const getAndSetdoctorsList = async () => {
  //   const l = await getAllDocto();
  //   setdoctorsList(l);
  // }

  useEffect(() => {
    if (!doctorsList) {
      getAllDoctors().then(x => setdoctorsList(x)).catch(e => console.log(e))
    }
  }, [doctorsList])

  const extractInfo = () => {
    // const columns = Object.keys(doctorsList).map((key, id)=>{
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

    const getUID = (patientData) => {
      return patientData['uid']
    }

    return doctorsList.map(p => {
      const doctorObj = {
        "name": getName(p),
        "email": getEmail(p),
        "phone": getPhone(p),
        "uid": getUID(p)
      }
      return doctorObj
    })
  }


    return (
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <h1 style={{textAlign: "center"}}>Doctors List</h1>
        {doctorsList ?  <Table tableData={extractInfo()}/>  : <CustomLoader/>}
        {console.log(doctorsList)}

      </ThemeProvider>
      
    );
  };

export default DoctorsList;