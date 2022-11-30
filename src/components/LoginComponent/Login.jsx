import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { FormInput } from "src/components/forms/FormInput";
import { signInUser } from "src/api/auth";
import { useRouter } from "next/router";
import { useAuth } from "src/context/AuthUserContext";

export const Login = () => {
  const router = useRouter();
  const { authUser, loading, authUserType } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && authUser && authUserType) {
      console.log("redirecting!");
      if (authUserType === "patient") router.push("/patient-dashboard");
      else if (authUserType === "practitioner") router.push("/practitioner-dashboard");
      else if (authUserType === "admin") router.push("/admin-dashboard"); //TODO: Admin dashboard
    }
  }, [authUser, loading, authUserType]);

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
    // userType: "Patient",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, userType } = formVals;

    const res = await signInUser({ email, password });
    setIsLoggedIn(res);
  };

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
          {/* <label htmlFor="userType">Sign in as:</label>
          <select name="userType" onChange={onChange} required>
            <option value={"Patient"}>Patient</option>
            <option value={"Practitioner"}>Practitioner</option>
            <option value={"Admin"}>Admin</option>
          </select> */}
          <button type="submit">Sign in</button>
          {isLoggedIn === false && (
            <span className="errorMessage">
              The email and password you entered does not match any account in the system. Please
              try again!
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
