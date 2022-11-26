import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./dashboard.module.css";

export const PatientDash = ({  }) => {
  return (
    <ReactFragment>
      <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
      <h1 className={styles.h1}>
        {" "}
        <span className={styles.text}>
          Lyla Taylor
        </span>
      </h1>
      <h3 className={styles.h3}>
        {" "}
        <span className={styles.green}>Worked for: 2 years</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Heath card number: 234 2342 2343</span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Gender: Female</span>
      </h3>
      <hr className={styles.line}></hr>
      <div className={styles.form}>
        <div className={styles.rect}>
            stuff here
        </div>
        <div className={styles.rect}>
            stuff here
        </div>
        <div className={styles.rect}>
            stuff here
        </div>
      </div>
    </ReactFragment>
  );
};

export default PatientDash;
