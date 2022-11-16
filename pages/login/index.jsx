import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import Login from "src/components/LoginComponent/Login";

import { NavbarHome } from "src/components/Navbar/NavbarHome";

export const login = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <Login />
    </ThemeProvider>
  );
};

export default login;
