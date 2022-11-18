import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllDoctors } from "src/api/db";
import { CustomLoader } from "src/components/CustomLoader/CustomLoader";

export const DoctorsList = () => {
  const [doctorsList, setdoctorsList] = useState(null);
  const [err, setErr] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!doctorsList) {
      getAllDoctors()
        .then((x) => {
          setdoctorsList(x);
        })
        .catch((e) => {
          console.error(e);
          setErr(e);
        });
    }
  }, [doctorsList]);

  const extractInfo = () => {
    const getName = (doctorData) => {
      const basicInfo = doctorData["basicInformation"];
      return basicInfo["firstName"] + " " + basicInfo["lastName"];
    };

    const getEmail = (doctorData) => {
      return doctorData["emergencyContactInformation"]["email"];
    };

    const getPhone = (doctorData) => {
      return doctorData["emergencyContactInformation"]["phoneNumber"];
    };

    const getUID = (doctorData) => {
      return doctorData["uid"];
    };

    return doctorsList.map((p) => {
      const doctorObj = {
        name: getName(p),
        email: getEmail(p),
        phone: getPhone(p),
        uid: getUID(p),
      };
      return doctorObj;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      { err ? <div className="errorMessage">{err.toString()}</div>: doctorsList ? 
      <Table buttonLabel={'Add Doctor'} tableData={extractInfo()} routePath={'/practitioner-info/'} tableHeadings={'Doctors List'} /> : <CustomLoader/>}
    </ThemeProvider>
    
  );
  }

export default DoctorsList;
