import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";

export const about = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1>Status code 401: You do not have permission to view this</h1>
      <h1>STYLE ME PLZ TY</h1>
    </ThemeProvider>
  );
};

export default about;
