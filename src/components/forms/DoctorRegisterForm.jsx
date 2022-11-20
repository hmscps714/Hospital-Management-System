import React, { useState }  from "react";
import { useRouter } from "next/router";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./patientRegisterForm.module.css";
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { registerPractitioner } from "src/api/auth";

const pages = [
  { name: "Forms", href: "/forms" },
];

export const Forms = () => {
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
    name: "",
    relationshipToPatient: "",
    phoneNumberE: "",
    email: "",
    fieldSpecialty: "",
    username: "",
    password: "",
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
      type: "text",
      placeholder: "Password",
      errorMessage: "Please provide a date of birth",
      label: "Date of Birth",
      required: true,
    },
    {
      id: "healthCardNumber",
      name: "healthCardNumber",
      type: "text",
      placeholder: "Health Card Number",
      errorMessage: "Please provide a health card number",
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
      type: "text",
      placeholder: "Phone Number",
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
      id: "name",
      name: "name",
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
      id: "phoneNumberE",
      name: "phoneNumberE",
      type: "text",
      placeholder: "Phone Number",
      errorMessage: "Please provide a phone number",
      label: "Phone Number",
      required: true,
    },
    {
      id: "emailE",
      name: "emailE",
      type: "text",
      placeholder: "Email",
      errorMessage: "Please provide a email",
      label: "Email",
      required: true,
    },
  ];
  const login = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Please provide a username",
      label: "Username",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage: "Please provide a password",
      label: "Password",
      required: true,
    },
  ];
  const inputs = [
    {
      id: "fieldSpecialty",
      name: "fieldSpecialty",
      type: "text",
      placeholder: "Field Specialty",
      errorMessage: "Please provide a field specialty",
      label: "Field Specialty",
      required: true,
    },
    {
      id: "floor",
      name: "floor",
      type: "text",
      placeholder: "Floor",
      errorMessage: "Please provide a floor",
      label: "Floor",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, dob, healthCardNumber, gender, email, phoneNumber, homeAddress, name, relationshipToPatient, phoneNumberE, emailE, fieldSpecialty } = formVals;
    
    const practitioner = 
    {
      basicInformation: {
        firstName, lastName, dob, healthCardNumber, gender,
      },
      personalContactInformation: {
        email, phoneNumber, homeAddress,
      },
      emergencyContactInformation: {
        name, relationshipToPatient, 
        phoneNumber: phoneNumberE,
        email: emailE,
      },
      fieldSpecialty,
    }
    const login =
    {
      email,
      password: dob,
    }
    

    const hasLoggedIn = await registerPractitioner( login, practitioner );
    if (hasLoggedIn) {
      router.push("/admin-home");
    } else {
      alert("Sorry it has failed : ( Please try again!");
    }    
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Doctor Enrollment Form</h3>
      <div className={styles.center}>
        <div className={styles.picture}>
          <Image src="/forms/doctor.png" width="198%" height="290%"></Image>
        </div>
        <form onSubmit={handleSubmit} className={styles.FormItems}>
          <div className={styles.mainDetails}>
            <div className={styles.center}>
              <div className={styles.info}>
                <h4 className={styles.h4}>Basic information</h4>
                  {basicInformation.map((basicInformations) => (
                  <FormInput key={basicInformations.id} {...basicInformations} value={formVals[basicInformations.name]} onChange={onChange} />
                  ))}
                <h4 className={styles.h4}>Personal Contact Information</h4>
                  {personalContactInformation.map((personalContactInformations) => (
                  <FormInput key={personalContactInformations.id} {...personalContactInformations} value={formVals[personalContactInformations.name]} onChange={onChange} />
                  ))}
                <h4 className={styles.h4}>Emergency Contact Information</h4>
                  {emergencyContactInformation.map((emergencyContactInformations) => (
                  <FormInput key={emergencyContactInformations.id} {...emergencyContactInformations} value={formVals[emergencyContactInformations.name]} onChange={onChange} />
                  ))} </div>
                <div className={styles.imageUpload}>
                <Image src="/forms/ddu.webp" width="283%" height="190%"></Image>
                <h4 className={styles.h4}>Max. Size: 5MB</h4>
                <h4 className={styles.h4}>Allowed Types: JPG, PNG, GIF, JPEG</h4>
                <div className={styles.center}>
                  <Stack spacing={2} direction="row">
                    <Button className={styles.btnSub} variant="contained">Upload</Button>
                    <Button className={styles.btnRes} variant="contained">Remove</Button>
                  </Stack>
          </div></div></div></div>
          <div className={styles.otherDetails}>
            <h4 className={styles.h4}>Log-in Details</h4>
            {login.map((logins) => (
                  <FormInput key={logins.id} {...logins} value={formVals[logins.name]} onChange={onChange} />
            ))}
            <h4 className={styles.h4}>Department </h4>
            {inputs.map((input) => (
                  <FormInput key={input.id} {...input} value={formVals[input.name]} onChange={onChange} />
            ))}
          </div>
          <br></br>
          <Button onClick={handleSubmit} className={styles.btnSub1} variant="contained">Submit</Button>
        </form></div>
    </React.Fragment>
  );
};

export default Forms;
