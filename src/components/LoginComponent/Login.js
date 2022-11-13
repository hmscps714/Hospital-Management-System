import React, { useState } from "react";
import styles from "./Login.module.css";
import { FormInput } from "src/components/forms/FormInput";
import { Label } from "@mui/icons-material";

export const Login = () => {
  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const inputs = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide a valid email address",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Please provide password",
      required: true,
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    },
  ];

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.Login}>
      <div className={styles.LoginBox}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} className={styles.FormItems}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={formVals[input.name]} onChange={onChange} />
          ))}
          <label htmlFor="userType">Sign in as:</label>
          <select name="userType" onChange={onChange} required>
            <option value={"Patient"}>Patient</option>
            <option value={"Practitioner"}>Practitioner</option>
            <option value={"Admin"}>Admin</option>
          </select>
          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
