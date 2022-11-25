import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./dashboard.module.css";
import AppointmentCalendarPatient from "../appointments/AppointmentCalendarPatient";
import AppointmentCreator from "../appointments/AppointmentCreator";
import { getPatientAppointments } from "src/api/db";

export const PatientDash = ({ patientData }) => {
  const { basicInformation } = patientData;

  const {
    firstName = "None",
    lastName = "None",
    dob = "None",
    healthCardNumber = "None",
    gender = "None",
  } = basicInformation;

  // keeps track of patient appointments
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
        <span className={styles.text}>
          {firstName} {lastName}
        </span>
      </h1>
      <h3 className={styles.h3}>
        {" "}
        <span className={styles.green}>DOB: </span>{" "}
        <span className={styles.text}>
          {moment(new Date(dob.toDate())).format("YYYY-MM-DD").toString()}{" "}
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Heath card number: </span>{" "}
        <span className={styles.text}>{healthCardNumber} </span> &nbsp;&nbsp;&nbsp;&nbsp;
        <span className={styles.green}>Gender: </span> <span className={styles.text}>{gender}</span>
      </h3>
      <hr className={styles.line}></hr>
      <div className={styles.form}>
        <div className={styles.rect}></div>
        <div className={styles.rect}></div>
        <div className={styles.rect}></div>
      </div>

      <div className={styles.form2}>
        <AppointmentCalendarPatient appointments={patientAppointments} />
        <AppointmentCreator patient={patientData} addPatientAppointment={addPatientAppointment} />
      </div>
    </>
  );
};

export default PatientDash;
