import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormInput } from "src/components/forms/FormInput";
import styles from "./patientRegisterForm.module.css";
import Button from "@mui/material/Button";
import { createTransaction } from "src/api/db";

export const CreatePriceForm = () => {
  const router = useRouter();

  const [formVals, setFormVals] = useState({
    id: "",
    name: "",
    type: "Equipment Repair",
    amount: "",
    date: "",
  });

  const [itemCreated, setItemCreated] = useState(null);

  const inputs = [
    {
      id: "id",
      name: "id",
      type: "text",
      placeholder: "ID",
      errorMessage: "Please provide ID",
      label: "ID",
      required: true,
    },
    {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Item name",
      errorMessage: "Please provide item name",
      label: "Item name",
      required: true,
    },
    {
      id: "amount",
      name: "amount",
      type: "number",
      placeholder: "Price",
      errorMessage: "Please provide item price",
      label: "Amount",
      required: true,
    },
    {
      id: "date",
      name: "date",
      type: "date",
      placeholder: "Date",
      errorMessage: "Please provide the date added",
      label: "Date",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formVals);

    const { id, type, name, amount, date } = formVals;

    const tempItem = {
      id,
      type,
      name,
      amount: parseInt(amount),
      date: new Date(date),
    };

    //TODO: add route protection + item registration
    // const hasLoggedIn = await registerPractitioner(login, practitioner);
    // if (hasLoggedIn) {
    //   router.push("/admin-home");
    // } else {
    //   alert("Sorry it has failed : ( Please try again!");
    // }

    const res = await createTransaction(tempItem);
    setItemCreated(res);

    // if (res) {
    //   router.push("/financial");
    // } else {
    //   alert("Sorry it has failed : ( Please try again!");
    // }
  };

  const onChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <h3 className={styles.h3}>Add a new transaction</h3>
      <div className={styles.center}>
        <form
          onSubmit={handleSubmit}
          className={styles.FormItems}
          style={{ gridTemplateColumns: "1fr", width: "50%" }}
        >
          <div className={styles.mainDetails}>
            <h4 className={styles.h4}>Item details</h4>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={formVals[input.name]}
                onChange={onChange}
              />
            ))}
            <label htmlFor="type">Type</label>
            <select id="type" name="type" onChange={onChange} required>
              <option value="Equipment Repair">Equipment Repair</option>
              <option value="Salary">Salary</option>
              <option value="Donation">Donation</option>
              <option value="Insurance Payment">Insurance Payment</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <Button type="submit" className={styles.btnSub1} variant="contained">
            Submit
          </Button>
          <br></br>
          {itemCreated && <span className={styles.successMsg}>Transaction added</span>}
          {itemCreated === false && (
            <span className={styles.errorMsg}>Failed to add transaction</span>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreatePriceForm;
