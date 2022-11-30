import React, { useState, useEffect } from "react";
import { Patient } from "src/config/interfaces";
import { useRouter } from "next/router";
import moment from "moment";
import styles from "./PatDashboard.module.css";
import AppointmentCalendarPractitioner from "../appointments/AppointmentCalendarPatient";
import { getPractitionerAppointments } from "src/api/db";


export const DoctorDash = ({ doctorData }) => {

    const router = useRouter();

    const {
      basicInformation,
      personalContactInformation,
      emergencyContactInformation,
      fieldSpecialty = "None",
      } = doctorData;

      const {
        firstName = "None",
        lastName = "None",
        dob = "None",
        healthCardNumber = "None",
        gender = "None",
        maritalStatus = "None",
        drugAllergies = "None",
        foodAllergies = "None",
      } = basicInformation;
    
      const { email = "None", phoneNumber = "None", homeAddress = "None" } = personalContactInformation;
    
      const {
        name: eName = "None",
        relationshipToPatient = "None",
        phoneNumber: ePhone = "None",
        email: eEmail = "None",
      } = emergencyContactInformation;
  
  const [patientAppointments, setPatientAppointments] = useState();
  
  useEffect(() => {
    if (patientAppointments === undefined) {
      getPractitionerAppointments(doctorData.uid)
        .then((data) => { console.log(doctorData.uid); console.log(data); setPatientAppointments(data) })
        .catch((e) => console.error(e));
    }
  
  }, [patientAppointments]);
    
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
        <AppointmentCalendarPractitioner appointments={patientAppointments}/>
        <div className={styles.card}>
          <h2>Basic Information</h2>
          <ul>
            <li>Marital status: {maritalStatus}</li>
            <li>Drug allergies: {drugAllergies}</li>
            <li>Food allergies: {foodAllergies}</li>
          </ul>
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
        </div>
        </div>
      </React.Fragment>
)};

export default DoctorDash;
