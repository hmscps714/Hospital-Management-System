import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { useRouter } from "next/router";
import styles from "./Demo.module.css";

export const Demo = () => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <h1 className={styles.Title}>Demo page</h1>
      <div className={styles.ButtonContainer}>
        <button onClick={() => router.push("/patients-list")}>Patients List</button>
        <button onClick={() => router.push("/doctors-list")}>Doctors List</button>
        <button onClick={() => router.push("/nurses-list")}>Nurses List</button>
        <button onClick={() => router.push("/inventory-list")}>Inventory List</button>
      </div>
    </ThemeProvider>
  );
};

export default Demo;
