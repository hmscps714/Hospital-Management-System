import React from "react";
import styles from "./About.module.css";
import { useRouter } from "next/router";

export const About = () => {
  const router = useRouter();

  return (
    <div className={styles.About}>
      <title>About us</title>
      <div className={styles.contents}>
        <h1>
          Hospital Management. <strong>Redefined.</strong>
        </h1>
        <p>
          At Medsuite, we believe there is a better way to do hospital management. Leave the
          guesswork aside, while our team strives to put practitioners and patients at the
          forefront. We are enthusiastic to simplify hospital management system solutions for
          everyone through our software, education, and diverse community. Join us today on this
          exciting journey!
        </p>
        <div className={styles.block1}>
          <p>
            {" "}
            <strong> OUR VISION</strong>
          </p>
          <p>
            At MedSuite, our futuristic global vision is to allow healthcare industries to provide
            superior patient care and medical duty delivery, while harnessing cutting-edge
            technology.
          </p>
        </div>
        <div className={styles.block1}>
          <p>
            {" "}
            <strong> CORE VALUES </strong>{" "}
          </p>
          <div className={styles.block2}>
            <img src="/about/2.png" alt="" />
          </div>

          <div className={styles.block2}>
            <img src="/about/3.png" alt="" />
          </div>

          <div className={styles.block2}>
            <img src="/about/4.png" alt="" />
          </div>
          <div className={styles.clr}></div>
          <p>
            1. Customer Focus <br /> 2. Continuous Improvement <br /> 3. Customer Service
          </p>
        </div>
        <div className={styles.block1}>
          <p>
            {" "}
            <strong> OUR MISSION</strong>{" "}
          </p>
          <p>
            Our mission lies in prioritizing our customers first. We aim to provide a
            highly-secured, user-friendly, and scalable platform to healthcare industries, which
            provide great value at a fraction of the cost.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
