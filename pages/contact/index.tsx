import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import Contact from "src/components/Contact/Contact";

export const contact = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <Contact />
    </ThemeProvider>
  );
};

export default contact;
