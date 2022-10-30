import React from "react";
import { useRouter } from "next/router";
import styles from "./patientRegisterForm.module.css";

const pages = [
  { name: "Forms", href: "/forms" },
];

export const Forms = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className={styles.box1}>
        blah blah
      </div>

    </React.Fragment>
  );
};

export default Forms;
