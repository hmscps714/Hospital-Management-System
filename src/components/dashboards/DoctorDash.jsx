import React from "react";
import { Patient } from "src/config/interfaces";
import { useRouter } from "next/router";
import moment from "moment";
import styles from "./DocDashboard.module.css";

export const DoctorDash = ({ doctorData }) => {

    const router = useRouter();

    const {
        basicInformation,
      } = doctorData;

      const {
        firstName = "None",
        lastName = "None",
        dob = "None",
        healthCardNumber = "None",
        gender = "None",
    } = basicInformation;
    
    return (
      <React.Fragment>
        <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
        <h1 className={styles.h1}> <span className={styles.text}>{firstName} {lastName}</span></h1>              
        <h3 className={styles.h3}> <span className={styles.green}>DOB: </span> <span className={styles.text}>{moment(new Date(dob.toDate())).format("YYYY-MM-DD").toString()} </span> &nbsp;&nbsp;&nbsp;&nbsp;
                                   <span className={styles.green}>Heath card number: </span> <span className={styles.text}>{healthCardNumber} </span> &nbsp;&nbsp;&nbsp;&nbsp;
                                   <span className={styles.green}>Gender: </span> <span className={styles.text}>{gender}</span>
        </h3>
        <hr className={styles.line}></hr>
        <div className={styles.form}>
          <div className={styles.rect}></div>
          <div className={styles.rect}></div>
          <div className={styles.rect}></div>
        </div>
      </React.Fragment>
)};

export default DoctorDash;
