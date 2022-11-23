import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import CreatePriceForm from "src/components/forms/PriceForm";
import theme from "src/config/theme";

export const PriceRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <CreatePriceForm />
    </ThemeProvider>
  );
};

export default PriceRegistration;

