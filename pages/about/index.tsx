import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";

export const Login = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
    </ThemeProvider>
  );
};

export default Login;
