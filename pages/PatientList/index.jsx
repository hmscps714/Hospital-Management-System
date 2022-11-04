import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import Table from 'src/components/Tables/Table.js'

export const PatientList = () => {
    return (
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <Table />
      </ThemeProvider>
    );
  };
  
  export default PatientList;
  