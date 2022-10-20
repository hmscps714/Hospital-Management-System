import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";

export const Login = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};

export default Login;
