import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/NavbarHome";
import PatientForms from "src/components/forms/DoctorRegisterForm.jsx";
import theme from "src/config/theme";

export const Forms = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <PatientForms />
    </ThemeProvider>
  ); 
};

export default Forms;