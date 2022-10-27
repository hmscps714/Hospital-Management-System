import React from "react";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";
import NavbarHome from "src/components/NavbarHome";
import { registerPractitioner } from "src/api/auth";

export const Login = () => {
  async function asdf() {
    const x = await registerPractitioner("test1234@test.com", "test1234", "bob", "doctor");
    console.log(x);
  }

  return (
    <ThemeProvider theme={theme}>
      <NavbarHome />
      <button onClick={asdf}>click me</button>
    </ThemeProvider>
  );
};

export default Login;
