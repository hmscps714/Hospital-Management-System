import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./PatDashboard.module.css";
import AppointmentCalendarPatient from "../appointments/AppointmentCalendarPatient";
import AppointmentCreator from "../appointments/AppointmentCreator";
import { getPatientAppointments } from "src/api/db";
import { Patient } from "src/config/interfaces";

export const PatientDash = ({ patientData }) => {
  const { basicInformation,
    personalContactInformation,
    emergencyContactInformation,
    physicianInformation,
  } = patientData;

  const {
    firstName = "None",
    lastName = "None",
    dob = "None",
    healthCardNumber = "None",
    gender = "None",
  } = basicInformation;

  const { email = "None", phoneNumber = "None", homeAddress = "None" } = personalContactInformation;

  const {
    name: eName = "None",
    relationshipToPatient = "None",
    phoneNumber: ePhone = "None",
    email: eEmail = "None",
  } = emergencyContactInformation;

  const {
    physicianName = "None",
    clinicName = "None",
    clinicAddress = "None",
    clinicPhone = "None",
    clinicEmail = "None",
  } = physicianInformation;

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
        <AppointmentCalendarPatient appointments={patientAppointments} />
        <AppointmentCreator patient={patientData} addPatientAppointment={addPatientAppointment} />
        <div className={styles.card} > 
            <h2>Contact Information</h2>
            <ul>
              <li>Email: {email}</li>
              <li>Phone: {phoneNumber}</li>
              <li>Address: {homeAddress}</li>
            </ul>
            <h2>Emergency Contact</h2>
            <ul>
              <li>Name: {eName}</li>
              <li>Relationship to patient: {relationshipToPatient}</li>
              <li>Phone: {ePhone}</li>
              <li>Email: {eEmail}</li>
            </ul>
            <h2>Physician Information</h2>
            <ul>
              <li>Physician name: {physicianName}</li>
              <li>Clinic name: {clinicName}</li>
              <li>Clinic address: {clinicAddress}</li>
              <li>Clinic phone: {clinicPhone}</li>
              <li>Clinic email: {clinicEmail}</li>
            </ul>
        </div>
      </div>


    </>
  );
};

export default PatientDash;
