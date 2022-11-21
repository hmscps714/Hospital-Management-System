import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import CreateItemForm from "src/components/forms/CreateItemForm";
import theme from "src/config/theme";

export const ItemRegistration = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <CreateItemForm />
    </ThemeProvider>
  );
};

export default ItemRegistration;
