import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllDoctors } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";
import styles from "./doctors.module.css";

export const DoctorsList = () => {

  const [doctorsList, setdoctorsList] = useState(null);
  const [err, setErr] = useState(null);
  const router = useRouter();

  // const getAndSetdoctorsList = async () => {
  //   const l = await getAllDocto();
  //   setdoctorsList(l);
  // }

  useEffect(() => {
    if (!doctorsList) {
      getAllDoctors()
      .then(x => {
        setdoctorsList(x);
      })
      .catch(e => {
        console.error(e);
        setErr(e);
      })
    }
  }, [doctorsList])

  const extractInfo = () => {
    // const columns = Object.keys(doctorsList).map((key, id)=>{
    //   return {
    //     Header: key,
    //     accessor: key
    //   }
    // })

    const getName = (doctorData
    ) => {
      const basicInfo = doctorData
    ['basicInformation']
      return basicInfo['firstName'] + " " + basicInfo['lastName']
    }

    const getEmail = (doctorData
    ) => {
      return doctorData
    ['emergencyContactInformation']['email']
    }

    const getPhone = (doctorData
    ) => {
      return doctorData
    ['emergencyContactInformation']['phoneNumber']
    }

    const getUID = (doctorData
    ) => {
      return doctorData
    ['uid']
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
        <h1 className={styles.Heading} style={{textAlign: "center"}}>Doctors List</h1>
        { err ? <div className="errorMessage">{err.toString()}</div>: doctorsList ? 
        <Table buttonLabel={'Add Doctor'} tableData={extractInfo()} routePath={'/practitioner-info/'} /> : <CustomLoader/>}
        {console.log(doctorsList)}
      </ThemeProvider>
      
    );
  };

export default DoctorsList;