import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Table from "src/components/Tables/Table.js";
import FilteringTable from "../../src/components/Tables/FilteringTable";
import  MainTable from "../../src/components/Tables/MainTable";

export const DoctorsList = () => {
    return (
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <h1>Doctor Lists</h1>
        <button type="button">New Doctor</button>
        <MainTable />
      </ThemeProvider>
      
    );
  };