import "../styles.css";
import { AuthUserProvider } from "../src/context/AuthUserContext";
import NavbarHome from "src/components/Navbar/NavbarHome";
import { ThemeProvider } from "@mui/material";
import theme from "src/config/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ThemeProvider theme={theme}>
        <NavbarHome />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserProvider>
  );
}
