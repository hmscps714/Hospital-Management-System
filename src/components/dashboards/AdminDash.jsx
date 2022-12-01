import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./PatDashboard.module.css";
// import AppointmentCalendarPatient from "../appointments/AppointmentCalendarPatient";
import AppointmentAdminDoc from "../appointments/AppointmentAdminDoc";
import { getPatientAppointments } from "src/api/db";

export const AdminDash = () => {
  return (
    <>
      <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
      <h1 className={styles.h1}>
        {" "}
        <span className={styles.text}></span><span className={styles.text}>Jhon Smith</span>
      </h1>
      <h3 className={styles.h3}>
        {" "}
        <span className={styles.green}>DOB: </span><span className={styles.text}>1998-10-01</span>{" "}
        {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Heath card number: </span><span className={styles.text}>50106548915</span>{" "} &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Gender: </span><span className={styles.text}>Male</span>
      </h3>
      <hr className={styles.line}></hr>
      <div className={styles.form}>
        <AppointmentAdminDoc />
      </div>


    </>
  );
};

export default AdminDash;
