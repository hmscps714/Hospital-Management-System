import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./patientRegisterForm.module.css";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { registerPatient } from "src/api/auth";

const pages = [{ name: "Forms", href: "/forms" }];

export const PatientRegisterForm = () => {
  const router = useRouter();

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
    //Physician info
    physicianName: "",
    clinicName: "",
    clinicAddress: "",
    clinicPhone: "",
    clinicEmail: "",
    //Pharmacy info
    pName: "",
    pPhone: "",
    fax: "",
    pEmail: "",
    pAddress: "",
  });

  const basicInformation = [
    {
      id: "firstName",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "Please provide a first name",
      label: "First Name",
      required: true,
    },
    {
      id: "lastName",
      name: "lastName",
      type: "text",
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
      placeholder: "1234567890",
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
      type: "text",
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
      placeholder: "Name",
      errorMessage: "Please provide a name",
      label: "Name",
      required: true,
    },
    {
      id: "relationshipToPatient",
      name: "relationshipToPatient",
      type: "text",
      placeholder: "Relationship to Patient",
      errorMessage: "Please provide their relationship to patient",
      label: "Relationship to Patient",
      required: true,
    },
    {
      id: "ePhone",
      name: "ePhone",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      placeholder: "Phone Number",
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

  const physicianInformation = [
    {
      id: "physicianName",
      name: "physicianName",
      type: "text",
      placeholder: "Physician Name",
      errorMessage: "Please provide a physician name",
      label: "Physician Name",
      required: true,
    },
    {
      id: "clinicName",
      name: "clinicName",
      type: "text",
      placeholder: "Clinic Name",
      errorMessage: "Please provide a clinic name",
      label: "Clinic Name",
      required: true,
    },
    {
      id: "clinicAddress",
      name: "clinicAddress",
      type: "text",
      placeholder: "Clinic Address",
      errorMessage: "Please provide a Clinic Address",
      label: "Clinic Address",
      required: true,
    },
    {
      id: "clinicPhone",
      name: "clinicPhone",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      placeholder: "Clinic Phone",
      errorMessage: "Please provide a clinic phone",
      label: "Clinic Phone",
      required: true,
    },
    {
      id: "clinicEmail",
      name: "clinicEmail",
      type: "email",
      placeholder: "Clinic Email",
      errorMessage: "Please provide a clinic email",
      label: "Clinic Email",
      required: true,
    },
  ];

  const pharmacy = [
    {
      id: "pName",
      name: "pName",
      type: "text",
      placeholder: "Name",
      errorMessage: "Please provide a name",
      label: "Name",
      required: true,
    },
    {
      id: "pPhone",
      name: "pPhone",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      placeholder: "Phone",
      errorMessage: "Please provide a phone",
      label: "Phone",
      required: true,
    },
    {
      id: "fax",
      name: "fax",
      type: "tel",
      placeholder: "1234567890",
      pattern: "\\d{10}",
      placeholder: "Fax Address",
      errorMessage: "Please provide a fax Address",
      label: "Fax Address",
      required: true,
    },
    {
      id: "pEmail",
      name: "pEmail",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide a email",
      label: "Email",
      required: true,
    },
    {
      id: "pAddress",
      name: "pAddress",
      type: "text",
      placeholder: "Address",
      errorMessage: "Please provide a address",
      label: "Address",
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
      physicianName,
      clinicName,
      clinicAddress,
      clinicPhone,
      clinicEmail,
      pName,
      pPhone,
      fax,
      pEmail,
      pAddress,
    } = formVals;

    const patient = {
      basicInformation: {
        firstName,
        lastName,
        dob: new Date(dob),
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
      physicianInformation: {
        physicianName,
        clinicName,
        clinicAddress,
        clinicPhone,
        clinicEmail,
      },
      pharmacy: {
        name: pName,
        phone: pPhone,
        fax,
        email: pEmail,
        address: pAddress,
      },
    };

    const login = {
      email,
      password: dob.toString().replaceAll("-", ""),
    };

    console.log(patient);
    console.log(login);

    const hasLoggedIn = await registerPatient(login, patient);
    if (hasLoggedIn) {
      router.push("/practitioner-home");
    } else {
      alert("Sorry it has failed : ( Please try again!");
    }
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Patient Enrollment Form</h3>
      <div className={styles.center}>
        <div className={styles.picture}>
          <Image src="/forms/nurse.png" width="750%" height="750%"></Image>
        </div>
        <form onSubmit={handleSubmit} className={styles.FormItems}>
          <div className={styles.mainDetails}>
            <div className={styles.center}>
              <div className={styles.info}>
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
              <div className={styles.imageUpload}>
                <Image src="/forms/ddu.webp" width="283%" height="190%"></Image>
                <h4 className={styles.h4}>Max. Size: 5MB</h4>
                <h4 className={styles.h4}>Allowed Types: JPG, PNG, GIF, JPEG</h4>
                <div className={styles.center}>
                  <Stack spacing={2} direction="row">
                    <Button className={styles.btnSub} variant="contained">
                      Upload
                    </Button>
                    <Button className={styles.btnRes} variant="contained">
                      Remove
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.otherDetails}>
            <h4 className={styles.h4}> Family Physician Information</h4>
            {physicianInformation.map((physicianInformations) => (
              <FormInput
                key={physicianInformations.id}
                {...physicianInformations}
                value={formVals[physicianInformations.name]}
                onChange={onChange}
              />
            ))}
            <h4 className={styles.h4}>Preferred Pharmacy</h4>
            {pharmacy.map((pharmac) => (
              <FormInput
                key={pharmac.id}
                {...pharmac}
                value={formVals[pharmac.name]}
                onChange={onChange}
              />
            ))}
          </div>
          <br></br>
          <Button type="submit" className={styles.btnSub1} variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default PatientRegisterForm;
