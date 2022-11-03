import React from "react";
import { Patient } from "src/config/interfaces";
import moment from "moment";

export const DetailedPatientInfo = ({ patientData }) => {
  //   const organizedData = {
  //     Object.entries(data).map((category, i) => {
  //       <h2>{category[0]}</h2>;
  //     });
  //   };

  // const organizedData = Object.keys(patientData.basicInformation).map((category, i) => {
  //   return <h2>{category[0]}</h2>;
  // });

  const {
    basicInformation,
    personalContactInformation,
    emergencyContactInformation,
    physicianInformation,
    pharmacy = {},
    insurance = {},
  } = patientData;

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

  const {
    email = "None",
    // password = "None",
    phoneNumber = "None",
    homeAddress = "None",
  } = personalContactInformation;

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

  const {
    name: pName = "None",
    phone: pPhone = "None",
    fax: pFax = "None",
    email: pEmail = "None",
    address: pAddress = "None",
  } = pharmacy;

  const {
    memberName = "None",
    providerName = "None",
    planName = "None",
    planNumber = "None",
    planExpiryDate,
  } = insurance;

  console.log(dob);
  return (
    <div>
      <h2>Basic Information</h2>
      <ul>
        <li>First name: {firstName}</li>
        <li>Middle name: {middleName}</li>
        <li>Last name: {lastName}</li>
        <li>DOB: {moment(dob).format("YYYY-MM-DD").toString()}</li>
        <li>Heath card #: {healthCardNumber}</li>
        <li>Gender: {gender}</li>
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

      <h2>Physician Information</h2>
      <ul>
        <li>Physician name: {physicianName}</li>
        <li>Clinic name: {clinicName}</li>
        <li>Clinic address: {clinicAddress}</li>
        <li>Clinic phone: {clinicPhone}</li>
        <li>Clinic email: {clinicEmail}</li>
      </ul>

      <h2>Pharmacy Information</h2>
      <ul>
        <li>Name: {pName}</li>
        <li>Phone: {pPhone}</li>
        <li>Fax: {pFax}</li>
        <li>Email: {pEmail}</li>
        <li>Address: {pAddress}</li>
      </ul>

      <h2>Insurance Information</h2>
      <ul>
        <li>Member name: {memberName}</li>
        <li>Provider name: {providerName}</li>
        <li>Plan name: {planName}</li>
        <li>Plan number: {planNumber}</li>
        <li>
          Plan expiry date:
          {planExpiryDate ? moment(planExpiryDate).format("YYYY-MM-DD").toString() : "None"}
        </li>
      </ul>
    </div>
  );
};

//export default DetailedPatientInfo;