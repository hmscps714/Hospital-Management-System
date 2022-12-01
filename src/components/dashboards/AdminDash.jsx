import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./PatDashboard.module.css";
// import AppointmentCalendarPatient from "../appointments/AppointmentCalendarPatient";
import AppointmentAdmin from "../appointments/AppointmentAdmin";
import { getPatientAppointments } from "src/api/db";

export const AdminDash = () => {
<<<<<<< Updated upstream
     // keeps track of patient appointments
=======

//   // keeps track of patient appointments
>>>>>>> Stashed changes
  const [patientAppointments, setPatientAppointments] = useState();

  const addPatientAppointment = (appointment) =>
    setPatientAppointments([...patientAppointments, appointment]);

  useEffect(() => {
    if (patientAppointments === undefined) {
      getPatientAppointments(patientData.uid)
        .then((data) => setPatientAppointments(data))
        .catch((e) => console.error(e));
    }
  }, [patientAppointments]);

  return (
    <>
      <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
      <h1 className={styles.h1}>
        {" "}
<<<<<<< Updated upstream
        <span className={styles.text}></span><span className={styles.text}>{firstName} {lastName}</span>
=======
        <span className={styles.text}>
          Jhon Smith
        </span>
>>>>>>> Stashed changes
      </h1>
      <h3 className={styles.h3}>
        {" "}
        <span className={styles.green}>DOB: 1998-10-01</span>{" "}
        {" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Heath card number: 50106548915</span>{" "} &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Gender: Male</span>
      </h3>
      <hr className={styles.line}></hr>
      <div className={styles.form}>
        <AppointmentAdmin patient={patientData} addPatientAppointment={addPatientAppointment} />
      </div>


    </>
  );
};

export default AdminDash;
