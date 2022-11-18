import React, { useState } from "react";
import styles from "./Landing.module.css";

export const Landing = () => {
  return (
    <div className={styles.Landing}>
      <title>Landing Page</title>
      <div className={styles.Left}>
        <h1>
          Making your lives <strong>better.</strong>
        </h1>
        <p>Join today to see what great wonders await!</p>
        <button className={styles.btn1}>Try it Free!</button>
        <button className={styles.btn2}>Get a Demo</button>
      </div>
      <div className={styles.Right}>
        <img src="/landing/surgery.jpg" alt="img not found" className={styles.img1} />
        <img src="/landing/holdinghands.jpg" alt="img not found" className={styles.img2} />
      </div>
    </div>
  );
};

export default Landing;
