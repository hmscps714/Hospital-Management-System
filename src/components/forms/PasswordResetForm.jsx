import React, { useState } from "react";
import { FormInput } from "src/components/forms/FormInput";
import { sendPasswordResetEmailToUser } from "src/api/auth";
import styles from "./patientRegisterForm.module.css";
import Button from "@mui/material/Button";

const PasswordResetForm = () => {
  const [submitted, setSubmitted] = useState(null);
  const [formVals, setFormVals] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formVals;
    const res = await sendPasswordResetEmailToUser(email);
    setSubmitted(res);
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3 className={styles.h3}>Password Reset Form</h3>
      <div className={styles.center}>
        <form
          onSubmit={handleSubmit}
          className={styles.FormItems}
          style={{ gridTemplateColumns: "1fr", width: "50%" }}
        >
          <div className={styles.mainDetails}>
            <h4 className={styles.h4}>Provide email to send password reset link</h4>
            <FormInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              errorMessage="Please provide a valid email address"
              label="Email"
              required={true}
              onChange={onChange}
            ></FormInput>
          </div>
          <Button type="submit" className={styles.btnSub1} variant="contained">
            Reset
          </Button>
          {submitted && (
            <span className="successMessage">
              Password Reset sent to {formVals.email}. Please check your inbox.
            </span>
          )}
          {submitted === false && (
            <span className="errorMessage">
              Error resetting password. Please ensure the email you provided is already in our
              system.
            </span>
          )}
        </form>
      </div>
    </>
  );
};

export default PasswordResetForm;
