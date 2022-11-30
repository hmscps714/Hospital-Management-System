import React, { useState } from "react";
import { FormInput } from "src/components/forms/FormInput";
import { signInPatient, signInPractitioner } from "src/api/auth";
import styles from "./Contact.module.css";
import { useRouter } from "next/router";

export const Contact = () => {
  const router = useRouter();

  const [formVals, setFormVals] = useState({
    name: "",
    email: "",
    phonenumber: "",
    message: "",
  });

  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Please provide a valid name",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "Please provide a valid email address",
      required: true,
    },
    {
      id: "phonenumber",
      name: "phonenumber",
      type: "text",
      placeholder: "Phone Number",
      errorMessage: "Please provide a valid phone number",
      required: true,
    },
    {
      id: "message",
      name: "message",
      type: "text",
      placeholder: "Message",
      errorMessage: "Please provide a message",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.Contact}>
      <title>Contact us</title>
      <div className={styles.contents}>
        <h1>Contact Us</h1>
        <div className={styles.block}>
          <img src="/about/6.png" alt="" />
          <p>
            <strong>LOCATION</strong> <br />
            245 Church St. <br />
            TO. ON. M5B1Z4
          </p>
        </div>
        <div className={styles.block}>
          <img src="/about/7.png" alt="" />
          <p>
            <strong>PHONE</strong> <br />
            (012) 345 - 6789
          </p>
        </div>
        <div className={styles.block}>
          <img src="/about/8.png" alt="" />
          <p>
            <strong>EMAIL</strong> <br />
            support@medsuite.com
          </p>
        </div>
        <div className={styles.clr}></div>
        <div className={styles.box}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit} className={styles.FormItems}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={formVals[input.name]}
                onChange={onChange}
              />
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
