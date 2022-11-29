import React, { useState } from "react";
import { FormInput } from "src/components/forms/FormInput";
import { sendPasswordResetEmailToUser } from "src/api/auth";

const PasswordResetForm = () => {
  const [submitted, setSubmitted] = useState(null);
  const [formVals, setFormVals] = useState({ email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formVals;
    const res = sendPasswordResetEmailToUser(email);
    setSubmitted(res);
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h3>Password Reset Form</h3>
      <div>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Reset</button>
          {submitted && (
            <span className="successMessage">Password Reset sent to {formVals.email}</span>
          )}
          {submitted === false && <span className="errorMessage">Error resetting email</span>}
        </form>
      </div>
    </>
  );
};

export default PasswordResetForm;
