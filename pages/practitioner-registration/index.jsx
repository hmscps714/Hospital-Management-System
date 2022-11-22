import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import PractitionerRegisterForm from "src/components/forms/PractitionerRegisterForm";

import theme from "src/config/theme";

export const PractitionerRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <PractitionerRegisterForm />
    </ThemeProvider>
  );
};

export default PractitionerRegistration;
