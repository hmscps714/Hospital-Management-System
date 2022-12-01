import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./patientRegisterForm.module.css";
import Button from "@mui/material/Button";
import { registerPractitioner } from "src/api/auth";

export const PractitionerRegisterForm = () => {
  const router = useRouter();
  const [hasRegistered, setHasRegistered] = useState(null);
  const [formVals, setFormVals] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    healthCardNumber: "",
    gender: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    //Emergency contact below
    eName: "",
    relationshipToPatient: "",
    ePhone: "",
    eEmail: "",
    //Login
    fieldSpecialty: "doctor",
    //username: "", //username is email
    password: "",
  });

  const basicInformation = [
    {
      id: "firstName",
      name: "firstName",
      type: "text",
      pattern: "^[a-zA-Z ]*$",
      placeholder: "First Name",
      errorMessage: "Please provide a first name",
      label: "First Name",
      required: true,
    },
    {
      id: "lastName",
      name: "lastName",
      type: "text",
      pattern: "^[a-zA-Z ]*$",
      placeholder: "Last Name",
      errorMessage: "Please provide a last name",
      label: "Last Name",
      required: true,
    },
    {
      id: "dob",
      name: "dob",
      type: "date",
      errorMessage: "Please provide a date of birth",
      label: "Date of Birth",
      required: true,
    },
    {
      id: "healthCardNumber",
      name: "healthCardNumber",
      type: "text",
      pattern: "[1-9]\\d{9}",
      placeholder: "1234567890-AW",
      errorMessage: "Please provide your 10-digit health card number",
      label: "Health Card Number",
      required: true,
    },
    {
      id: "gender",
      name: "gender",
      type: "text",
      placeholder: "Gender",
      errorMessage: "Please provide a gender",
      label: "Gender",
      required: true,
    },
  ];
  const personalContactInformation = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide a email",
      label: "Email",
      required: true,
    },
    {
      id: "phoneNumber",
      name: "phoneNumber",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      errorMessage: "Please provide a phone number",
      label: "Phone Number",
      required: true,
    },
    {
      id: "homeAddress",
      name: "homeAddress",
      type: "text",
      placeholder: "Home Address",
      errorMessage: "Please provide a home address",
      label: "Home Address",
      required: true,
    },
  ];
  const emergencyContactInformation = [
    {
      id: "eName",
      name: "eName",
      type: "text",
      pattern: "^[a-zA-Z ]*$",
      placeholder: "Name",
      errorMessage: "Please provide a name",
      label: "Name",
      required: true,
    },
    {
      id: "relationshipToPatient",
      name: "relationshipToPatient",
      type: "text",
      pattern: "^[a-zA-Z ]*$",
      placeholder: "Relationship to practitioner",
      errorMessage: "Please provide their relationship to practitioner",
      label: "Relationship to practitioner",
      required: true,
    },
    {
      id: "ePhone",
      name: "ePhone",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      errorMessage: "Please provide a phone number",
      label: "Phone Number",
      required: true,
    },
    {
      id: "eEmail",
      name: "eEmail",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide a email",
      label: "Email",
      required: true,
    },
  ];
  // const login = [
  // {
  //   id: "username",
  //   name: "username",
  //   type: "text",
  //   placeholder: "Username",
  //   errorMessage: "Please provide a username",
  //   label: "Username",
  //   required: true,
  // },
  //   {
  //     id: "password",
  //     name: "password",
  //     type: "password",
  //     placeholder: "Password",
  //     errorMessage: "Please provide a password",
  //     label: "Password",
  //     required: true,
  //   },
  // ];
  // const inputs = [
  //   {
  //     id: "fieldSpecialty",
  //     name: "fieldSpecialty",
  //     type: "text",
  //     placeholder: "Field Specialty",
  //     errorMessage: "Please provide a field specialty",
  //     label: "Field Specialty",
  //     required: true,
  //   },
  //   {
  //     id: "floor",
  //     name: "floor",
  //     type: "text",
  //     placeholder: "Floor",
  //     errorMessage: "Please provide a floor",
  //     label: "Floor",
  //     required: true,
  //   },
  // ];

  const login = [
    // {
    //   id: "salary",
    //   name: "salary",
    //   type: "text",
    //   placeholder: "Salary",
    //   errorMessage: "Please provide a salary",
    //   label: "Salary",
    //   // required: true,
    // },
    // {
    //   id: "bonus",
    //   name: "bonus",
    //   type: "text",
    //   placeholder: "Bonus",
    //   errorMessage: "Please provide a bonus",
    //   label: "Bonus",
    //   // required: true,
    // },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Please provide a password",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      dob,
      healthCardNumber,
      gender,
      email,
      phoneNumber,
      homeAddress,
      eName,
      relationshipToPatient,
      ePhone,
      eEmail,
      fieldSpecialty,
      password,
    } = formVals;

    const practitioner = {
      basicInformation: {
        firstName,
        lastName,
        dob: new Date(dob.split("-")),
        healthCardNumber,
        gender,
      },
      personalContactInformation: {
        email,
        phoneNumber,
        homeAddress,
      },
      emergencyContactInformation: {
        name: eName,
        relationshipToPatient,
        phoneNumber: ePhone,
        email: eEmail,
      },
      fieldSpecialty,
    };
    const login = {
      email,
      password,
    };

    const status = await registerPractitioner(login, practitioner);
    setHasRegistered(status);
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Practitioner Enrollment Form</h3>
      <div className={styles.center}>
        <form onSubmit={handleSubmit} className={styles.FormItems}>
          <div className={styles.mainDetails}>
            <h4 className={styles.h4}>Basic information</h4>
            {basicInformation.map((basicInformations) => (
              <FormInput
                key={basicInformations.id}
                {...basicInformations}
                value={formVals[basicInformations.name]}
                onChange={onChange}
              />
            ))}
            <h4 className={styles.h4}>Personal Contact Information</h4>
            {personalContactInformation.map((personalContactInformations) => (
              <FormInput
                key={personalContactInformations.id}
                {...personalContactInformations}
                value={formVals[personalContactInformations.name]}
                onChange={onChange}
              />
            ))}
            <h4 className={styles.h4}>Emergency Contact Information</h4>
            {emergencyContactInformation.map((emergencyContactInformations) => (
              <FormInput
                key={emergencyContactInformations.id}
                {...emergencyContactInformations}
                value={formVals[emergencyContactInformations.name]}
                onChange={onChange}
              />
            ))}{" "}
          </div>
          <div className={styles.otherDetails}>
            <h4 className={styles.h4}>Account</h4>
            <label>Username</label>
            <input type="text" value={formVals.email} disabled />
            {login.map((logins) => (
              <FormInput
                key={logins.id}
                {...logins}
                value={formVals[logins.name]}
                onChange={onChange}
              />
            ))}
            <h4 className={styles.h4}>Department </h4>
            <label htmlFor="fieldSpecialty">Field Specialty</label>
            <select name="fieldSpecialty" onChange={onChange} required>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </select>
            {/* {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={formVals[input.name]}
                onChange={onChange}
              /> */}
            {/* ))} */}
          </div>
          <Button type="submit" className={styles.btnSub1} variant="contained">
            Submit
          </Button>
          {hasRegistered && <span className="successMessage">Registration successful!</span>}
          {hasRegistered === false && <span className="errorMessage">Registration failed!</span>}
        </form>
      </div>
    </React.Fragment>
  );
};

export default PractitionerRegisterForm;
