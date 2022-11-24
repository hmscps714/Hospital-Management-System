import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import CreateTransactionForm from "src/components/forms/TransactionForm";
import theme from "src/config/theme";

export const PriceRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <CreateTransactionForm />
    </ThemeProvider>
  );
};

export default PriceRegistration;

