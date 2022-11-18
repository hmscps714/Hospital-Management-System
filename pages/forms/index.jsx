import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import PatientForms from "src/components/forms/DoctorRegisterForm";
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
