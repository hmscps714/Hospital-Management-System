import { ThemeProvider } from "@mui/material";
import React from "react";
import NavbarHome from "src/components/Navbar/NavbarHome";
import theme from "src/config/theme";
import { useRouter } from "next/router";

export const Home = () => {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      THIS IS HOME
      <ul>
        <button onClick={() => router.push("/patients-list/")}>Patients List</button>
        <button onClick={() => router.push("/doctors-list/")}>Doctors List</button>
        <button onClick={() => router.push("/nurses-list/")}>Nurses List</button>
      </ul>
    </ThemeProvider>
  );
};

export default Home;
