import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import DoctorForms from "src/components/forms/DoctorRegisterForm.jsx";
import theme from "src/config/theme";

export const Forms = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <DoctorForms />
    </ThemeProvider>
  );
};

export default Forms;