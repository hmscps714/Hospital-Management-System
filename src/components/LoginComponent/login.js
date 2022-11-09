import React from "react";
import styles from "./login.module.css";
import { ThemeProvider } from "@mui/material";
//import { signInPatient, signInPractitioner } from "src/api/auth";
//import Image from "./src/images/login_bg.jpg";

export const Login = () => {
  return (
    <div clssName={styles.Background}>
      <div className={styles.Login}>
        <div className={styles.LoginBox}>
          <div className={styles.LoginHeader}>Sign In</div>
          <div className={styles.inputs}>
            <input className={styles.Username} placeholder="Username" />
            <input className={styles.Password} placeholder="Password" type="password" /> <br />
            <br />
            <input className={styles.chkbox} type="checkbox" />{" "}
            <span style={{ color: "white" }}>
              {" "}
              Remember me &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <a className={styles.password} href="https://medsuite.netlify.app/">
              Forgot Password?
            </a>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button className={styles.login_button}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
