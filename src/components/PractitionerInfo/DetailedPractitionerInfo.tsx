import React from "react";
import { Patient } from "src/config/interfaces";
import moment from "moment";
import styles from "./DetailedPractitionerInfo.module.css";
import { style } from "@mui/system";

export const DetailedPractitionerInfo = ({ practitionerData }) => {
  const {
    basicInformation,
    personalContactInformation,
    emergencyContactInformation,
    insurance = {},
    fieldSpecialty = "None",
  } = practitionerData;

  const {
    firstName = "None",
    middleName = "None",
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

  const {
    memberName = "None",
    providerName = "None",
    planName = "None",
    planNumber = "None",
    planExpiryDate,
  } = insurance;

  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h2>Basic Information</h2>
        <ul>
          <li>
            <span>First name: </span>
            <span>{firstName}</span>
          </li>
          {/* <li>Middle name: {middleName}</li> */}
          <li>Last name: {lastName}</li>
          <li>DOB: {moment(new Date(dob.toDate())).format("YYYY-MM-DD").toString()}</li>
          <li>Heath card #: {healthCardNumber}</li>
          <li>Gender: {gender}</li>
          {/* <li>Marital status: {maritalStatus}</li>
          <li>Drug allergies: {drugAllergies}</li>
          <li>Food allergies: {foodAllergies}</li> */}
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
          <li>Relationship to practitioner: {relationshipToPatient}</li>
          <li>Phone: {ePhone}</li>
          <li>Email: {eEmail}</li>
        </ul>
      </div>
      <div className={styles.Card}>
        {/* <h2>Insurance Information</h2>
        <ul>
          <li>Member name: {memberName}</li>
          <li>Provider name: {providerName}</li>
          <li>Plan name: {planName}</li>
          <li>Plan number: {planNumber}</li>
          <li>
            Plan expiry date:
            {planExpiryDate ? moment(planExpiryDate).format("YYYY-MM-DD").toString() : "None"}
          </li>
        </ul> */}

        <h2>Field Information</h2>
        <ul>
          <li>Field specialty: {fieldSpecialty}</li>
        </ul>
      </div>
    </div>
  );
};

//export default DetailedPatientInfo;
