import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./PatDashboard.module.css";
// import AppointmentCalendarPatient from "../appointments/AppointmentCalendarPatient";
import AppointmentAdminDoc from "../appointments/AppointmentAdminDoc";
import AppointmentAdminPat from "../appointments/AppointmentAdminPat";
import { getPatientAppointments } from "src/api/db";

export const AdminDash = () => {
  return (
    <>
      <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
      <h1 className={styles.h1}>
        {" "}
        <span className={styles.green}>Admin Dashboard</span>
      </h1>
      <hr className={styles.line}></hr>
      <div className={styles.form}>
        <AppointmentAdminDoc />
        <AppointmentAdminPat />
      </div>


    </>
  );
};

export default AdminDash;
