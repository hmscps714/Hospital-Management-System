import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import theme from "src/config/theme";

export const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
    </ThemeProvider>
  );
};

export default Home;
