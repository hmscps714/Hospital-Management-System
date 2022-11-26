import "../styles.css";
import { AuthUserProvider } from "../src/context/AuthUserContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}
