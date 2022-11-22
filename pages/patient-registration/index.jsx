import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import PatientRegisterForm from "src/components/forms/PatientRegisterForm";
import theme from "src/config/theme";

export const PatientRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <PatientRegisterForm />
    </ThemeProvider>
  );
};

export default PatientRegistration;
