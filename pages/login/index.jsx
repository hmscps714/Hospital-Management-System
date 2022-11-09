import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import Login from "src/components/LoginComponent/login.js";

export const login = () => {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
};

export default login;
