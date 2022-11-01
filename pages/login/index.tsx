import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import { signInPatient, signInPractitioner } from "src/api/auth";

export const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
    </ThemeProvider>
  );
};

export default Login;
