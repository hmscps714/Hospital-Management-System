import React from "react";
import styles from "./Landing.module.css";
import { useRouter } from "next/router";

export const Landing = () => {
  const router = useRouter();

  return (
    <div className={styles.Landing}>
      <title>MedSuite Home</title>
      <div className={styles.contents}>
        <div className={styles.Left}>
          <h1>
            Making your lives <strong>better.</strong>
          </h1>
          <p>Join today to see what great wonders await!</p>
          <button className={styles.btn1} onClick={() => router.push("/contact")}>
            Contact us
          </button>
          <button className={styles.btn2} onClick={() => router.push("/demo")}>
            Demo
          </button>
        </div>
        <div className={styles.Right}>
          <img src="/landing/surgery.jpg" alt="img not found" className={styles.img1} />
          <img src="/landing/holdinghands.jpg" alt="img not found" className={styles.img2} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
