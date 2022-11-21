import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import About from "src/components/About/About";

export const about = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <About />
    </ThemeProvider>
  );
};

export default about;
